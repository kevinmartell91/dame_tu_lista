import { Requests } from '../types/requests';
import { Retailer } from '../types/retailer';

export class RetailerStoreState {
  retailer: Retailer = null;
  retailerList: Retailer[] = [];
  request: Requests = {
    getRetailer: {},
    putRetailer: {},
    deleteRetailer: {},
    postRetailers: {},
    getRetailers: {},
    putRetailerStore: {},
    postRetailerProductList: {},
    putRetailerProductList: {},
  };
}
