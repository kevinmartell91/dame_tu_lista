import { Deserializable } from "../../../shared/models/deserializable.model";
import { Product } from "./product";
import { Store } from './store';
import { Address } from './address';

export class Retailer implements Deserializable {

    public _id: string;
    public username?: string;
    public password?: string;
    public name?: String;
    public lastname?: String;
    public email?: string;
    public phoneNumber?: string;
    public store?: Store;
  
    public signUpDate?: Date;
    public lastLoginDate?: Date;
    public user_type?: string;
    public total_sells?: number;
    public total_orders?: number;
  

    deserialize(input: any) {
        Object.assign(this, input);

        // this.store = input.store.map(
        //     storee =>  new Store().deserialize(storee)
        // );
        return this;
    }

    public getNumberOfProducts() {
        return this.store.productsList.length;
    }
    public getBannerUrl(): string{
        return `url(${this.store.imgUrl})`;
    }
}