import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Potntial_auctionService {
    constructor(private http:HttpClient){

    }
    getPotntial_auctions(potntial_auctions) {
        return this.http.post<any>(AppConstants.SITE_URL + 'potntial_auction/get_potntial_auctions', potntial_auctions);
    }
    getPotntial_auctionById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'potntial_auction/get_potntial_auction', { id: id });
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