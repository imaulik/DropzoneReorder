import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedCustomModule } from '../../../shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
        data: {
            title: 'Register'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedCustomModule,
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
