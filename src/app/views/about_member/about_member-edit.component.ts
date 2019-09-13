import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { About_membersService, LoaderService } from './../../services/index';

@Component({
    templateUrl: 'about_member-edit.component.html',
})
export class About_memberEditComponent implements OnInit {
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
        public about_membersService: About_membersService,
    ) {

        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.userFormErrors = {
            member_name: {},
            member_designation: {},
            member_description: {},
            member_image: {},
        };

    }

    ngOnInit() {

        this.userForm = this.formBuilder.group({
            member_name: ['', Validators.required],
            member_designation: ['', Validators.required],
            member_description: [],
            member_image: [''],
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
            this.about_membersService.getAbout_memberById(this.id).subscribe(response => {
                this.user = response;
                if (this.user.member_image) {
                    const dz = this.componentRef.directiveRef.dropzone();
                    var thumb = {
                        name: this.user.member_image,
                        size: 0,
                        dataURL: this.IMAGE_URL + this.user.member_image,
                        serverImgUrl: this.IMAGE_URL + this.user.member_image
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
        this.about_membersService.saveAbout_member(this.user).subscribe(response => {
            this.router.navigate(['/about_members']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    onUploadSuccess($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.user['member_image'] = this.img_name;
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
        this.router.navigate(['/about_members']);
    }

}
