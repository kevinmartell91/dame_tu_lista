import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { Product } from "../../../core/retailer/types/product";

export function getProductDeserialized(products: any):  Product[] {
    let productsList: Product[] = [];
    
    products.forEach(product => {
        productsList.push(new Product().deserialize(product))
    });

    return productsList;
}


export function filterAllProductsByCategory(
  products: Product[]
  ): Product[] {

  let categoryList: Product[] = [];
  categoryList.push(products[0]);

  let j = 0;
  for (let i = 1; i < products.length; i++) {
    if(products[j].categoryName !== products[i].categoryName ) {
      if( !isOnList(STORE_CONFIG.view_type.categoryView, products[i].categoryName,"", categoryList )) {
        categoryList.push(products[i]);
      }
    }
    
    if(products.length  == i + 1) {
      j += 1;
      i = j;
    }
  }
  return categoryList;
}


export function filterProductsByVariety(
  category: string,
  products: Product[]
  ): Product[] {

  let varietyList: Product[] = [];

  
  // Filtering fruits by varitety (organic fruits)
  products.forEach(product => {
    if( product.categoryName == category  && product.isOrganic == true) {
      if( !isOnList(STORE_CONFIG.view_type.varietyView, product.varietyName,"", varietyList )) {
        varietyList.push(product);
      }
    }
  });

  // Filtering fruits by varitety (not organic fruits)
  products.forEach(product => {
    if( product.categoryName == category  && product.isOrganic == false) {
      if( !isOnList(STORE_CONFIG.view_type.varietyView, product.varietyName,"", varietyList )) {
        varietyList.push(product);
      }
    }
  });
  
  return varietyList;
}


export function filterProductsByMaturity(
    category: string, 
    variety: string,
    isOrganicStr: string,
    productsList: Product[]
  ): Product[]{

  let maturityList: Product[] = [];
  let isOrganic: boolean = JSON.parse(isOrganicStr);

  productsList.forEach(product => {
    if(product.categoryName == category &&
      product.varietyName == variety &&
      product.isOrganic == isOrganic ) {
        maturityList.push(product);
      }
  });
  return maturityList;
}

export function isOnList (viewType: string, filterValue1: string, filterValue2: any, products: Product[]): Boolean {

    let isOnList: Boolean = false;
    let value: string;
    let isOrganic: boolean;

    products.forEach(product => {
      switch (viewType) {
        case STORE_CONFIG.view_type.categoryView:
          value = product.categoryName;
          if( filterValue1 == value ) {
            isOnList =  true;
          }
          break;
          
        case STORE_CONFIG.view_type.varietyView:
          value = product.varietyName;
          isOrganic = product.isOrganic;
          if( filterValue1 === value 
            // && filterValue2 === isOrganic 
            ) {
            isOnList =  true;
          }
          break;

        case STORE_CONFIG.view_type.maturityView:
          value = product.maturityName;
          if( filterValue1 == value ) {
            isOnList =  true;
          }
          break;
        
        default: // STORE_CONFIG.view_type.seasonalView: 
          value = STORE_CONFIG.view_type.categoryView;
          // searchFiled = STORE_CONFIG.view_type.seasonalView;
          /**
           * this doesn't work since it is a boolean value,
           * not a string to compare in this function as the
           * othe cases
           */
          if( filterValue1 == value ) {
            isOnList =  true;
          }
          break;
      }
      
    });
    
    return isOnList;
  }