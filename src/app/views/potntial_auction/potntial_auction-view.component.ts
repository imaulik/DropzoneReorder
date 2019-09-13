import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DropzoneConfigInterface, DROPZONE_CONFIG, DropzoneModule, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Potntial_auctionService, LoaderService } from './../../services/index';
import { AppConstants } from '../../constants/app.constants';

@Component({
    templateUrl: 'potntial_auction-view.component.html',
})
export class Potntial_auctionsViewComponent implements OnInit {

    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;

    potntial_auctionForm: FormGroup;
    potntial_auctionFormErrors: any;
    errors = '';
    potntial_auction: any = {};
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
        public potntial_auctionService: Potntial_auctionService,
    ) {
        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.potntial_auctionFormErrors = {
            first_name: {},
            last_name: {},
            email: {},
            mobile_no: {},
            year: {},
            make: {},
            length: {},
            broker_check: {},
            brokerage_name: {},
        };

    }

    ngOnInit() {
        this.potntial_auctionForm = this.formBuilder.group({
            first_name: [{ value: '', disabled: true }],
            last_name: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            mobile_no: [{ value: '', disabled: true }],
            year: [{ value: '', disabled: true }],
            make: [{ value: '', disabled: true }],
            length: [{ value: '', disabled: true }],
            broker_check: [{ value: '', disabled: true }],
            brokerage_name: [{ value: '', disabled: true }],
        });


        this.potntial_auction = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'View';

            this.potntial_auctionService.getPotntial_auctionById(this.id).subscribe(response => {
                this.potntial_auction = response;
                if (this.potntial_auction.broker_check) {
                    this.potntial_auction.broker_check = 'Yes';
                } else {
                    this.potntial_auction.broker_check = 'No';
                }
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }

    Close() {
        this.router.navigate(['/potential_auctions']);
    }
}






