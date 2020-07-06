import { Deserializable } from 'src/app/shared/models/deserializable.model';
import { ShippingOrder } from './shipping-order';
import { PaymentOrder } from './payment-order';
import { CartProductOrder } from "./cart-product-order";

export class Order implements Deserializable {

    _id: string;
    retailer_id: string;
    shipping: ShippingOrder;
    payment: PaymentOrder;
    cart: CartProductOrder[];

    deserialize(input: any) {
        Object.assign(this, input);

        this.cart = input.cart.map(
            cartProduct => new CartProductOrder().deserialize(cartProduct)
        );

        return this;
    }
}