import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import {About_membersComponent} from "./about_members.component";
import { About_memberEditComponent} from "./about_member-edit.component";
import {NgxDropzoneModule} from "ngx-dropzone";

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
            title: 'About Members',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: About_membersComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            {
                path: 'add',
                component: About_memberEditComponent,
                data: {
                    title: 'Add',
                    permission: ['vessel.add']
                }
            },
            {
                path: 'edit/:id',
                component: About_memberEditComponent,
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
        RouterModule.forChild(routes), CommonModule, DropzoneModule, SharedCustomModule,NgxDropzoneModule
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }],
    declarations: [About_membersComponent, About_memberEditComponent]
})
export class About_membersModule { }
