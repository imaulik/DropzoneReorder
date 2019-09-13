import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';
import { PermissionEditComponent } from './permission-edit.component';
import { PermissionViewComponent } from './permission-view.component';
import { SharedCustomModule } from '../../../shared.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Permission Category',
            permission: ['permission.view', 'permission.add', 'permission.edit', 'permission.view', 'permission.delete']
        },
        children: [
            {
                path: '',
                component: PermissionComponent,
                data: {
                    title: '',
                    permission: ['permission.view']
                }
            },
            {
                path: 'edit/:id',
                component: PermissionEditComponent,
                data: {
                    title: 'Edit',
                    permission: ['permission.edit']
                }
            },
            {
                path: 'add',
                component: PermissionEditComponent,
                data: {
                    title: 'Add',
                    permission: ['permission.add']
                }
            },
            {
                path: 'view/:id',
                component: PermissionViewComponent,
                data: {
                    title: 'View',
                    permission: ['permission.view']
                }
            },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedCustomModule,
    ],
    declarations: [PermissionComponent, PermissionViewComponent, PermissionEditComponent]
})
export class PermissionModule { }
