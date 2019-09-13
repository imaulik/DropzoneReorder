import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    RoleCheckDirective, HasOnePermissionDirective, HasAllPermissionsDirective,
    ExceptPermissionsDirective, ExceptRolesDirective
} from './directives/permissions/index';
import {
    AuthenticationService, PermissionService, Email_subscribersService,
    UsersService, OptionService, RoleService, Vessel_commentsService,
    Vessel_depositsService, About_membersService, Home_slidersService,
    Vessel_bidsService, Potntial_auctionService, Latest_newsService,
    Contact_formService, FileUploadService, CMS_pageService, Home_testimonialService
} from './services/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule, MatTooltipModule, MatIconModule, MatFormFieldModule, MatCheckboxModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatRadioModule
} from '@angular/material';
import { NgxEditorModule } from 'ngx-editor';
import { NgxSummernoteModule } from 'ngx-Summernote';
import { Vessel_detailsService } from './services/vessel_details.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
    imports: [
        CommonModule,

        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatIconModule,

        OwlDateTimeModule,
        OwlNativeDateTimeModule,

        DragDropModule,
        NgxDropzoneModule,

        NgxEditorModule,
        NgxSummernoteModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        RoleCheckDirective,
        HasOnePermissionDirective,
        HasAllPermissionsDirective,
        ExceptPermissionsDirective,
        ExceptRolesDirective,

    ],
    exports: [
        RoleCheckDirective,
        HasOnePermissionDirective,
        HasAllPermissionsDirective,
        ExceptPermissionsDirective,
        ExceptRolesDirective,
        CommonModule,

        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,

        DragDropModule,
        NgxDropzoneModule,

        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatIconModule,

        OwlDateTimeModule,
        OwlNativeDateTimeModule,

        TooltipModule,
        NgxEditorModule,
        NgxSummernoteModule,
    ],
    providers: [
        AuthenticationService,
        UsersService,
        OptionService,
        RoleService,
        PermissionService,
        Vessel_detailsService,
        Email_subscribersService,
        Vessel_commentsService,
        Vessel_depositsService,
        About_membersService,
        Home_slidersService,
        Home_testimonialService,
        Vessel_bidsService,
        Potntial_auctionService,
        Latest_newsService,
        Contact_formService,
        FileUploadService,
        CMS_pageService

        //        {provide: ToastOptions, useClass: CustomOption}
    ]
})
export class SharedCustomModule { }
