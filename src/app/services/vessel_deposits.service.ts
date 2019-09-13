import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Vessel_depositsService {
    constructor(private http:HttpClient){

    }
    getVessel_deposits(vessel_deposits) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_deposits/get_vessel_deposits', vessel_deposits);
    }
    getVessel_depositById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_deposits/get_vessel_deposit', { id: id });
    }
    saveVessel_deposits(vessel_deposit) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_deposits/save_vessel_deposits', vessel_deposit);
    }
    // deleteVesselDetailsById(vessel_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail', { id: vessel_id });
    // }

    // deleteVesselDetailsGalleryImage(image_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail_gallery_image', { id: image_id });
    // }
}