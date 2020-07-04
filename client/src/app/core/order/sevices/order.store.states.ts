import { Order } from '../types/order';
import { Requests } from '../types/requests';

export class OrderStoreState {
    order: Order = null;
    orderList: Order [] = [];
    request: Requests = {
        getOrder: {},
        putOrder: {},
        deleteOrder: {},
        postOrders: {},
        getOrders: {}
    }
}