import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';
import { Vessel_depositsComponent } from "./vessel_deposits.component";
import { Vessel_depositsEditComponent } from "./vessel_deposit-edit.component";
import { Vessel_depositsViewComponent } from "./vessel_deposit-view.component";
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
            title: 'Vessel Deposit',
            permission: ['vessel.view']
        },
        children: [
            {
                path: '',
                component: Vessel_depositsComponent,
                data: {
                    title: '',
                    permission: ['vessel.view']
                }
            },
            {
                path: 'add',
                component: Vessel_depositsEditComponent,
                data: {
                    title: 'Add',
                    permission: ['vessel.add']
                }
            },
            // {
            //     path: 'edit/:id',
            //     component: Vessel_depositsComponent,
            //     data: {
            //         title: 'Edit',
            //         permission: ['vessel.edit']
            //     }
            // },
            {
                path: 'view/:id',
                component: Vessel_depositsViewComponent,
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
    declarations: [Vessel_depositsComponent, Vessel_depositsEditComponent, Vessel_depositsViewComponent]
})
export class Vessel_depositsModule { }
