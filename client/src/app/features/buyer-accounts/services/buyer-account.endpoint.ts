import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getHeadersForGet } from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { BUYER_ACCOUNT_CONFIG } from '../buyer-account.config';


@Injectable()
export class BuyerAccountEndPoint {
    constructor(
        private http: HttpClient
    ) {}

    public getBuyerAccount(
        requestStateUpdater: StoreRequestStateUpdater,
        buyer_id: string
    ) {
        const request =  BUYER_ACCOUNT_CONFIG.request.getBuyers;
        const options = getHeadersForGet();
        requestStateUpdater(request.name, {inProgress: true});
        
        return this.http.get<any>(request.url + buyer_id, options).pipe(
            map( response => {
                requestStateUpdater(request.name, {inProgress: false});
                // console.log("BuyerAccountEndPoint", response);   
                
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name, {
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        );
    }

    public patchtFavoriteRetailer(
        buyer_id: string,
        retailer_email: string,
        requestStateUpdater: StoreRequestStateUpdater
    ) {
        const request =  BUYER_ACCOUNT_CONFIG.request.patchFavoriteRetailer;
        const options = getHeadersForGet();
        requestStateUpdater(request.name, {inProgress: true});
        
        return this.http.patch<any>(request.url + buyer_id, {retailer_email:retailer_email}, options).pipe(
            map( response => {
                console.log("request.url", request.url + buyer_id);
                requestStateUpdater(request.name, {inProgress: false});
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStateUpdater(request.name, {
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        );
    }
}