import { RequestState } from 'src/app/shared/types/request-state';

export interface Requests {
    getOrder: RequestState;
    putOrder: RequestState;
    deleteOrder: RequestState;
    postOrders: RequestState;
    getOrders: RequestState;
    getOrdersByRetailerId: RequestState;
}