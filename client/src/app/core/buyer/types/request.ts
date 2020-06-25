import { RequestState } from 'src/app/shared/types/request-state';

export interface Requests {
    getBuyer: RequestState;
    putBuyer: RequestState;
    deleteBuyer: RequestState;
    postBuyers: RequestState;
    getBuyers: RequestState;
    updateBuyerFavoriteRetailers: RequestState;
    updateBuyerAddress: RequestState;
}