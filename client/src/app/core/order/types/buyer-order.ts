import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class BuyerOrder implements Deserializable {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
