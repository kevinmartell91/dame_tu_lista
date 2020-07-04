import { Deserializable } from 'src/app/shared/models/deserializable.model';
import { BuyerOrder } from './buyer-order';
import { AddressOrder } from './address-order';
import { TrackingOrder } from './tracking-order';

export class ShippingOrder implements Deserializable {

    buyer: BuyerOrder;
    deliveryNotes: string;
    address: AddressOrder;
    tracking: TrackingOrder;

    deserialize(input: any) {

        Object.assign(this, input);
        return this;
    }

}