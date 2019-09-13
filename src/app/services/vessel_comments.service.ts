
import { Injectable } from "@angular/core";
import { AppConstants } from "../constants/app.constants";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class Vessel_commentsService {
    constructor(private http: HttpClient) {

    }
    getVessel_comments(vessel_comment) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_comment/get_vessel_comments', vessel_comment);
    }
    getVessel_commentById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_comment/get_vessel_comment', { id: id });
    }
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