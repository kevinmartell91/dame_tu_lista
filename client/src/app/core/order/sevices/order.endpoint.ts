import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getHeadersForGet, getHeadersForNewOrders, getHeadersForPut } from "src/app/shared/helpers/endpoint.helpers";
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { ORDER_CONFIG } from '../order.config';
import { Order } from '../types/order';

@Injectable({providedIn : "root"})
export class OrderEndPoint  {

    constructor(
        private http: HttpClient,
    ) { }

    postOrder(
        requestStateUpdater: StoreRequestStateUpdater,
        order: Order
    ) {
        const options = getHeadersForNewOrders();
        const request = ORDER_CONFIG.request.postOrders;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })

        return this.http.post<any>(request.url, order, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }

    putOrder(
        requestStateUpdater: StoreRequestStateUpdater,
        order: Order
    ) {
        const options = getHeadersForPut();
        const request = ORDER_CONFIG.request.putOrder;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })

        console.log("ORDER",order);
        return this.http.put<any>(request.url + order._id, order, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }

    getOrder(
        order_id: string,
        requestStateUpdater: StoreRequestStateUpdater
    ) {
        const options = getHeadersForGet();
        const request = ORDER_CONFIG.request.getOrder;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })

        return this.http.get<any>(request.url + order_id , options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }
    getOrders(
        requestStateUpdater: StoreRequestStateUpdater
    ) {
        const options = getHeadersForNewOrders();
        const request = ORDER_CONFIG.request.getOrders;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })

        return this.http.post<any>(request.url, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }

    getOrdersByReatilerId(
        retailer_id: string,
        requestStateUpdater: StoreRequestStateUpdater
    ) {
        const options = getHeadersForGet();
        const request = ORDER_CONFIG.request.getOrdersByRetailerId;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })
        
        return this.http.get<any>(request.url + retailer_id, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }

    getOrdersByBuyerId(
        buyer_id: string,
        requestStateUpdater: StoreRequestStateUpdater
    ) {
        const options = getHeadersForGet();
        const request = ORDER_CONFIG.request.getOrdersByBuyerId;
        
        requestStateUpdater(request.name, {
            inProgress: true
        })
        
        return this.http.get<any>(request.url + buyer_id, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        )
    }

}