import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { Latest_newsService, LoaderService } from '../../services/index';
import * as moment from 'moment';
@Component({
    templateUrl: 'latest_news-edit.component.html',
})
export class Latest_newsEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    latest_newsForm: FormGroup;
    latest_newsFormErrors: any;
    errors = '';
    latest_news: any = {};
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
        public latest_newsService: Latest_newsService,
    ) {

        this.latest_newsFormErrors = {
            title: {},
            link: {},
            description: {},
            publish_date: {},
        };

    }

    ngOnInit() {

        this.latest_newsForm = this.formBuilder.group({
            title: ['', Validators.required],
            link: ['', Validators.required],
            description: ['', Validators.required],
            publish_date: ['', Validators.required],
        });

        this.latest_newsForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.latest_news = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';
            this.latest_newsService.getLatest_newsById(this.id).subscribe(response => {
                this.latest_news = response;
                if (this.latest_news.auction_ends) {
                    this.latest_news.auction_ends = new Date(this.latest_news.auction_ends);
                }
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
        for (const field in this.latest_newsFormErrors) {
            if (!this.latest_newsFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.latest_newsFormErrors[field] = {};

            // Get the control
            const control = this.latest_newsForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.latest_newsFormErrors[field] = control.errors;
            }
        }
    }


    SaveData() {
        this.loaderService.display(true);
        this.latest_news.publish_date = moment(this.latest_news.publish_date).format("YYYY-MM-DD");
        this.latest_newsService.saveLatest_news(this.latest_news).subscribe(response => {
            this.router.navigate(['/latest_news']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    cancel() {
        this.router.navigate(['/latest_news']);
    }

}
