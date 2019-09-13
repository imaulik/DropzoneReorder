import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LazyLoadEvent, User } from '../../models/index';
import {OptionService, CMS_pageService, LoaderService, Home_testimonialService} from '../../services/index';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';

@Component({
    templateUrl: 'home_testimonial.component.html',
})
export class Home_testimonialComponent implements OnInit {
    public loading = false;
    page_names = [];
    dataSource;
    dtInstance: any = {};
    pageEvent: PageEvent;
    sorts: Sort;
    displayedColumns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() page: EventEmitter<PageEvent>;
    @Output() sortChange: EventEmitter<Sort>;

    constructor(
        private loaderService: LoaderService,
        private optionService: OptionService,
        private cms_pageService: CMS_pageService,
        private homeTestimonialService: Home_testimonialService,
        private router: Router,
        public _http: HttpClient) {
        const AuthUser = JSON.parse(localStorage.getItem('currentUser'));
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
        this.homeTestimonialService.getHomeTestimonial(dtInstance).subscribe(response => {
            this.dataSource = response.data;
            this.displayedColumns = ['title', 'option'];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator.length = response.totalrecords;
            this.dataSource.paginator.pageIndex = this.dtInstance.pageIndex;
            this.dataSource.paginator.pageSize = this.dtInstance.rows;
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
