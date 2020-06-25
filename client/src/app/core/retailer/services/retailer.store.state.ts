import { Retailer } from '../types/retailer';
import { Requests } from '../types/requests';

export class RetailerStoreState {
    buyer: Retailer = null;
    buyerList: Retailer [] = []; 
    request: Requests = { 
        getRetailer: {},
        putRetailer: {},
        deleteRetailer: {},
        postRetailers: {},
        getRetailers: {},
        putRetailerStore: {},
        postRetailerProductList: {},
        putRetailerProductList: {}
    }
}