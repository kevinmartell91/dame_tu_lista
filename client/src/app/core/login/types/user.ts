import { Deserializable } from '../../../shared/models/deserializable.model';

export class LoginUser implements Deserializable{
  name?: string;
  email?: string;
  password?: string;
  login_type?: string;
  token?: string;
  entity?: String;

  deserialize(input: any) {
  	Object.assign(this, input);
  	return this;
  }
  // https://nehalist.io/angular-7-models/

}