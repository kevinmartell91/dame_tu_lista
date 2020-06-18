import { Retailer } from 'src/app/core/retailer/types/retailer';
import { Request } from '../types/requests';
import { RETAILER_STORES_CONFIG } from '../retailer-stores.config';
import { ProductsList } from '../types/products-list';

export class RetailerStoreStoreState {
    retailer: Retailer = null;
    productsList: ProductsList = {
        products: [],
        sort: {
            field: RETAILER_STORES_CONFIG.defaultSortField,
            order: RETAILER_STORES_CONFIG.defaultSortOrder
        }
    };
    
    request: Request = {
        getRetailer: {}
    }
}