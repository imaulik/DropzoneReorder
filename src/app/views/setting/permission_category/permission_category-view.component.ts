import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { OptionService, LoaderService } from '../../../services/index';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'permission_category-view.component.html',
})
export class Permission_categoryViewComponent implements OnInit {
    permission_categoryForm: FormGroup;
    permission_categoryFormErrors: any;
    errors = '';
    public loading = true;
    first = 0;
    totalRecords: number;
    totalNotFilterRecords: number;
    rows: number;
    permission_category: any = {};
    action;
    dtInstance: any = {};
    canclepermission_category;
    timeout;
    sub;
    private id;
    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public optionService: OptionService
    ) {
        this.permission_categoryFormErrors = {
            value_text: {},
        };
    }

    ngOnInit() {

        this.permission_categoryForm = this.formBuilder.group({
            value_text: [{ value: '', disabled: true }, Validators.required],
        });

        this.permission_categoryForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.permission_category = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';
            this.optionService.getOptionById(this.id).subscribe(response => {
                    this.permission_category = response;
                    this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }
    onFormValuesChanged() {
        for (const field in this.permission_categoryFormErrors) {
            if (!this.permission_categoryFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.permission_categoryFormErrors[field] = {};

            // Get the control
            const control = this.permission_categoryForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.permission_categoryFormErrors[field] = control.errors;
            }
        }
    }


    cancel() {
        this.router.navigate(['/setting/permission_categorys']);
    }

}

