import { Product } from 'src/app/core/retailer/types/product';
import { CartProduct } from '../types/cart-product';

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
    newCartProduct.details = "";
    newCartProduct.totalPrice = updateTotalProductPrice(newCartProduct.quantity, newCartProduct.price);

    return newCartProduct;
}


export function updateTotalProductPrice(quantity: number, price: number): number {
    return round(quantity * price, 2);
}

export function calculateCartTotalPrice(products: CartProduct[]): number {

    let totalCartPrice: number = 0;
    products.forEach(product => {
        totalCartPrice += (product.price * product.quantity);
    });
    return totalCartPrice;
}

export function round(value: number, precision: number): number {

    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;

}


