import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { CMS_pageService, LoaderService } from '../../services/index';
import * as moment from 'moment';
@Component({
    templateUrl: 'cms_page-edit.component.html',
})
export class CMS_pageEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    cms_pageForm: FormGroup;
    cms_pageFormErrors: any;
    errors = '';
    cms_page: any = {};
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
    ) {

        this.cms_pageFormErrors = {
            title: {},
            description: {},
            status: {},
        };

    }

    ngOnInit() {

        this.cms_pageForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['', Validators.required],
        });

        this.cms_pageForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.cms_page = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';
            this.cms_pageService.getCMS_pageById(this.id).subscribe(response => {
                this.cms_page = response;
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
        for (const field in this.cms_pageFormErrors) {
            if (!this.cms_pageFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.cms_pageFormErrors[field] = {};

            // Get the control
            const control = this.cms_pageForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.cms_pageFormErrors[field] = control.errors;
            }
        }
    }


    SaveData() {
        this.loaderService.display(true);
        this.cms_pageService.saveCMS_page(this.cms_page).subscribe(response => {
            this.router.navigate(['/cms_pages']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    cancel() {
        this.router.navigate(['/cms_pages']);
    }

}
