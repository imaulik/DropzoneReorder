import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { PermissionService, OptionService, LoaderService } from '../../../services/index';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'permission-edit.component.html',
})
export class PermissionEditComponent implements OnInit {
    permissionForm: FormGroup;
    permissionFormErrors: any;
    errors = '';
    public loading = true;
    first = 0;
    totalRecords: number;
    totalNotFilterRecords: number;
    rows: number;
    permission: any = {};
    permission_categorys = [];
    action;
    dtInstance: any = {};
    canclepermission;
    timeout;
    sub;
    private id;
    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public permissionService: PermissionService,
        public optionService: OptionService
    ) {
        this.permissionFormErrors = {
            category_id: {},
            name: {},
        };

        this.optionService.getSelectOption(1).subscribe(response => {
                this.permission_categorys = response;
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }

    ngOnInit() {

        this.permissionForm = this.formBuilder.group({
            category_id: ['', Validators.required],
            name: ['', Validators.required],
        });

        this.permissionForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.permission = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';
            this.permissionService.getPermissionById(this.id).subscribe(response => {
                    this.permission = response;
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
        for (const field in this.permissionFormErrors) {
            if (!this.permissionFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.permissionFormErrors[field] = {};

            // Get the control
            const control = this.permissionForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.permissionFormErrors[field] = control.errors;
            }
        }
    }


    SavePermission() {
        this.loaderService.display(true);
        this.permissionService.savePermission(this.permission).subscribe(response => {
            this.router.navigate(['/setting/permissions']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    cancel() {
        this.router.navigate(['/setting/permissions']);
    }

}

