import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import { CMS_pagesComponent } from "./cms_pages.component";
import { CMS_pageEditComponent } from "./cms_page-edit.component";
import { CMS_faqEditComponent } from "./cms_faq-edit.component";
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
            title: 'CMS Pages',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: CMS_pagesComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            {
                path: 'add',
                component: CMS_pageEditComponent,
                data: {
                    title: 'Add',
                    permission: ['vessel.add']
                }
            },
            {
                path: 'edit/:id',
                component: CMS_pageEditComponent,
                data: {
                    title: 'Edit',
                    permission: ['vessel.edit']
                }
            },
            {
                path: 'faq_edit/:id',
                component: CMS_faqEditComponent,
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
    declarations: [CMS_pagesComponent, CMS_pageEditComponent, CMS_faqEditComponent]
})
export class CMS_pagesModule { }
