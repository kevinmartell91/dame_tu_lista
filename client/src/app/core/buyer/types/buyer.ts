import { Deserializable } from "../../../shared/models/deserializable.model";
import { Address } from "./address";
import { FavoriteReatailers } from "../../retailer/types/favorite-retailers";

export class Buyer implements Deserializable {

    public username?: string;
    public password?: string;
    public email?: string;
    public address?: Address;
    public phoneNumber?: number;
    public myFavoriteRetailers?: FavoriteReatailers[];
    public numOrders?: number;
    // what else ?
  

    deserialize(input: any) {
        Object.assign(this, input);

        // this.address = input.address.map(
        //     address => new Address().deserialize(address)
        // );

        this.myFavoriteRetailers = input.myFavoriteRetailers.map(
            myFavoriteRetailers => new FavoriteReatailers().deserialize(myFavoriteRetailers)
        );

        return this;
    }
}




