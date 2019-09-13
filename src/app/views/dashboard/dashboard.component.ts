import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';


@Component({
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent {
    user: any = {};
    user_res: any = {};
    user_break: any = {};
    locations = [];
    user_check_in: boolean = false;
    user_break_in: boolean = false;
    user_break_out: boolean = false;
    user_check_out: boolean = false;
    check_out_ip;
    attendance_id;
    constructor(private http: HttpClient, public loaderService: LoaderService) {
        const AuthUser = JSON.parse(localStorage.getItem('currentUser'));
        //        this.user = AuthUser.id;

    }

}
