import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DropzoneConfigInterface, DROPZONE_CONFIG, DropzoneModule, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService, RoleService, OptionService, LoaderService } from './../../services/index';
import { AppConstants } from '../../constants/app.constants';

@Component({
    templateUrl: 'user-view.component.html',
})
export class UserViewComponent implements OnInit {

    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    userForm: FormGroup;
    userFormErrors: any;
    errors = '';
    user: any = {};
    roles = [];
    user_status = [];
    action;
    dtInstance: any = {};
    cancleUser;
    img_name = '';
    timeout;
    sub;
    dropzone: any;
    file: {};
    IMAGE_URL;
    private id;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public usersService: UsersService,
        public roleService: RoleService,
        public optionService: OptionService
    ) {
        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.userFormErrors = {
            firstname: {},
            lastname: {},
            email: {},
            password: {},
            passwordConfirm: {},
            profile_image: {},
            status_id: {},
            role: {},
        };
        this.roleService.getAllRoles().subscribe(response => {
            if (response.code == '200' || response.code == 200) {
                this.roles = response.data;
                this.loaderService.display(false);
            } else {
                this.loaderService.display(false);
            }
        }, error => {
            this.loaderService.display(false);
        });
        this.optionService.getSelectOption(2).subscribe(response => {
            if (response.code == '200' || response.code == 200) {
                this.user_status = response.data;
                this.loaderService.display(false);
            } else {
                this.loaderService.display(false);
            }
        }, error => {
            this.loaderService.display(false);
        });
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstname: [{ value: '', disabled: true }, Validators.required],
            lastname: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
            password: [{ value: '', disabled: true }, Validators.required],
            passwordConfirm: [{ value: '', disabled: true }, [Validators.required]],
            profile_image: [''],
            status_id: [{ value: '', disabled: true }, Validators.required],
            role: [{ value: '', disabled: true }, Validators.required],
        });


        this.user = {};
        this.roles = [];
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';
            this.usersService.getUserById(this.id).subscribe(response => {
                    this.user = response;
                    this.user['password'] = '**********';
                    this.user['passwordConfirm'] = '**********';
                    if (this.user.roles) {
                        this.user.role = this.user.roles[0].id;
                    }
                    if (this.user.status) {
                        this.user.status = this.user.status.id;
                    }
                    this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }

    Close() {
        this.router.navigate(['/users']);
    }
}






