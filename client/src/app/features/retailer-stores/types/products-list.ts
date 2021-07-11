import { Product } from 'src/app/core/retailer/types/product';
import { Sort } from 'src/app/shared/types/sort';

export interface ProductsList {
  products: Product[];
  sort: Sort;
}
