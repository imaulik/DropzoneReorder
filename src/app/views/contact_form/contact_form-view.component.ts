import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DropzoneConfigInterface, DROPZONE_CONFIG, DropzoneModule, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Contact_formService, LoaderService } from './../../services/index';
import { AppConstants } from '../../constants/app.constants';

@Component({
    templateUrl: 'contact_form-view.component.html',
})
export class Contact_formViewComponent implements OnInit {

    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    contact_formForm: FormGroup;
    contact_formFormErrors: any;
    errors = '';
    contact_form: any = {};
    action;
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
        public contact_formService: Contact_formService,
    ) {
        this.IMAGE_URL = AppConstants.IMAGE_URL;
    }

    ngOnInit() {
        this.contact_formForm = this.formBuilder.group({
            name: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            mobile_no: [{ value: '', disabled: true }],
            comment_message: [{ value: '', disabled: true }]
        });


        this.contact_form = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';
            this.contact_formService.getContact_formById(this.id).subscribe(response => {
                this.contact_form = response;
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }

    Close() {
        this.router.navigate(['/contact_form']);
    }
}






