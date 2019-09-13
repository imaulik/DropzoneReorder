import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
  declarations: [DashboardComponent]
})
export class DashboardModule { }
