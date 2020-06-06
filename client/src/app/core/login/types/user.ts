import { Deserializable } from '../../../shared/models/deserializable.model';

export class LoginUser implements Deserializable{
  username: string;
  password: string;
  login_type: string;
  token?: string;

  deserialize(input: any) {
  	Object.assign(this, input);
  	return this;
  }
  // https://nehalist.io/angular-7-models/

}