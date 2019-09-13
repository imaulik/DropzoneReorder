import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { UsersService, Vessel_detailsService, Vessel_depositsService, LoaderService } from './../../services/index';

@Component({
    templateUrl: 'vessel_deposit-view.component.html',
})
export class Vessel_depositsViewComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    vessel_depositForm: FormGroup;
    vessel_depositFormErrors: any;
    errors = '';
    vessel_deposit: any = {};
    users = [];
    vessel_details = [];
    action;
    dtInstance: any = {};
    cancleUser;
    img_name = '';
    timeout;
    sub;
    IMAGE_URL;
    dropzone: any;
    file: {};
    emailAlready: boolean = false;
    emailPattern = '^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})+$';
    private id;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public usersService: UsersService,
        public vessel_detailsService: Vessel_detailsService,
        public vessel_depositsService: Vessel_depositsService
    ) {

        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.vessel_depositFormErrors = {
            user_id: {},
            vessel_id: {},
            deposit_amount: {}
        };
        this.usersService.getAllUser().subscribe(response => {
            this.users = response;
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
        this.vessel_detailsService.getAllVesselDetails().subscribe(response => {
            this.vessel_details = response;
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }

    ngOnInit() {

        this.vessel_depositForm = this.formBuilder.group({
            user_id: [{ value: '', disabled: true }],
            vessel_id: [{ value: '', disabled: true }],
            deposit_amount: [{ value: '', disabled: true }]
        });

        this.vessel_depositForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.vessel_deposit = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';
            this.vessel_depositsService.getVessel_depositById(this.id).subscribe(response => {
                this.vessel_deposit = response;
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.action = 'Add';
        }
    }
    onFormValuesChanged() {
        for (const field in this.vessel_depositFormErrors) {
            if (!this.vessel_depositFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.vessel_depositFormErrors[field] = {};

            // Get the control
            const control = this.vessel_depositForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.vessel_depositFormErrors[field] = control.errors;
            }
        }
    }


    SaveVessel_deposit() {
        this.loaderService.display(true);
        this.vessel_depositsService.saveVessel_deposits(this.vessel_deposit).subscribe(response => {
            this.router.navigate(['/vessel_deposits']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }


    cancel() {
        this.router.navigate(['/vessel_deposits']);
    }

}
