import {Injectable} from '@angular/core';
import {AppConstants} from '../constants/app.constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Home_testimonialService {
    constructor(private http: HttpClient){

    }
    getHomeTestimonial(home_testimonial) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_testimonial/get_home_testimonials', home_testimonial);
    }
    getHomeTestimonialById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_testimonial/get_home_testimonial', { id: id });
    }
    saveHomeTestimonial(home_testimonial) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_testimonial/save_home_testimonial', home_testimonial);
    }
    deleteHomeTestimonial(home_testimonial) {
        return this.http.post<any>(AppConstants.SITE_URL + 'home_testimonial/delete_home_testimonial', { id: home_testimonial });
    }

}