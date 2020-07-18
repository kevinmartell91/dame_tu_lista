import { Retailer } from '../types/retailer';
import { Requests } from '../types/requests';

export class RetailerStoreState {
    retailer: Retailer = null;
    retailerList: Retailer [] = []; 
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