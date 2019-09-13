import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { Role } from '../models/role.model';

@Injectable()
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getAllRoles() {
        return this.http.get<any>(AppConstants.SITE_URL + 'role/get_all_roles');
    }
    getAllPermissions() {
        return this.http.get<any>(AppConstants.SITE_URL + 'permission/get_all_permissions');
    }

    getRoles(role: Role) {
        return this.http.post<any>(AppConstants.SITE_URL + 'role/get_roles', role);
    }
    getRole(role: Role) {
        return this.http.post<any>(AppConstants.SITE_URL + 'role/get_role', { id: role });
    }

    getRole_permission(role: Role) {
        return this.http.post<any>(AppConstants.SITE_URL + 'role/get_role_permission', { id: role });
    }

    saveRole(role) {
        return this.http.post<any>(AppConstants.SITE_URL + 'role/save_role', role);
    }

    deleteRole(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'role/delete_role', { id: id });
    }
}

