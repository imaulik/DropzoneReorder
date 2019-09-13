import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { SharedCustomModule } from '../../../shared.module';

const routes: Routes = [
    {
        path: '',
        component: ForgetComponent,
        data: {
            title: 'Forget Password'
        }

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedCustomModule, HttpClientModule, FormsModule, CommonModule],
    declarations: [
        ForgetComponent
    ],
})
export class ForgetModule {

}
