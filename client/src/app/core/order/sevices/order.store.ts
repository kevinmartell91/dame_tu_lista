import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { Order } from '../types/order';
import { OrderEndPoint } from './order.endpoint';
import { OrderStoreState } from './order.store.states';

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<OrderStoreState> {
  order$: Observable<Order>;
  orderListByRetailerId$: Observable<Order[]>;
  orderListByBuyerId$: Observable<Order[]>;
  private ngUnsubscribe$: Subject<undefined> = new Subject();
  private reloadOrderListByRetailerId$: Subject<undefined> = new Subject();

  private storeRequestStateUpdater: StoreRequestStateUpdater;

  constructor(private http: OrderEndPoint) {
    super(new OrderStoreState());

    this.order$ = this.state$.pipe(map((state) => state.order));
    this.orderListByRetailerId$ = this.state$.pipe(
      map((state) => state.orderListByRetailerId)
    );
    this.orderListByBuyerId$ = this.state$.pipe(
      map((state) => state.orderListByBuyerId)
    );

    this.storeRequestStateUpdater =
      endpointHelpers.getStoreRequestStateUpdater(this);
  }

  get order(): Order {
    return this.state.order;
  }

  get orderListByRetailerId(): Order[] {
    return this.state.orderListByRetailerId;
  }

  initOrderByRetailerId(retailer_id: string): void {
    // this.getOrdersByRetailerId(retailer_id);
    this.getOrdersByRetailerIdOrigin(retailer_id);
    this.reloadOrderListByRetailerId();
  }

  initOrderByBuyerId(retailer_id: string): void {
    this.getOrdersByBuyerId(retailer_id);
    this.reloadOrderListByRetailerId();
  }

  initSaleQuoteOrderId(order_id: string): Observable<any> {
    console.log('initSaleQuoteOrderId', order_id);
    return this.http.getOrder(order_id, this.storeRequestStateUpdater).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }
  // this.order$
  // .pipe(
  //     switchMap( () => {
  //             return this.http.getOrder(order_id, this.storeRequestStateUpdater);
  //         }),
  //         tap ( (res: any) => {

  //             // let orders: Order
  //             // res.data.forEach(ele => {
  //             //     orders.push(new Order().deserialize(ele));
  //             // });

  //             this.setState({
  //                 ...this.state,
  //                 order : new Order().deserialize(res);
  //             })
  //         }),
  //         retry(),
  //         takeUntil(this.ngUnsubscribe$)
  //     )
  //     .subscribe();
  // }

  reloadOrderListByRetailerId(): void {
    this.reloadOrderListByRetailerId$.next();
  }

  setNewOrderState(newOrders: Order[]): void {
    this.setState({
      ...this.state,
      orderListByRetailerId: newOrders,
    });
  }

  public generateOrder(order: Order): Observable<any> {
    return this.http.postOrder(this.storeRequestStateUpdater, order).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }

  public updateOrder(order: Order): Observable<any> {
    return this.http.putOrder(this.storeRequestStateUpdater, order).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }

  getOrders(): Observable<any> {
    return this.http.getOrders(this.storeRequestStateUpdater).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }

  private getOrdersByRetailerIdOrigin(retailer_id: string): void {
    this.reloadOrderListByRetailerId$
      .pipe(
        switchMap(() => {
          return this.http.getOrdersByReatilerId(
            retailer_id,
            this.storeRequestStateUpdater
          );
        }),
        tap((res: any) => {
          let orders: Order[] = [];
          res.data.forEach((ele) => {
            orders.push(new Order().deserialize(ele));
          });

          this.setState({
            ...this.state,
            orderListByRetailerId: orders,
          });
        }),
        retry(),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe();
  }

  private getOrdersByRetailerId(retailer_id: string) {
    return this.http
      .getOrdersByReatilerId(retailer_id, this.storeRequestStateUpdater)
      .pipe(
        map((res: any) => {
          let orders: Order[] = [];
          res.data.forEach((ele) => {
            orders.push(new Order().deserialize(ele));
          });

          this.setState({
            ...this.state,
            orderListByRetailerId: orders,
          });
        })
      )
      .subscribe();
  }

  private getOrdersByBuyerId(retailer_id: string) {
    return this.http
      .getOrdersByBuyerId(retailer_id, this.storeRequestStateUpdater)
      .pipe(
        map((res: any) => {
          let orders: Order[] = [];
          res.data.forEach((ele) => {
            orders.push(new Order().deserialize(ele));
          });

          this.setState({
            ...this.state,
            orderListByBuyerId: orders,
          });
        })
      )
      .subscribe();
  }
}
