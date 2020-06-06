import { Deserializable } from "../../../shared/models/deserializable.model";
import { Product } from "./product";
import { Store } from './store';

export class Retailer implements Deserializable {

    public username?: string;
    public password?: string;
    public email?: string;
    public phoneNumber?: string;
    public store?: Store;
    public storeProducts?: Product[];

    deserialize(input: any) {
        Object.assign(this, input);

        // this.store = input.store.map(
        //     storee =>  new Store().deserialize(storee)
        // );
        
        this.storeProducts = input.storeProducts.map(
            product => new Product().deserialize(product)
        );

        return this;
    }

    public getNumberOfProducts() {
        return this.storeProducts.length;
    }
    public getBannerUrl(): string{
        return `url(${this.store.imgUrl})`;
    }
}