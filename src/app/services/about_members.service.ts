import { Injectable } from "@angular/core";
import { AppConstants } from "../constants/app.constants";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class About_membersService {
    constructor(private http: HttpClient) {

    }
    getAbout_members(about_members) {
        return this.http.post<any>(AppConstants.SITE_URL + 'about_member/get_about_members', about_members);
    }
    getAbout_memberById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'about_member/get_about_member', { id: id });
    }
    saveAbout_member(about_member) {
        return this.http.post<any>(AppConstants.SITE_URL + 'about_member/save_about_member', about_member);
    }
    deleteAbout_member(about_member) {
        return this.http.post<any>(AppConstants.SITE_URL + 'about_member/delete_about_member', { id: about_member });
    }

}