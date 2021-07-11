import { Deserializable } from '../../../shared/models/deserializable.model';
import { Store } from './store';

export class Retailer implements Deserializable {
  public _id: string;
  public username?: string;
  public password?: string;
  public name?: string;
  public lastname?: string;
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
  public getBannerUrl(): string {
    return `url(${this.store.imgUrl})`;
  }
}
