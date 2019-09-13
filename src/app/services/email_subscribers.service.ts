import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";
import {User} from "../models";

@Injectable()
export class Email_subscribersService {
    constructor(private http:HttpClient){

    }
    getEmail_subscribers(email_subscriber) {
        return this.http.post<any>(AppConstants.SITE_URL + 'email_subscriber/get_email_subscribers', email_subscriber);
    }
    // getVesselDetailsById(id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/get_vessel_detail', { id: id });
    // }
    // saveVesselDetails(vessel) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/save_vessel_detail', vessel);
    // }
    // deleteVesselDetailsById(vessel_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail', { id: vessel_id });
    // }

    // deleteVesselDetailsGalleryImage(image_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail_gallery_image', { id: image_id });
    // }
}