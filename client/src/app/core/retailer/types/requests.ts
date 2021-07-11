import { RequestState } from 'src/app/shared/types/request-state';

export interface Requests {
  getRetailer: RequestState;
  putRetailer: RequestState;
  deleteRetailer: RequestState;
  postRetailers: RequestState;
  getRetailers: RequestState;
  putRetailerStore: RequestState;
  postRetailerProductList: RequestState;
  putRetailerProductList: RequestState;
}
