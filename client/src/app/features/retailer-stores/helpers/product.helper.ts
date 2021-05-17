import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { Product } from '../../../core/retailer/types/product';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { MaturityProductsByVariety } from '../types/maturityProductsByVariety';
import * as _ from 'lodash';
import { keyBy } from 'lodash';

export function getProductDeserialized(products: any): Product[] {
  let productsList: Product[] = [];

  products.forEach((product) => {
    productsList.push(new Product().deserialize(product));
  });

  return productsList;
}

export function filterAllProductsByCategory(products: Product[]): Product[] {
  let categoryList: Product[] = [];
  categoryList.push(products[0]);

  let j = 0;
  for (let i = 1; i < products.length; i++) {
    if (products[j].categoryName !== products[i].categoryName) {
      if (
        !isOnList(
          STORE_CONFIG.view_type.categoryView,
          products[i].categoryName,
          '',
          categoryList
        )
      ) {
        categoryList.push(products[i]);
      }
    }

    if (products.length == i + 1) {
      j += 1;
      i = j;
    }
  }
  return _.sortBy(categoryList, ['categoryName']);
}

export function filterProductsByVariety(
  category: string,
  products: Product[]
): Product[] {
  let varietyList: Product[] = [];

  // Filtering fruits by varitety (organic fruits)
  products.forEach((product) => {
    if (product.categoryName == category && product.isOrganic == true) {
      if (
        !isOnList(
          STORE_CONFIG.view_type.varietyView,
          product.varietyName,
          '',
          varietyList
        )
      ) {
        varietyList.push(product);
      }
    }
  });

  // Filtering fruits by varitety (not organic fruits)
  products.forEach((product) => {
    if (product.categoryName == category && product.isOrganic == false) {
      if (
        !isOnList(
          STORE_CONFIG.view_type.varietyView,
          product.varietyName,
          '',
          varietyList
        )
      ) {
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
): Product[] {
  let maturityList: Product[] = [];
  let isOrganic: boolean = JSON.parse(isOrganicStr);

  productsList.forEach((product) => {
    if (
      product.categoryName == category &&
      product.varietyName == variety &&
      product.isOrganic == isOrganic
    ) {
      maturityList.push(product);
    }
  });
  return maturityList;
}

export function isOnList(
  viewType: string,
  filterValue1: string,
  filterValue2: any,
  products: Product[]
): Boolean {
  let isOnList: Boolean = false;
  let value: string;
  let isOrganic: boolean;

  products.forEach((product) => {
    switch (viewType) {
      case STORE_CONFIG.view_type.categoryView:
        value = product.categoryName;
        if (filterValue1 == value) {
          isOnList = true;
        }
        break;

      case STORE_CONFIG.view_type.varietyView:
        value = product.varietyName;
        isOrganic = product.isOrganic;
        if (
          filterValue1 === value
          // && filterValue2 === isOrganic
        ) {
          isOnList = true;
        }
        break;

      case STORE_CONFIG.view_type.maturityView:
        value = product.maturityName;
        if (filterValue1 == value) {
          isOnList = true;
        }
        break;

      default:
        // STORE_CONFIG.view_type.seasonalView:
        value = STORE_CONFIG.view_type.categoryView;
        // searchFiled = STORE_CONFIG.view_type.seasonalView;
        /**
         * this doesn't work since it is a boolean value,
         * not a string to compare in this function as the
         * othe cases
         */
        if (filterValue1 == value) {
          isOnList = true;
        }
        break;
    }
  });

  return isOnList;
}

export function getProductFromCartProduct(cartProduct: CartProduct): Product {
  let product = new Product();

  product._id = cartProduct._id;
  product.categoryImageUrl = cartProduct.categoryImageUrl;
  product.categoryName = cartProduct.categoryName;
  product.varietyImageUrl = cartProduct.varietyImageUrl;
  product.varietyName = cartProduct.varietyName;
  product.currency = cartProduct.currency;
  product.price = cartProduct.price;
  product.isSmallSize = cartProduct.isSmallSize;
  product.isMediumSize = cartProduct.isMediumSize;
  product.isBigSize = cartProduct.isBigSize;
  product.isKilo = cartProduct.isKilo;
  product.isUnit = cartProduct.isUnit;
  product.isOrganic = cartProduct.isOrganic;
  product.isSeasonal = cartProduct.isSeasonal;
  product.isMaturityDetails = cartProduct.isMaturityDetails;
  product.maturityImageUrl = cartProduct.maturityImageUrl;
  product.maturityName = cartProduct.maturityName;
  product.maturityInfo = cartProduct.maturityInfo;
  product.maturityEatIn = cartProduct.maturityEatIn;
  product.maturityLastFor = cartProduct.maturityLastFor;
  product.isInStock = cartProduct.isInStock;

  product.quantity = cartProduct.quantity;

  // console.log('TRANSFORMED TO PRODUCT - getProductFromCartProduct()', product);
  return product;
}

export function transformCartProductsIntoProducts(
  storeProducts: Product[],
  cartProducts: CartProduct[]
): Product[] {
  // console.log("STORE PRODUCTS", storeProducts);
  // console.log("CART PRODUCTS", cartProducts);

  storeProducts.map((storeProd) => {
    return (storeProd.quantity = 0);
  });

  cartProducts.forEach((cartProd) => {
    // storeProducts.forEach(storeProd => {
    //   if (cartProd._id === storeProd._id) {
    //     updateProduct.push(getProductFromCartProduct(cartProd));
    //   } else {
    //     updateProduct.push(storeProd);
    //   }
    // });
    storeProducts.map((storeProd) => {
      if (cartProd._id === storeProd._id) {
        storeProd.quantity = cartProd.quantity;
      }
    });
  });

  return storeProducts;
}

export function transformCartProductsIntoProductsWithToppings(
  storeProducts: Product[],
  cartProducts: CartProduct[]
): Product[] {
  // console.log('storeProducts', cartProducts);
  storeProducts.map((storeProd) => {
    return (storeProd.quantity = 0);
  });

  // productId Frequency:
  let keyById = keyBy(cartProducts, '_id');

  //counting quantity products for each cartProduct _id in idFrequency
  _.forOwn(keyById, function (_cartPro, key) {
    let countProduct = 0;
    cartProducts.map((cartPro) => {
      if (cartPro._id === key) countProduct += cartPro.quantity;
    });
    keyById[key].quantity = countProduct;
  });
  // });

  // console.log('keyById', keyById);

  //passing to updated quantities to storeProduct
  storeProducts.map((storeProd) => {
    if (keyById.hasOwnProperty(storeProd._id)) {
      storeProd.quantity = keyById[storeProd._id].quantity;
    }
  });

  return storeProducts;
}

export function getMaturityProductsByVariety(
  products: Product[]
): MaturityProductsByVariety[] {
  // console.log(" this.storeProducts", products);

  if (!products) return;

  let arrayMaturityProductsByVariety: MaturityProductsByVariety[] = [];
  const arrayCategories = filterAllProductsByCategory(products);
  if (!arrayCategories) return;
  //category name is what matters
  arrayCategories.forEach((category_product_list) => {
    // variety names is what matters
    const arrayVarieties = filterProductsByVariety(
      category_product_list.categoryName,
      products
    );
    if (!arrayVarieties) return;
    // console.log("arrayVarieties.length", arrayVarieties);

    // maturity is what matters
    arrayVarieties.forEach((variety_product_list) => {
      let maturityProductsByVariety: MaturityProductsByVariety = new MaturityProductsByVariety();

      maturityProductsByVariety.categoryName =
        category_product_list.categoryName;
      maturityProductsByVariety.varietyName = variety_product_list.varietyName;

      const arrayMaturity = filterProductsByMaturity(
        category_product_list.categoryName,
        variety_product_list.varietyName,
        String(variety_product_list.isOrganic),
        products
      );
      if (!arrayMaturity) return;

      maturityProductsByVariety.productList = arrayMaturity;
      arrayMaturityProductsByVariety.push(maturityProductsByVariety);
    });
  });

  // resolve(arrayMaturityProductsByVariety,"");
  // return arrayMaturityProductsByVariety;
  // console.log(
  //   ' SORT',
  //   _.sortBy(arrayMaturityProductsByVariety, ['categoryName', 'varietyName'])
  // );

  return _.sortBy(arrayMaturityProductsByVariety, [
    'categoryName',
    'varietyName',
  ]);
}
