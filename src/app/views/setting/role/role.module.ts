import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { RoleEditComponent } from './role-edit.component';
import { RoleViewComponent } from './role-view.component';
import { SharedCustomModule } from '../../../shared.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Role',
            permission: ['role.view', 'role.add', 'role.edit', 'role.view', 'role.delete']
        },
        children: [
            {
                path: '',
                component: RoleComponent,
                data: {
                    title: '',
                    permission: ['role.view']
                }
            },
            {
                path: 'edit/:id',
                component: RoleEditComponent,
                data: {
                    title: 'edit',
                    permission: ['role.edit']
                }
            },
            {
                path: 'add',
                component: RoleEditComponent,
                data: {
                    title: 'Add',
                    permission: ['role.add']
                }
            },
            {
                path: 'view/:id',
                component: RoleViewComponent,
                data: {
                    title: 'View',
                    permission: ['role.view']
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
    declarations: [RoleComponent, RoleEditComponent, RoleViewComponent]
})
export class RoleModule { }
