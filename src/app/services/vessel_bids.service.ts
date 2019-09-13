import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Vessel_bidsService {
    constructor(private http:HttpClient){

    }
    getVessel_bids(vessel_bids) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_bid/get_vessel_bids', vessel_bids);
    }
    getVessel_bidById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'vessel_bid/delete_vessel_bid', { id: id });
    }
    // saveVessel_deposits(vessel_deposit) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_deposits/save_vessel_deposits', vessel_deposit);
    // }
    // deleteVesselDetailsById(vessel_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail', { id: vessel_id });
    // }

    // deleteVesselDetailsGalleryImage(image_id) {
    //     return this.http.post<any>(AppConstants.SITE_URL + 'vessel_detail/delete_vessel_detail_gallery_image', { id: image_id });
    // }
}