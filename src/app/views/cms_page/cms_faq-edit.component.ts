import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { CMS_pageService, LoaderService } from '../../services/index';
import * as moment from 'moment';
@Component({
    templateUrl: 'cms_faq-edit.component.html',
})
export class CMS_faqEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    cms_faqForm: FormGroup;
    cms_faqFormErrors: any;
    errors = '';
    cms_faq: any = {};
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

        this.cms_faqFormErrors = {
            title: {},
            description: {},
            status: {},
        };

    }

    ngOnInit() {

        this.cms_faqForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: this.formBuilder.array([]),
            status: ['', Validators.required],
        });

        this.cms_faqForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.cms_faq = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.loaderService.display(false);
            this.action = 'Edit';
            this.cms_pageService.getCMS_pageById(this.id).subscribe(response => {
                this.cms_faq = response;
                if (this.cms_faq.description) {
                    this.cms_faq.description = JSON.parse(this.cms_faq.description);
                    this.cms_faq.description.forEach((element, index) => {
                        this.addAdditionalFields();
                        setTimeout(() => {
                            this.cms_faqForm.get('description')['controls'][index].get('question').setValue(element.question);
                            this.cms_faqForm.get('description')['controls'][index].get('answer').setValue(element.answer);
                        }, 50);
                    });
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
        for (const field in this.cms_faqFormErrors) {
            if (!this.cms_faqFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.cms_faqFormErrors[field] = {};

            // Get the control
            const control = this.cms_faqForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.cms_faqFormErrors[field] = control.errors;
            }
        }
    }

    createAdditionalFields(): FormGroup {
        return this.formBuilder.group({
            question: ['', Validators.required],
            answer: ['', Validators.required],
        });

    }
    removeAdditionalFields(i: number): void {
        const control = <FormArray>this.cms_faqForm.controls['description'];
        control.removeAt(i);
    };
    addAdditionalFields(): void {
        const control = <FormArray>this.cms_faqForm.controls['description'];
        control.push(this.createAdditionalFields());

    }

    SaveData() {
        this.cms_faq.description=JSON.stringify(this.cms_faqForm.controls.description.value);
        this.loaderService.display(true);
        this.cms_pageService.saveCMS_page(this.cms_faq).subscribe(response => {
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
