import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import {CMS_pageService, Home_testimonialService, LoaderService} from '../../services/index';
import * as moment from 'moment';
@Component({
    templateUrl: 'home_testimonial-edit.component.html',
})
export class Home_testimonialEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    testimonialForm: FormGroup;
    testimonialFormErrors: any;
    errors = '';
    testimonial: any = {};
    action;
    timeout;
    sub;
    private id;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public cms_pageService: CMS_pageService,
        public home_testimonialService: Home_testimonialService,
    ) {

        this.testimonialFormErrors = {
            title: {},
            description: {},
            status: {},
            designation: {},
            author: {},
        };

    }

    ngOnInit() {

        this.testimonialForm = this.formBuilder.group({
            author: ['', Validators.required],
            designation: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['', Validators.required],
        });

        this.testimonialForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.testimonial = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';
            this.home_testimonialService.getHomeTestimonialById(this.id).subscribe(response => {
                this.testimonial = response;
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.action = 'Add';
            this.loaderService.display(false);
        }
    }
    onFormValuesChanged() {
        for (const field in this.testimonialFormErrors) {
            if (!this.testimonialFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.testimonialFormErrors[field] = {};

            // Get the control
            const control = this.testimonialForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.testimonialFormErrors[field] = control.errors;
            }
        }
    }


    SaveData() {

        this.loaderService.display(true);
        this.home_testimonialService.saveHomeTestimonial(this.testimonial).subscribe(response => {
            this.router.navigate(['/home_testimonial']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    cancel() {
        this.router.navigate(['/home_testimonial']);
    }

}
