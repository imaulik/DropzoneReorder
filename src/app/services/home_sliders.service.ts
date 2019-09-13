import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Home_slidersService {
    constructor(private http:HttpClient){

    }
    getHome_sliders(home_sliders) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_slider/get_home_sliders', home_sliders);
    }
    getHome_sliderById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_slider/get_home_slider', { id: id });
    }
    saveHome_slider(home_slider) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_slider/save_home_slider', home_slider);
    }
    deleteHome_slider(home_slider) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_slider/delete_home_slider', { id: home_slider });
    }

}