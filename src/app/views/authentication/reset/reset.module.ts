import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { SharedCustomModule } from '../../../shared.module';

const routes: Routes = [
    {
        path: '',
        component: ResetComponent,
        data: {
            title: 'Reset',
        }

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpClientModule, FormsModule, CommonModule, SharedCustomModule],
    declarations: [
        ResetComponent
    ],
})
export class ResetModule {

}
