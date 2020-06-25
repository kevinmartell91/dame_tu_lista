import { Buyer } from '../types/buyer';
import { Requests } from '../types/request';

export class BuyerStoreState {
    buyer: Buyer = null;
    buyerList: Buyer [] = []; 
    request: Requests = { 
        getBuyer : {},
        putBuyer : {},
        deleteBuyer : {},
        postBuyers : {},
        getBuyers : {},
        updateBuyerFavoriteRetailers : {},
        updateBuyerAddress : {}      
    }
}