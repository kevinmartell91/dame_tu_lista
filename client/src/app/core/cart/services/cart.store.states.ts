import { CartProduct } from "../types/cart-product";
import { ShoppingCart } from '../types/shopping-cart';
import { SortOrder } from 'src/app/app.constants';
import { Retailer } from '../../retailer/types/retailer';

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