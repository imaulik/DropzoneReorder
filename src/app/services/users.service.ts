import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { User } from '../models/index';


@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getAllUser() {
        return this.http.get<any>(AppConstants.SITE_URL + 'user/get_all_users');
    }
    getUsers(user: User) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/get_users', user);
    }
    changeUserStatus(id, status) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/change_UserStatus', { id: id, status_id: status });
    }
    getUserById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/get_user', { id: id });
    }
    saveUser(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/save_user', user);
    }
    CheckUserEmail(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/checkemailuser', user);
    }
    CheckUserUsername(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/checkusernameuser', user);
    }
    deleteUser(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/delete_user', { id: id });
    }



}
