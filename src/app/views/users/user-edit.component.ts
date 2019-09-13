import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { UsersService, RoleService, OptionService, LoaderService } from './../../services/index';

@Component({
    templateUrl: 'user-edit.component.html',
})
export class UserEditComponent implements OnInit {
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
    IMAGE_URL;
    dropzone: any;
    file: {};
    emailAlready: boolean = false;
    usernameAlready: boolean = false;
    emailPattern = '^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})+$';
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
            username: {},
            email: {},
            password: {},
            passwordConfirm: {},
            profile_image: {},
            status_id: {},
            role: {},
        };
        this.roleService.getAllRoles().subscribe(response => {
            if (response) {
                this.roles = response;
                this.loaderService.display(false);
            } else {
                this.loaderService.display(false);
            }
        }, error => {
            this.loaderService.display(false);
        });
        this.optionService.getSelectOption(2).subscribe(response => {
            if (response) {
                this.user_status = response;
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
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
            profile_image: [''],
            status_id: ['', Validators.required],
            role: ['', Validators.required],
        });

        this.userForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.user = {};
        this.roles = [];
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';
            this.usersService.getUserById(this.id).subscribe(response => {
                    this.user = response;
                    this.user['password'] = '**********';
                    this.user['passwordConfirm'] = '**********';
                    if (this.user.roles) {
                        this.user.role = this.user.roles[0].id;
                    }
                    if (this.user.status) {
                        this.user.status_id = this.user.status.id;
                    }
                    if (this.user.profile_image) {
              
                        const dz = this.componentRef.directiveRef.dropzone();
                        var thumb = {
                            name: this.user.profile_image,
                            size: 0,
                            dataURL: this.IMAGE_URL + this.user.profile_image,
                            serverImgUrl: this.IMAGE_URL + this.user.profile_image
                        };

                        dz.files.push(thumb);
                        dz.emit('addedfile', thumb);
                        dz.createThumbnailFromUrl(thumb,
                            dz.options.thumbnailWidth, dz.options.thumbnailHeight,
                            dz.options.thumbnailMethod, true, function (thumbnail) {
                                dz.emit('thumbnail', thumb, thumbnail);
                            }, 'anonymous');
                        dz.emit('complete', thumb);
                        dz.options.maxFiles = dz.options.maxFiles - 1;


                    }
                    this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.action = 'Add';
            this.user = {
                role: 2,
                status_id: 2
            };
        }
    }
    onFormValuesChanged() {
        for (const field in this.userFormErrors) {
            if (!this.userFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.userFormErrors[field] = {};

            // Get the control
            const control = this.userForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.userFormErrors[field] = control.errors;
            }
        }
    }


    SaveUser() {
        this.loaderService.display(true);
        this.usersService.saveUser(this.user).subscribe(response => {
            this.router.navigate(['/users']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }
    CheckEmailRegistered() {
        this.usersService.CheckUserEmail(this.user).subscribe(response => {
            this.emailAlready = false;
        }, error => {
            this.emailAlready = true;
        });
    }
    CheckUsernameRegistered() {
        this.usersService.CheckUserUsername(this.user).subscribe(response => {
            this.usernameAlready = false;
        }, error => {
            this.usernameAlready = true;
        });
    }
    onUploadSuccess($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.user['profile_image'] = this.img_name;
    }
    onUploadError($event) {
        // console.log($event);
    }
    onUploadadd($event) {
        // console.log($event);
    }
    Uploadpreview($event) {
        // console.log($event);
    }
    onUploadRemoved($event) {
        //        console.log($event);
    }

    cancel() {
        this.router.navigate(['/users']);
    }

}

/**
 * Confirm password
 *
 * @param {AbstractControl} control
 * @returns {{passwordsNotMatch: boolean}}
 */
function confirmPassword(control: AbstractControl): any {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true
        };
    }
}
