import { Request } from "../types/requests";
import { Buyer } from "../../../core/buyer/types/buyer";

export class BuyerAccountStoreState {
    buyerAccount : Buyer = null;
    requests: Request = {
        getBuyer: {}
    }
}