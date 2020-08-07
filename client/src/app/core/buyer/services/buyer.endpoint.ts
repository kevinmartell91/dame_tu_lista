import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getHeadersForNewUsers, getHeadersForPatch } from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { BUYER_CONFIG } from '../buyer.config';
import { Address } from '../types/address';
import { Buyer } from '../types/buyer';

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

    getBuyers(
        requestStoreUpdater: StoreRequestStateUpdater,
    ) {
        const request = BUYER_CONFIG.request.getBuyers;
        requestStoreUpdater(request.name, {
            inProgress: true
        })
        
        const options = getHeadersForNewUsers();
        
        return this.http.get<Buyer>(request.url, options).pipe(
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

    patchBuyerAddress(
        requestStoreUpdater: StoreRequestStateUpdater,
        buyer_id: string,
        address: Address
    ) {

        const request = BUYER_CONFIG.request.pathBuyerAddress;
        const options = getHeadersForPatch();
        const _address = {address: address};

        requestStoreUpdater(request.name, {inProgress: true});
        return this.http.patch<any>(request.url + buyer_id, _address, options).pipe(
            map( response => {
                requestStoreUpdater(request.name, {inProgress: false});
                return response;
            }),
            catchError( (error: HttpErrorResponse) => {
                requestStoreUpdater(request.name, {
                    inProgress: false,
                    error: true
                })
                return throwError(error);
            })
        )
    }

}