import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";
import {User} from "../models";

@Injectable()
export class Vessel_detailsService {
    constructor(private http:HttpClient){

    }
    getAllVesselDetails() {
        return this.http.get<any>(AppConstants.SITE_URL + 'vessel_detail/get_all_vessel_details');
    }
    getVesselDetails(vessel) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/get_vessel_details', vessel);
    }
    getVesselDetailsById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/get_vessel_detail', { id: id });
    }
    saveVesselDetails(vessel) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/save_vessel_detail', vessel);
    }
    deleteVesselDetailsById(vessel_id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail', { id: vessel_id });
    }

    deleteVesselDetailsGalleryImage(image_id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail_gallery_image', { id: image_id });
    }
    saveGallaryOrder(order) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/save_gallery_order', order);
    }
}