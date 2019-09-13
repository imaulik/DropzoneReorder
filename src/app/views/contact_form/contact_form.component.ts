import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LazyLoadEvent, User } from '../../models/index';
import { UsersService, LoaderService } from '../../services/index';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { Contact_formService } from "../../services/index";

@Component({
    templateUrl: 'contact_form.component.html',
})
export class Contact_formComponent implements OnInit {
    public loading = false;
    dataSource;
    dtInstance: any = {};
    Vessel_id;
    pageEvent: PageEvent;
    sorts: Sort;
    displayedColumns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() page: EventEmitter<PageEvent>;
    @Output() sortChange: EventEmitter<Sort>;

    constructor(private loaderService: LoaderService,
        private router: Router,
        public _http: HttpClient,
        public contact_formService: Contact_formService) {
        const AuthUser = JSON.parse(localStorage.getItem('currentUser'));
        this.Vessel_id = AuthUser.id;
        this.dtInstance.columns = 'id';
        this.dtInstance.sortype = 'desc';
        this.dtInstance.pageIndex = 0;
        this.dtInstance.first = 0;
        this.dtInstance.rows = 10;
        this.dtInstance.globalFilter = '';
        this.loadDatas(this.dtInstance);
    }

    ngOnInit() {

    }
    loadDatas(dtInstance) {
        this.loaderService.display(true);
        this.contact_formService.getContact_form(dtInstance).subscribe(response => {
            this.dataSource = response.data;
            this.displayedColumns = ['name', 'email', 'mobile_no', 'option'];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator.length = response.totalrecords;
            this.dataSource.paginator.pageIndex = this.dtInstance.pageIndex;
            this.dataSource.paginator.pageSize = this.dtInstance.rows;
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }
    applyFilter(event) {
        this.dtInstance.pageIndex = 0;
        this.dtInstance.first = 0;
        this.dtInstance.globalFilter = event;
        this.loadDatas(this.dtInstance);
    }
    applyPagination(event) {
        this.dtInstance.pageIndex = event.pageIndex;
        this.dtInstance.first = event.pageIndex * event.pageSize;
        this.dtInstance.rows = event.pageSize;
        this.loadDatas(this.dtInstance);
    }
    applySort(event) {
        this.dtInstance.columns = event.active;
        this.dtInstance.sortype = event.direction;
        this.loadDatas(this.dtInstance);
    }

    openDeleteDialog(id) {
        Swal({
            title: 'Are you sure?',
            text: 'Do you want to delete Contact form?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.deleteDetail(id);
                Swal(
                    'Deleted!',
                    'Your Contact form has been deleted.',
                    'success'
                );
            }
        });
    }
    deleteDetail(id) {
        this.loaderService.display(true);
        this.contact_formService.deleteContact_form(id).subscribe(response => {
            this.loadDatas(this.dtInstance);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }
}
