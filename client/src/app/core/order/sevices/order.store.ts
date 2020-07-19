import { Store } from 'rxjs-observable-store';
import { OrderStoreState } from './order.store.states';
import { OrderEndPoint } from './order.endpoint';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../types/order';
import { map, tap, switchMap, retry, takeUntil, throwIfEmpty } from 'rxjs/operators';
import { StoreRequestStateUpdater } 
    from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';


@Injectable({ providedIn: "root"})
export class OrderStore extends Store<OrderStoreState>{

    order$: Observable<Order>;
    orderListByRetailerId$: Observable<Order[]>;
    private ngUnsubscribe$: Subject<undefined> = new Subject();
    private reloadOrderListByRetailerId$ : Subject<undefined> = new Subject();

    private storeRequestStateUpdater: StoreRequestStateUpdater

    constructor(
        private http: OrderEndPoint,
    ){
        super(new OrderStoreState())

        this.order$ = this.state$.pipe(map ( state => state.order))
        this.orderListByRetailerId$ = this.state$.pipe(map ( state => state.orderListByRetailerId));

        this.storeRequestStateUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);

        console.log("this.storeRequestStateUpdater BRIAN",this.storeRequestStateUpdater);

    }


    get order(): Order {
        return this.state.order;
    }

    get orderListByRetailerId(): Order[] {
        return this.state.orderListByRetailerId;
    }

    initOrderByRetailerId(retailer_id: string):void {
        this.getOrdersByRetailerId(retailer_id);
        this.reloadOrderListByRetailerId();

    }
    reloadOrderListByRetailerId() : void {
        this.reloadOrderListByRetailerId$.next();
    }

    setNewOrderState(newOrders: Order[]): void {
        this.setState({
            ...this.state,
            orderListByRetailerId : newOrders
        })
    }

    public genereteOrder( order: Order): Observable<any>{
        console.log("genereteOrder", order);
        return this.http.postOrder(this.storeRequestStateUpdater, order).pipe(
            tap( (response: any) => {
                console.log("DATA ORDER RESPONSE =>", response);
                return response;
            })
        )
    }

    public updateOrder( order: Order): Observable<any>{
        console.log("genereteOrder", order);
        return this.http.putOrder(this.storeRequestStateUpdater, order).pipe(
            tap( (response: any) => {
                console.log("DATA ORDER UPDATE =>", response);
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

    private getOrdersByRetailerIdOrigin(retailer_id: string): void {

        this.reloadOrderListByRetailerId$
        .pipe(
            switchMap( () => {
                    console.log("switchMap => getOrdersByRetailerId()");
                    return this.http.getOrdersByReatilerId(retailer_id, this.storeRequestStateUpdater);
                }),
                tap ( (res: any) => {
                    
                    let orders: Order[]=[];
                    res.data.forEach(ele => {
                        orders.push(new Order().deserialize(ele));
                    });
                    
                    console.log("Orders by retailer Id - Store - getOrdersByRetailerId()", orders);
                    this.setState({
                        ...this.state,
                        orderListByRetailerId : orders
                    })
                }),
                retry(),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe();
    }

    
    private getOrdersByRetailerId(retailer_id: string) {

        return this.http.getOrdersByReatilerId(retailer_id, this.storeRequestStateUpdater)
            .pipe(
                map( (res: any) => {
                    let orders: Order[]=[];
                    res.data.forEach(ele => {
                        orders.push(new Order().deserialize(ele));
                    });
                    
                    console.log("Orders by retailer Id - Store - getOrdersByRetailerId()", orders);
                    this.setState({
                        ...this.state,
                        orderListByRetailerId : orders
                    })
                })
            )
            .subscribe();
    }

}