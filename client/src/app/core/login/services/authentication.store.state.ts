import { Requests } from '../types/requests';
import { LoginUser } from '../types/user';

export class AuthenticationStoreState {
  loginUser: LoginUser = null;
  requests: Requests = {
    postAuthentication: {},
  };
}
