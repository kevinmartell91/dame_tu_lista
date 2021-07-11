import { Sort } from 'src/app/shared/types/sort';
import { CartProduct } from './cart-product';

export class ShoppingCart {
  products: CartProduct[] = null;
  sort: Sort;
}
