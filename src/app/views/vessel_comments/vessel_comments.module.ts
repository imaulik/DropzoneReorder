import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import { Vessel_commentsComponent } from "./vessel_comments.component";
import { Vessel_commentsViewComponent } from "./vessel_comment-view.component";
import { NgxDropzoneModule } from "ngx-dropzone";

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
            title: 'Vessel Comments',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: Vessel_commentsComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            // {
            //     path: 'add',
            //     component: VesselDetailsEditComponent,
            //     data: {
            //         title: 'Add',
            //         permission: ['vessel.add']
            //     }
            // },
            // {
            //     path: 'edit/:id',
            //     component: VesselDetailsEditComponent,
            //     data: {
            //         title: 'Edit',
            //         permission: ['vessel.edit']
            //     }
            // },
            {
                path: 'view/:id',
                component: Vessel_commentsViewComponent,
                data: {
                    title: 'View',
                    permission: ['vessel.view']
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
    declarations: [Vessel_commentsComponent, Vessel_commentsViewComponent]
})
export class Vessel_commentsModule { }
