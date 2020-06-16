import { Product } from "../../../core/retailer/types/product";
import { STORE_CONFIG } from 'src/app/core/store/store_config';

export function getProductVector(products: any):  Product[] {
    let productsList: Product[] = [];
    
    products.forEach(product => {
        productsList.push(new Product().deserialize(product))
    });

    return productsList;
}

export function filterProducts( filterField: string , products :Product[]): Product[] {

  let filterValue: string;
  
  let filterList: Product[] = [];
  filterList.push(products[0]);
  
  
  products.forEach(product => {
    switch (filterField) {
      case STORE_CONFIG.view_type.categoryView:
        filterValue = product.categoryName;
        break;
        
      case STORE_CONFIG.view_type.varietyView:
        filterValue = product.varietyName;
        break;
        
      
      default: // STORE_CONFIG.view_type.maturityView: 
        filterValue = product.maturityName;
        break;
    }
    if( !isOnList(filterField, filterValue, filterList )) {
      filterList.push(product);
    }
  });

  return filterList;
}

export function isOnList (filterField: string, filterValue: string, products: Product[]): Boolean {

    let isOnList: Boolean = false;
    let searchFiled: string;

    products.forEach(product => {
      switch (filterField) {
        case STORE_CONFIG.view_type.categoryView:
          searchFiled = product.categoryName;
          break;
          
        case STORE_CONFIG.view_type.varietyView:
          searchFiled = product.varietyName;
          break;
          
        
        default: // STORE_CONFIG.view_type.maturityView: 
          searchFiled = product.maturityName;
          break;
      }
      if( filterValue == searchFiled ) {
        isOnList =  true;
      }
    });
    
    return isOnList;
  }