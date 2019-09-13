import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit.component';
import { UserViewComponent } from './user-view.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: AppConstants.SITE_URL + 'upload/uploadImages',
    maxFiles: 2,
    uploadMultiple: false,
    maxFilesize: 50,
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
            title: 'Users',
            permission: ['user.add', 'user.edit', 'user.view', 'user.delete']
        },
        children: [
            {
                path: '',
                component: UsersComponent,
                data: {
                    title: '',
                    permission: ['user.view']
                }
            },
            {
                path: 'add',
                component: UserEditComponent,
                data: {
                    title: 'Add',
                    permission: ['user.add']
                }
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
                data: {
                    title: 'Edit',
                    permission: ['user.edit']
                }
            },
            {
                path: 'view/:id',
                component: UserViewComponent,
                data: {
                    title: 'View',
                    permission: ['user.view']
                }
            },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), CommonModule, DropzoneModule, SharedCustomModule
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }],
    declarations: [UsersComponent, UserEditComponent, UserViewComponent]
})
export class UsersModule { }
