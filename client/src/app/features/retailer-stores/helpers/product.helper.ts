import { Product } from "../../../core/retailer/types/product";
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { ProductContainerComponent } from '../../place-order/components/product-container/product-container.component';
import { element } from 'protractor';

export function getProductDeserialized(products: any):  Product[] {
    let productsList: Product[] = [];
    
    products.forEach(product => {
        productsList.push(new Product().deserialize(product))
    });

    return productsList;
}

// export function filterAllCategoriesFromProducts_removing(
//   products: Product[]
//   ): Product[] {

//   let j = 0;
//   for (let i = 1; i < products.length; i++) {
//     console.log("products[j].categoryName - products[i].categoryName ",products[j].categoryName  ,products[i].categoryName)
//     if(products[j].categoryName === products[i].categoryName ) {
      
//       console.log("deleting replicated  - slice", products.splice(i,1));
//       products.splice(i,1);
//       i -=1;
//     }
    
//     if(products.length < 2 ) {
//       console.log("FOR LOOP - BREAK");
//       break;
//     }
//     if(products.length  == i + 1) {
//      console.log("FOR LOOP - INCREMENT 'j'");
//       j += 1;
//       i = j;
//     }
//   }
//   return products;
// }

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
    // console.log("filterProductsByMaturity => ", category, variety, productsList.length);

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

// export function filterProducts( filterField: string , products :Product[]): Product[] {

//   let filterValue: string;
  
//   let filterList: Product[] = [];
//   filterList.push(products[0]);
  
  
//   products.forEach(product => {
//     switch (filterField) {
//       case STORE_CONFIG.view_type.categoryView:
//         filterValue = product.categoryName;
//         break;
        
//       case STORE_CONFIG.view_type.varietyView:
//         filterValue = product.varietyName;
//         break;
        
      
//       case STORE_CONFIG.view_type.maturityView: 
//         filterValue = product.maturityName;
//         break;

//       default: // STORE_CONFIG.view_type.seasonalView: 
//         filterValue = STORE_CONFIG.view_type.categoryView;
//         // filterValue = STORE_CONFIG.view_type.seasonalView;
//         /**
//          * this doesn't work since it is a boolean value,
//          * not a string to compare in this function as the
//          * othe cases
//          */
//         break;
//     }
//     if( !isOnList(filterField, filterValue, filterList )) {
//       filterList.push(product);
//     }
//   });

//   return filterList;
// }

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