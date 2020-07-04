import { Deserializable } from 'src/app/shared/models/deserializable.model';
import { ShippingOrder } from './shipping-order';
import { PaymentOrder } from './payment-order';
import { CartProduct } from "src/app/core/cart/types/cart-product";

export class Order implements Deserializable {

    retailer_id: string;
    shipping: ShippingOrder;
    payment: PaymentOrder;
    cart: CartProduct[];

    deserialize(input: any) {
        Object.assign(this, input);

        this.cart = input.cart.map(
            cartProduct => new CartProduct().deserialize(cartProduct)
        );

        return this;
    }
}