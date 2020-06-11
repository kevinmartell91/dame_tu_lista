import { Deserializable } from "../../../shared/models/deserializable.model";
import { Address } from "./address";
import { Product } from './product';

export class Store implements Deserializable {

    public name?: string;
    public imgUrl?: string;
    public isDeliveryService?: Boolean;
    public isPickUpService?: Boolean;
    public deliveryInfo?: string;
    public pickUpInfo?: string;
    public address?: Address;    
    public productsList?: Product[];


    deserialize(input: any) {
        Object.assign(this, input);

        // this.address = input.address.map(
        //     address => new Address().deserialize(address)
        // );

        this.productsList = input.productsList.map(
            product => new Product().deserialize(product)
        );

        return this;
    }

}
