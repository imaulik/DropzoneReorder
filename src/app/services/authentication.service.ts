import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }

    login(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'auth/login', user);
    }

    user_register(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'signup', user);
    }

    forget_password(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'user/forgot_password', user);
    }

    reset_password(data) {
        return this.http.post<any>(AppConstants.SITE_URL + 'check_reset_token', data);
    }

    reset_password_save(user) {
        return this.http.post<any>(AppConstants.SITE_URL + 'password_admin/reset', user);
    }


}
