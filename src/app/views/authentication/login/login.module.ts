import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedCustomModule } from '../../../shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedCustomModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
