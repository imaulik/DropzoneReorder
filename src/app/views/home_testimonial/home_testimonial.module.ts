import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {Home_testimonialComponent} from './home_testimonial.component';
import {Home_testimonialEditComponent} from './home_testimonial-edit.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: AppConstants.SITE_URL + 'upload/uploadImages',
    maxFilesize: 150,
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
            title: 'Home Testimonial',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: Home_testimonialComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            {
                path: 'add',
                component: Home_testimonialEditComponent,
                data: {
                    title: 'Add',
                    permission: ['vessel.add']
                }
            },
            {
                path: 'edit/:id',
                component: Home_testimonialEditComponent,
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
    declarations: [Home_testimonialComponent, Home_testimonialEditComponent]
})
export class Home_testimonialModule { }
