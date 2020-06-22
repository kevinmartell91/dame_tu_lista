import { CartProduct } from './cart-product';
import { Sort } from 'src/app/shared/types/sort';

export class ShoppingCart {
    products: CartProduct[] = null;
    sort: Sort;
}