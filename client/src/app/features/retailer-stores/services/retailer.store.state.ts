import { Retailer } from 'src/app/core/retailer/types/retailer';
import { RETAILER_STORES_CONFIG } from '../retailer-stores.config';
import { ProductsList } from '../types/products-list';
import { Request } from '../types/requests';

export class RetailerStoreStoreState {
  retailer: Retailer = null;
  productsList: ProductsList = {
    products: [],
    sort: {
      field: RETAILER_STORES_CONFIG.defaultSortField,
      order: RETAILER_STORES_CONFIG.defaultSortOrder,
    },
  };

  request: Request = {
    getRetailer: {},
  };
}
