import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { CartProduct } from 'src/app/core/cart/types/cart-product';

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
