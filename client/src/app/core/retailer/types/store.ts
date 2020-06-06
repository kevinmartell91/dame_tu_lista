import { Deserializable } from "../../../shared/models/deserializable.model";
import { Address } from "./address";

export class Store implements Deserializable {

    public name?: string;
    public address?: Address;    
    public imgUrl?: string;
    public isDeliveryService?: string;
    public isPickUpService?: string;
    public deliveryInfo?: string;
    public pickUpInfo?: string;

    deserialize(input: any) {
        Object.assign(this, input);

        this.address = input.address.map(
            address => new Address().deserialize(address)
        );

        return this;
    }

}
