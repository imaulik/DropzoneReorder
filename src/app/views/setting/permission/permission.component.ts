import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppConstants } from '../../../constants/app.constants';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LazyLoadEvent, Permission } from '../../../models/index';
import { PermissionService, LoaderService } from './../../../services/index';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';

@Component({
    templateUrl: 'permission.component.html',
})
export class PermissionComponent implements OnInit {
    dataSource;
    permission: any = {};
    dtInstance: any = {};
    public loading = false;
    pageEvent: PageEvent;
    sorts: Sort;
    displayedColumns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() page: EventEmitter<PageEvent>;
    @Output() sortChange: EventEmitter<Sort>;

    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private router: Router,
        public _http: HttpClient,
        public permissionService: PermissionService
    ) {

    }
    ngOnInit() {
        this.dtInstance.columns = 'id';
        this.dtInstance.sortype = 'asc';
        this.dtInstance.pageIndex = 0;
        this.dtInstance.first = 0;
        this.dtInstance.rows = 10;
        this.dtInstance.globalFilter = '';
        this.loadDatas(this.dtInstance);

    }
    loadDatas(dtInstance) {
        this.loaderService.display(true);
        this.permissionService.getPermissions(dtInstance).subscribe(response => {
                this.dataSource = response.data;
                this.displayedColumns = ['name', 'option'];
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





}
