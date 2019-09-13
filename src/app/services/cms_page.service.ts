import { Injectable } from "@angular/core";
import { AppConstants } from "../constants/app.constants";
import { HttpClient } from "@angular/common/http";
import { User } from "../models";

@Injectable()
export class CMS_pageService {
    constructor(private http: HttpClient) {

    }
    getCMS_pages(cms_pages) {
        return this.http.post<any>(AppConstants.SITE_URL + 'cms_page/get_cms_pages', cms_pages);
    }
    getCMS_pageById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'cms_page/get_cms_page', { id: id });
    }
    saveCMS_page(cms_page) {
        return this.http.post<any>(AppConstants.SITE_URL + 'cms_page/save_cms_page', cms_page);
    }
    deleteCMS_pageById(page_id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'cms_page/delete_cms_page', { id: page_id });
    }
}