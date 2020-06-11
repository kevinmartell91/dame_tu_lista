import { Deserializable } from "../../../shared/models/deserializable.model";
import { Address } from "./address";
import { FavoriteReatailers } from "../../retailer/types/favorite-retailers";

export class Buyer implements Deserializable {

    public username?: string;
    public password?: string;
    public name?: String;
    public lastname?: String;
    public email?: string;
    public address?: Address;
    public phoneNumber?: number;
    public myFavoriteRetailers?: FavoriteReatailers[];
    // what else ?
    public signUpDate?: Date;
    public lastLoginDate?: Date;
    public user_type?: string;
    public total_spent?: number;
    public total_orders?: number;
    public last_order?: Date;
  

    deserialize(input: any) {
        Object.assign(this, input);

        this.myFavoriteRetailers = input.myFavoriteRetailers.map(
            myFavoriteRetailers => new FavoriteReatailers().deserialize(myFavoriteRetailers)
        );

        return this;
    }
}




