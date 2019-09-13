import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Latest_newsService {
    constructor(private http:HttpClient){

    }
    getLatest_news(latest_newss) {
        return this.http.post<any>(AppConstants.SITE_URL + 'latest_news/get_latest_newss', latest_newss);
    }
    getLatest_newsById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'latest_news/get_latest_news', { id: id });
    }
    saveLatest_news(latest_news) {
        return this.http.post<any>(AppConstants.SITE_URL + 'latest_news/save_latest_news', latest_news);
    }
    deleteLatest_news(latest_news) {
        return this.http.post<any>(AppConstants.SITE_URL + 'latest_news/delete_latest_news', { id: latest_news });
    }

}