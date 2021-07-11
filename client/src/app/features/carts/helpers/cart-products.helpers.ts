import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { Product } from 'src/app/core/retailer/types/product';

export const transformOrderCartProductToCartProduct = (
  products: CartProductOrder[]
): CartProduct[] => {
  let saleQuoteCartProducts: CartProduct[] = [];

  products.forEach((product) => {
    saleQuoteCartProducts.push(new CartProduct().deserialize(product));
  });
  console.log(
    'transformOrderCartProductToCartProduct res=> ',
    saleQuoteCartProducts
  );

  return saleQuoteCartProducts;
};

export const getProductFromLocalStorageByProductId = (id: string): Product => {
  const productList: Product[] = JSON.parse(
    sessionStorage.temp_session_storage
  ).product_list;

  if (productList && productList.length > 0) {
    return productList.find((prod) => prod._id === id);
  }
  return null;
};
