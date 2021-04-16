import { Product } from 'src/app/core/retailer/types/product';
import { CartProduct } from '../types/cart-product';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import {
  ToppingModalResult,
  ToppingSelected,
} from 'src/app/shared/components/topping/types/toppingSelected';

export function getCartProductFromProduct(
  productSelected: Product,
  quantitySelected: number,
  sizeSelected: string
): CartProduct {
  let newCartProduct = new CartProduct();

  newCartProduct._id = productSelected._id;
  newCartProduct.categoryImageUrl = productSelected.categoryImageUrl;
  newCartProduct.categoryName = productSelected.categoryName;
  newCartProduct.varietyImageUrl = productSelected.varietyImageUrl;
  newCartProduct.varietyName = productSelected.varietyName;
  newCartProduct.currency = productSelected.currency;
  newCartProduct.price = productSelected.price;
  newCartProduct.isSmallSize = productSelected.isSmallSize;
  newCartProduct.isMediumSize = productSelected.isMediumSize;
  newCartProduct.isBigSize = productSelected.isBigSize;
  newCartProduct.isKilo = productSelected.isKilo;
  newCartProduct.isUnit = productSelected.isUnit;
  newCartProduct.isOrganic = productSelected.isOrganic;
  newCartProduct.isSeasonal = productSelected.isSeasonal;
  newCartProduct.isMaturityDetails = productSelected.isMaturityDetails;
  newCartProduct.maturityImageUrl = productSelected.maturityImageUrl;
  newCartProduct.maturityName = productSelected.maturityName;
  newCartProduct.maturityInfo = productSelected.maturityInfo;
  newCartProduct.maturityEatIn = productSelected.maturityEatIn;
  newCartProduct.maturityLastFor = productSelected.maturityLastFor;
  newCartProduct.isInStock = productSelected.isInStock;

  newCartProduct.quantity = quantitySelected;
  newCartProduct.size = sizeSelected;
  newCartProduct.details = '';
  newCartProduct.totalPrice = updateTotalProductPrice(
    newCartProduct.quantity,
    newCartProduct.price
  );

  return newCartProduct;
}
export function getCartProductWithToppingsFromProductWithToppings(
  productSelected: Product,
  sizeSelected: string,
  toppingModalResult: ToppingModalResult
): CartProduct {
  let newCartProduct = new CartProduct();

  newCartProduct._id = productSelected._id;
  newCartProduct.categoryImageUrl = productSelected.categoryImageUrl;
  newCartProduct.categoryName = productSelected.categoryName;
  newCartProduct.varietyImageUrl = productSelected.varietyImageUrl;
  newCartProduct.varietyName = productSelected.varietyName;
  newCartProduct.currency = productSelected.currency;
  newCartProduct.price = productSelected.price;
  newCartProduct.isSmallSize = productSelected.isSmallSize;
  newCartProduct.isMediumSize = productSelected.isMediumSize;
  newCartProduct.isBigSize = productSelected.isBigSize;
  newCartProduct.isKilo = productSelected.isKilo;
  newCartProduct.isUnit = productSelected.isUnit;
  newCartProduct.isOrganic = productSelected.isOrganic;
  newCartProduct.isSeasonal = productSelected.isSeasonal;
  newCartProduct.isMaturityDetails = productSelected.isMaturityDetails;
  newCartProduct.maturityImageUrl = productSelected.maturityImageUrl;
  // newCartProduct.maturityName = productSelected.maturityName;
  newCartProduct.maturityName = `${productSelected.maturityName}  (${toppingModalResult.productLabel})`;

  newCartProduct.maturityInfo = productSelected.maturityInfo;
  newCartProduct.maturityEatIn = productSelected.maturityEatIn;
  newCartProduct.maturityLastFor = productSelected.maturityLastFor;
  newCartProduct.isInStock = productSelected.isInStock;

  newCartProduct.quantity = toppingModalResult.quantity;
  newCartProduct.size = sizeSelected;
  newCartProduct.details = '';

  // create idAux (_id + "_" timestamp
  const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds)
  newCartProduct.idAux = `${productSelected._id}_${currentTimeInMilliseconds}`;

  newCartProduct.totalPrice = updateTotalProductPrice(
    newCartProduct.quantity,
    newCartProduct.price
  );
  newCartProduct.totalAmount = newCartProduct.totalPrice;

  //if has toppings update TOTAL AMOUNT and TOTAL PRICE(is NaN )
  if (toppingModalResult.toppingsSelected.length > 0) {
    const selectedToppings: ToppingSelected[] =
      toppingModalResult.toppingsSelected;
    newCartProduct.toppings = selectedToppings;

    const totalPrice = calculateTotalPricePerProductWithToppings(
      newCartProduct.quantity,
      newCartProduct.price,
      newCartProduct.toppings
    );
    newCartProduct.totalPrice = totalPrice;
    newCartProduct.totalAmount = totalPrice;
  }

  return newCartProduct;
}

export function updateTotalProductPrice(
  quantity: number,
  price: number
): number {
  return round(quantity * price, 2);
}

export function calculateCartTotalPrice(products: CartProduct[]): number {
  let totalCartPrice: number = 0;
  products.forEach((product) => {
    totalCartPrice += product.price * product.quantity;
  });
  return totalCartPrice;
}

export const calculateTotalPricePerProductWithToppings = (
  quantity: number,
  unitPrice: number,
  toppingSelected: ToppingSelected[]
): number => {
  // const quantity = cartProduct.quantity;
  // const unitPrice = cartProduct.price;
  // const toppingSelected = cartProduct.toppings;
  let totalToppingsPrice: number = 0;

  toppingSelected.forEach((topping) => {
    const hasMultipleToppings =
      topping.selected.split(',')[0] !== topping.selected;
    const hasToppingPrice =
      hasMultipleToppings &&
      topping.selected.split(',')[0].split('S/.')[0] !==
        topping.selected.split(',')[0];

    if (hasToppingPrice) {
      console.log('topping', topping);
      topping.selected.split(',').map((toppinWtihPrice) => {
        const toppingPrice: number = +toppinWtihPrice.split('S/.')[1].trim();
        totalToppingsPrice += toppingPrice;
      });
    }
  });

  return (unitPrice + totalToppingsPrice) * quantity;
};

export function round(value: number, precision: number): number {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function getTotalProductsOnShoppingCart(
  cartProducts: CartProduct[]
): number {
  let totalShippingCartProducts = 0;

  if (cartProducts === [] || cartProducts[0] === undefined)
    return totalShippingCartProducts;

  if (containtToppings(cartProducts[0].categoryName)) {
    cartProducts.forEach((prod) => {
      totalShippingCartProducts += prod.quantity;
    });
  } else {
    totalShippingCartProducts = cartProducts.length;
  }

  return totalShippingCartProducts;
}
