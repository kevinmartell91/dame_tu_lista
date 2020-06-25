import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getHeadersForNewUsers } from 'src/app/shared/helpers/endpoint.helpers';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Retailer } from '../types/retailer';
import { RETAILER_CONFIG } from "../retailer.config";
@Injectable({ providedIn: "root"})
export class RetailerEndPoint {


    constructor(
        private http: HttpClient
    ){}


    postBuyer(
        requestStoreUpdater: StoreRequestStateUpdater,
        newRetailer: Retailer
    ) {
        const request = RETAILER_CONFIG.request.postRetailers;
        requestStoreUpdater(request.name, {
            inProgress: true
        })
        
        const options = getHeadersForNewUsers();
        
        return this.http.post<Retailer>(request.url, newRetailer, options).pipe(
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