import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Permission_categoryComponent } from './permission_category.component';
import { Permission_categoryEditComponent } from './permission_category-edit.component';
import { Permission_categoryViewComponent } from './permission_category-view.component';
import { SharedCustomModule } from '../../../shared.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Permission Category',
            permission: [
                'permission_category.view', 'permission_category.add',
                'permission_category.edit', 'permission_category.view',
                'permission_category.delete'
            ]
        },
        children: [
            {
                path: '',
                component: Permission_categoryComponent,
                data: {
                    title: '',
                    permission: ['permission_category.view']
                }
            },
            {
                path: 'edit/:id',
                component: Permission_categoryEditComponent,
                data: {
                    title: 'Edit',
                    permission: ['permission_category.edit']
                }
            },
            {
                path: 'add',
                component: Permission_categoryEditComponent,
                data: {
                    title: 'Add',
                    permission: ['permission_category.add']
                }
            },
            {
                path: 'view/:id',
                component: Permission_categoryViewComponent,
                data: {
                    title: 'View',
                    permission: ['permission_category.view']
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
    declarations: [Permission_categoryComponent, Permission_categoryViewComponent, Permission_categoryEditComponent]
})
export class Permission_categoryModule { }
