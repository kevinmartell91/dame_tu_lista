import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { Buyer } from '../types/buyer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BUYER_CONFIG } from '../buyer.config';
import { getHeadersForNewUsers } from 'src/app/shared/helpers/endpoint.helpers';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: "root"})
export class BuyerEndPoint {


    constructor(
        private http: HttpClient
    ){}


    postBuyer(
        requestStoreUpdater: StoreRequestStateUpdater,
        newBuyer: Buyer
    ) {
        const request = BUYER_CONFIG.request.postBuyers;
        requestStoreUpdater(request.name, {
            inProgress: true
        })
        
        const options = getHeadersForNewUsers();
        
        return this.http.post<Buyer>(request.url, newBuyer, options).pipe(
            map( response => {
                requestStoreUpdater(request.name, {
                    inProgress: false
                });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStoreUpdater(request.name,{
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })
        );
    }    
}