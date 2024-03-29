import { Deserializable } from 'src/app/shared/models/deserializable.model';
import { CartProductOrder } from './cart-product-order';
import { PaymentOrder } from './payment-order';
import { ShippingOrder } from './shipping-order';

export class Order implements Deserializable {
  _id: string;
  orderType: string;
  retailer_id: string;
  shipping: ShippingOrder;
  payment: PaymentOrder;
  cart: CartProductOrder[];

  deserialize(input: any) {
    Object.assign(this, input);

    this.cart = input.cart.map((cartProduct) =>
      new CartProductOrder().deserialize(cartProduct)
    );

    return this;
  }

  isOrderStatusPushed(orderStatus: string): boolean {
    let exist = false;
    this.shipping.tracking.orderStatus.forEach((ele) => {
      if (ele[0] === orderStatus) exist = true;
    });
    return exist;
  }

  updateOrderStatus(newOrderStatus: string, order: Order): Order {
    let orderUpdate = order;
    let existOrderStatus = this.isOrderStatusPushed(newOrderStatus);
    if (!existOrderStatus) {
      orderUpdate.shipping.tracking.orderStatus.push([
        newOrderStatus,
        new Date(),
      ]);
    }
    return orderUpdate;
  }
}
