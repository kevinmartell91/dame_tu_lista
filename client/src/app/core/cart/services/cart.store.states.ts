import { SortOrder } from 'src/app/app.constants';
import { Retailer } from '../../retailer/types/retailer';
import { ShoppingCart } from '../types/shopping-cart';

export class CartStoreState {
    shoppingCart: ShoppingCart =  {
        products: [],
        sort: {
            field: "Todo",
            order: SortOrder.Asc
        }
    };
    favoriteRetailerSelected: Retailer;
}