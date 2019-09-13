import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DropzoneConfigInterface, DROPZONE_CONFIG, DropzoneModule, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Vessel_commentsService, LoaderService } from './../../services/index';
import { AppConstants } from '../../constants/app.constants';

@Component({
    templateUrl: 'vessel_comment-view.component.html',
})
export class Vessel_commentsViewComponent implements OnInit {

    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    vessel_commentForm: FormGroup;
    vessel_commentFormErrors: any;
    errors = '';
    vessel_comment: any = {};
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
        public vessel_commentsService: Vessel_commentsService,
    ) {
        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.vessel_commentFormErrors = {
            user_email: {},
            vessel_title: {},
            comment: {},
        };

    }

    ngOnInit() {
        this.vessel_commentForm = this.formBuilder.group({
            user_email: [{ value: '', disabled: true }],
            vessel_title: [{ value: '', disabled: true }],
            comment: [{ value: '', disabled: true }]
        });


        this.vessel_comment = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';            
            this.vessel_commentsService.getVessel_commentById(this.id).subscribe(response => {
                this.vessel_comment = response;
                if (this.vessel_comment.userdetails) {
                    this.vessel_comment.user_email = this.vessel_comment.userdetails.email;
                }
                if (this.vessel_comment.vesseltdetails) {
                    this.vessel_comment.vessel_title = this.vessel_comment.vesseltdetails.title;
                }
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }

    Close() {
        this.router.navigate(['/vessel_comments']);
    }
}






