import { NgModule } from '@angular/core';
import { P404Component } from './404.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: P404Component,
    data: {
      title: '',
      permission: ['dashboard.view']
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [P404Component]
})
export class P404Module { }
