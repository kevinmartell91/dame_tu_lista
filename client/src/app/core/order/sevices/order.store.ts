import { Store } from 'rxjs-observable-store';
import { OrderStoreState } from './order.store.states';
import { OrderEndPoint } from './order.endpoint';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../types/order';
import { map, tap } from 'rxjs/operators';
import { StoreRequestStateUpdater } 
    from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';


@Injectable({ providedIn: "root"})
export class OrderStore extends Store<OrderStoreState>{

    order$: Observable<Order>;
    orderList$: Observable<Order[]>;
    private storeRequestStateUpdater: StoreRequestStateUpdater

    constructor(
        private http: OrderEndPoint,
    ){
        super(new OrderStoreState())

        this.order$ = this.state$.pipe(map ( state => state.order))
        this.orderList$ = this.state$.pipe(map ( state => state.orderList));

        this.storeRequestStateUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);

    }

    get order(): Order {
        return this.state.order;
    }


    genereteOrder( order: Order): Observable<any>{
        console.log("genereteOrder", order);
        return this.http.postOrder(this.storeRequestStateUpdater, order).pipe(
            tap( (response: any) => {
                console.log("DATA ORDER RESPONSE =>", response);
                return response;
            })
        )
    }

    getOrders(): Observable<any>{
        console.log("getOrders");
        return this.http.getOrders(this.storeRequestStateUpdater).pipe(
            tap( (response: any) => {
                console.log("DATA ORDERSS RESPONSE =>", response);
                return response;
            })
        )
    }

}