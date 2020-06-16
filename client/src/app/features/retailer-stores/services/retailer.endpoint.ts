import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { getHeadersForGet } from 'src/app/shared/helpers/endpoint.helpers';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { RETAILER_STORES_CONFIG } from '../retailer-stores.config';

@Injectable({providedIn: 'root'})
export class RetailerEndpoint {

    constructor(
        private http: HttpClient
    ) {}

    public getRetailer(
        retailer_id: string,
        requesStateUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_STORES_CONFIG.request.getRetailer
        const options = getHeadersForGet();

        requesStateUpdater(request.name, {inProgress: true } );

        return this.http.get<any>(request.url + retailer_id, options )
            .pipe(
                map( response => {
                    requesStateUpdater(request.name, { inProgress: false });
                    return response;
                }),
                catchError((error: HttpErrorResponse) => {
                    requesStateUpdater(request.name,{ 
                        inProgress: false,
                        error: true
                    });
                    return throwError(error);
                })
            

            );
    }
}