import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { Order } from '../types/order';
import { ORDER_CONFIG } from '../order.config';
import { getHeadersForNewOrders  } from "src/app/shared/helpers/endpoint.helpers";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

        console.log("API", request.url);
        return this.http.post<any>(request.url, order, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                console.log("API response", response);
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                console.log("ERROR",error);
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

        console.log("API", request.url);
        return this.http.post<any>(request.url, options).pipe(
            map( (response: any) => {
                requestStateUpdater(request.name,{
                    inProgress: false
                });
                console.log("API response", response);
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                console.log("ERROR",error);
                return throwError(error);
            })
        )
    }

}