import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { Home_slidersService, LoaderService } from './../../services/index';

@Component({
    templateUrl: 'home_slider-edit.component.html',
})
export class Home_sliderEditComponent implements OnInit {
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
        public home_slidersService: Home_slidersService,
    ) {

        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.userFormErrors = {
            title: {},
            description: {},
            slider_image: {},
        };

    }

    ngOnInit() {

        this.userForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            slider_image: [''],
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
            this.home_slidersService.getHome_sliderById(this.id).subscribe(response => {
                this.user = response;
                if (this.user.image) {
                    this.user.slider_image = this.user.image;
                }
                if (this.user.slider_image) {

                    const dz = this.componentRef.directiveRef.dropzone();
                    var thumb = {
                        name: this.user.slider_image,
                        size: 0,
                        dataURL: this.IMAGE_URL + this.user.slider_image,
                        serverImgUrl: this.IMAGE_URL + this.user.slider_image
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
            this.loaderService.display(false);
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
        this.user.image = this.user.slider_image;
        this.loaderService.display(true);
        this.home_slidersService.saveHome_slider(this.user).subscribe(response => {
            this.router.navigate(['/home_sliders']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });
    }

    onUploadSuccess($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.user['slider_image'] = this.img_name;
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
        this.router.navigate(['/home_sliders']);
    }

}
