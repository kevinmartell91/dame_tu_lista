import { Buyer } from '../../../core/buyer/types/buyer';
import { Request } from '../types/requests';

export class BuyerAccountStoreState {
  buyerAccount: Buyer = null;
  requests: Request = {
    getBuyer: {},
  };
}
