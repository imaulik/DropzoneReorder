import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import { Home_slidersComponent } from "./home_sliders.component";
import { Home_sliderEditComponent } from "./home_slider-edit.component";
import { NgxDropzoneModule } from "ngx-dropzone";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: AppConstants.SITE_URL + 'upload/uploadImages',
    maxFilesize: 150,
    maxFiles: 2,
    uploadMultiple:false,
    acceptedFiles: '.png, .jpg, .jpeg',
    addRemoveLinks: true,
    createImageThumbnails: true,
    withCredentials: true,
    thumbnailWidth: 150,
    thumbnailHeight: 150,

};

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Home Sliders',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: Home_slidersComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            {
                path: 'add',
                component: Home_sliderEditComponent,
                data: {
                    title: 'Add',
                    permission: ['vessel.add']
                }
            },
            {
                path: 'edit/:id',
                component: Home_sliderEditComponent,
                data: {
                    title: 'Edit',
                    permission: ['vessel.edit']
                }
            },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), CommonModule, DropzoneModule, SharedCustomModule, NgxDropzoneModule
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }],
    declarations: [Home_slidersComponent, Home_sliderEditComponent]
})
export class Home_slidersModule { }
