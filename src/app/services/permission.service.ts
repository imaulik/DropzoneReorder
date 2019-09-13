import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { Permission } from '../models/permission.model';

@Injectable()
export class PermissionService {

    constructor(private http: HttpClient) {
    }
    getAllPermissions() {
        return this.http.get<any>(AppConstants.SITE_URL + 'permission/get_all_permissions');
    }
    getPermissions(permission: Permission) {
        return this.http.post<any>(AppConstants.SITE_URL + 'permission/get_permissions', permission);
    }
    getPermissionById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'permission/get_permission', { id: id });
    }
    savePermission(permission) {
        return this.http.post<any>(AppConstants.SITE_URL + 'permission/save_permission', permission);
    }
}

