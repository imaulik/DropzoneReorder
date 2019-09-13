import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AppConstants } from '../../constants/app.constants';
import { UsersService, RoleService, OptionService, LoaderService } from './../../services/index';
import { Vessel_detailsService, FileUploadService } from '../../services/index';
import * as moment from 'moment';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    styleUrls: ['vessel-details.component.scss'],
    templateUrl: 'vessel-details-edit.component.html',
})
export class VesselDetailsEditComponent implements OnInit {
    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
    @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
    @ViewChild('dropzonePicture') dropzonePicture: DropzoneComponent;
    @ViewChild('dropzoneGallery') dropzoneGallery: DropzoneComponent;

    vesselForm: FormGroup;
    vesselFormErrors: any;
    errors = '';
    vessel: any = {};
    vessel_gallery = [];
    additional_file_uploads = [];
    vessel_additional_fields = [];
    roles = [];
    user_status = [];
    action;
    dtInstance: any = {};
    cancleUser;
    img_name = '';
    timeout;
    sub;
    FILE_URL;
    IMAGE_URL;
    dropzone: any;
    file: {};
    emailAlready = false;
    usernameAlready = false;
    emailPattern = '^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,3})+$';

    filesArr: any = [];
    docArr: any = [];
    oldDocArr: any = [];

    files: File[] = [];
    private id;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        public _http: HttpClient,
        public vesselDetailsService: Vessel_detailsService,
        public fileUploadService: FileUploadService,
        public roleService: RoleService,
        public optionService: OptionService
    ) {
        this.FILE_URL = AppConstants.FILE_URL;
        this.IMAGE_URL = AppConstants.IMAGE_URL;
        this.vesselFormErrors = {
            title: {},
            auction_start_price: {}
        };
    }

    ngOnInit() {
        this.vesselForm = this.formBuilder.group({
            feature_image: [''],
            title: ['', Validators.required],
            description: [''],
            location: [''],
            year: [''],
            make: [''],
            model: [''],
            loa: [''],
            beam: [''],
            draft: [''],
            co_brokerage: [''],
            broker_name: [''],
            broker_email: [''],
            preview_period: [''],
            haul_out: [''],
            sea_trial: [''],
            auction_feature: [''],
            auction_address: [''],
            auction_start_price: ['', Validators.required],
            auction_reserve_price: [''],
            auction_buy_now_price: [''],
            auction_quantity: [''],
            auction_begins: [''],
            auction_ends: [''],
            incremental_bid: [''],
            buyer_document_agreement: [''],
            bidders_agreement: [''],
            opening_bid_incentive: [''],
            allowed_comment: [''],
            auction_images: [''],
            deposit_amount: [''],
            vessel_additional_fields: this.formBuilder.array([])
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.action = 'Edit';

            this.vesselDetailsService.getVesselDetailsById(this.id).subscribe(response => {
                this.vessel = response;
                if (this.vessel.feature_image) {
                    this.previewThumbailFromUrl(this.vessel.feature_image);
                }
                if (this.vessel.galleryimages) {
                    this.previewThumbailFromUrlGallery(this.vessel.galleryimages);
                }
                if (this.vessel.auction_begins) {
                    this.vessel.auction_begins = new Date(this.vessel.auction_begins);
                }
                if (this.vessel.auction_ends) {
                    this.vessel.auction_ends = new Date(this.vessel.auction_ends);
                }
                if (this.vessel.additional_fields) {
                    this.vessel.vessel_additional_fields = this.vessel.additional_fields;
                    this.vessel.additional_fields.forEach((element, index) => {
                        this.addAdditionalFields();
                        setTimeout(() => {
                            this.vesselForm.get('vessel_additional_fields')['controls'][index].get('id').setValue(element.id);
                            this.vesselForm.get('vessel_additional_fields')['controls'][index].get('title').setValue(element.title);
                            this.vesselForm.get('vessel_additional_fields')['controls'][index].get('field_filename').setValue(element.field_filename);
                        }, 50);
                    });
                }
                this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.action = 'Add';
            // this.addAdditionalFields();
            this.loaderService.display(false);
        }
    }
    cancel() {
        this.router.navigate(['/vessel_details']);
    }

    createAdditionalFields(): FormGroup {
        return this.formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            upload_file: [''],
            field_filename: [''],
        });

    }
    removeAdditionalFields(i: number, machine_id): void {
        const control = <FormArray>this.vesselForm.controls['vessel_additional_fields'];
        control.removeAt(i);
        if (machine_id) {
            this.deleteAdditionalFields(machine_id);
        }
    }
    addAdditionalFields(): void {
        const control = <FormArray>this.vesselForm.controls['vessel_additional_fields'];
        control.push(this.createAdditionalFields());

    }
    RemoveFile(listid) {
        this.vesselForm.controls.vessel_additional_fields.value.forEach((element, key) => {
            if (listid == key) {
                element.field_filename = '';
                this.vesselForm.get('vessel_additional_fields')['controls'][key].get('field_filename').setValue('');
            }
        });
    }
    deleteAdditionalFields(id) {
        // this.loaderService.display(true);
        // this.plant_listsService.deletePlant_machine(id).subscribe(response => {
        //     this.loaderService.display(false);
        // }, error => {
        //     this.loaderService.display(false);
        // });
    }
    previewThumbailFromUrl(feature_image) {
        const dz = this.dropzonePicture.directiveRef.dropzone();
        let thumb = {
            name: feature_image,
            size: 0,
            dataURL: this.IMAGE_URL + feature_image,
            serverImgUrl: this.IMAGE_URL + feature_image
        };
        dz.files.push(thumb);
        dz.emit('addedfile', thumb);
        dz.createThumbnailFromUrl(thumb,
            dz.options.thumbnailWidth, dz.options.thumbnailHeight,
            dz.options.thumbnailMethod, true, function (thumbnail) {
                dz.emit('thumbnail', thumb, thumbnail);
            }, 'anonymous');
        dz.emit('complete', thumb);
        dz.options.maxFiles = 2;
    }

    previewThumbailFromUrlGallery(gallery_images) {

        const dz = this.dropzoneGallery.directiveRef.dropzone();
        gallery_images.forEach(element => {
            this.vessel_gallery.push(element['image_name']);
            let thumb = {
                name: element['image_name'],
                size: 0,
                dataURL: this.IMAGE_URL + element['image_name'],
                serverImgUrl: this.IMAGE_URL + element['image_name'],
                serverId: element['id']
            };
            dz.files.push(thumb);
            dz.emit('addedfile', thumb);
            dz.createThumbnailFromUrl(thumb,
                dz.options.thumbnailWidth, dz.options.thumbnailHeight,
                dz.options.thumbnailMethod, true, function (thumbnail) {
                    dz.emit('thumbnail', thumb, thumbnail);
                }, 'anonymous');
            dz.emit('complete', thumb);
        });
        // dz.options.maxFiles = dz.options.maxFiles - 1;
    }

    detectFiles(files: FileList, listid) {
        let fileToUpload = files.item(0);
        this.loaderService.display(true);
        this.fileUploadService.postFile(fileToUpload).subscribe(response => {
            this.vesselForm.controls.vessel_additional_fields.value.forEach((element, key) => {
                if (listid == key) {
                    element.field_filename = response['filename'];
                }
            });
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error;
        });

    }
    SaveVesselDetails() {

        this.vessel.auction_begins = moment(this.vessel.auction_begins).format('YYYY-MM-DD HH:mm:ss');
        this.vessel.auction_ends = moment(this.vessel.auction_ends).format('YYYY-MM-DD HH:mm:ss');
        this.vessel['galllery_images'] = this.vessel_gallery;
        this.vessel['vessel_additional_fields'] = this.vesselForm.controls.vessel_additional_fields.value;


        this.loaderService.display(true);
        this.vesselDetailsService.saveVesselDetails(this.vessel).subscribe(response => {
            this.router.navigate(['/vessel_details']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
            this.errors = error;
        });
    }
    onFormValuesChanged() {
        for (const field in this.vesselFormErrors) {
            if (!this.vesselFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.vesselFormErrors[field] = {};

            // Get the control
            const control = this.vesselForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.vesselFormErrors[field] = control.errors;
            }
        }
    }
    onUploadSuccess($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.vessel['feature_image'] = this.img_name;
    }
    onUploadError($event) {
        // console.log($event);
    }
    onUploadadd($event) {
        // console.log($event);
    }
    onUploadRemoved($event) {
        //    console.log($event);
    }

    onUploadSuccessGalllery($event) {
        //        console.log($event);
        this.img_name = $event[1]['filename'];
        this.vessel_gallery.push(this.img_name);
    }
    onUploadErrorGalllery($event) {
        // console.log($event);
    }
    onUploadaddGalllery($event) {
        // console.log($event);
    }
    onUploadRemovedGalllery($event) {

        if ($event.serverId) {
            for (let i = 0; i < this.vessel_gallery.length; i++) {
                if (this.vessel_gallery[i] === $event.name) {
                    this.vessel_gallery.splice(i, 1);
                }
            }
            // this.loaderService.display(true);
            // this.vesselDetailsService.deleteVesselDetailsGalleryImage($event.serverId).subscribe(response => {
            //     this.loaderService.display(false);
            // }, error => {
            //     this.loaderService.display(false);
            //     this.errors = error.error;
            // });
        } else {
            let server_filname = JSON.parse($event.xhr.response);
            for (let i = 0; i < this.vessel_gallery.length; i++) {
                if (this.vessel_gallery[i] === server_filname.filename) {
                    this.vessel_gallery.splice(i, 1);
                }
            }
        }
        // console.log(this.vessel_gallery);

    }

    // removeDoc = (doc, i) => {
    //     this.filesArr.splice(i, 1);
    //     this.docArr.forEach((value, key) => {
    //         if (key === +i) {
    //             this.docArr.splice(key, 1);
    //         }
    //     });
    //     this.oldDocArr.forEach((value, key) => {
    //         if (key === +i) {
    //             this.oldDocArr.splice(key, 1);
    //         }
    //     });
    // }

    // uploadDoc = (event: any) => {

    //     // const files = event.target.files;
    //     const files = event;
    //     // console.log('om');
    //     // console.log(event);
    //     let i = this.filesArr.length;
    //     for (const file of files) {
    //         const ext = file['name'].substring(file['name'].lastIndexOf('.') + 1).toLowerCase();
    //         let flag = true;
    //         this.docArr.forEach((value) => {
    //             if (value === file.name) {
    //                 flag = false;
    //             }
    //         });
    //         if (flag) {
    //             this.docArr.push(file.name);
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = (event1: Event) => {
    //                 this.filesArr[i] = {};
    //                 this.filesArr[i]['file'] = file;
    //                 // const pathValue = this.getLogoUrl(ext);
    //                 // if (!pathValue) {
    //                 this.filesArr[i]['url'] = event1.target['result'];
    //                 // }
    //                 // else {
    //                 //     this.filesArr[i]['url'] = pathValue;
    //                 // }
    //                 i++;
    //             };
    //         }
    //     }
    // }
    // onFilesAdded(files: File[]) {
    //     console.log(files);
    //     this.filesArr =files;
    //     files.forEach(file => {
    //         const reader = new FileReader();

    //         reader.onload = (e: ProgressEvent) => {
    //             const content = (e.target as FileReader).result;

    //             // this content string could be used directly as an image source
    //             // or be uploaded to a webserver via HTTP request.
    //             console.log(content);
    //         };

    //         // use this for basic text files like .txt or .csv
    //         reader.readAsText(file);

    //         // use this for images
    //         // reader.readAsDataURL(file);
    //     });
    // }

    // onFilesRejected(files: File[]) {
    //     // console.log(files);
    // }

    public dropped = (event: CdkDragDrop<string[]>) => {
        moveItemInArray(
            this.files,
            event.previousIndex,
            event.currentIndex
        );
        console.log(this.files);
    }
    public onSelect = (event) => {
        console.log(event);
        this.files.push(...event.addedFiles);
    }
    public onRemove = (event) => {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }
}

