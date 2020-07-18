import { Injectable } from '@angular/core';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getHeadersForNewUsers, getHeadersForPut, getHeadersForGet } from 'src/app/shared/helpers/endpoint.helpers';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Retailer } from '../types/retailer';
import { RETAILER_CONFIG } from "../retailer.config";
@Injectable({ providedIn: "root"})
export class RetailerEndPoint {


    constructor(
        private http: HttpClient
    ){}


    postRetailer(
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

    getRetailerById(
        retailer_id: string,
        requestStoreUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_CONFIG.request.getRetailer;
        requestStoreUpdater(request.name, {
            inProgress: true
        })

        const options = getHeadersForGet();

        return this.http.get(request.url + retailer_id, options).pipe(
            map(response => {
                requestStoreUpdater(request.name, {
                    inProgress: false
                })

                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStoreUpdater(request.name, {
                    inProgress: true,
                    error: true
                })

                return throwError(error);
            })
        )
    }

    putRetailerStoreInfo(
        retailer_id: string,
        data: any,
        requestStoreUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_CONFIG.request.putRetailerStore;
        requestStoreUpdater(request.name, {
            inProgress: true
        })

        const options = getHeadersForPut();

        return this.http.put(request.url + retailer_id, data, options).pipe(
            map(response => {
                requestStoreUpdater(request.name, {
                    inProgress: false
                })

                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requestStoreUpdater(request.name, {
                    inProgress: true,
                    error: true
                })

                return throwError(error);
            })
        )
    }


}