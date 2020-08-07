import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getHeadersForGet } from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
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
        
        return this.http.get<any>(request.url + retailer_id, options ).pipe(
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

    public getAirTabeData(){
        
        let url = `https://api.airtable.com/v0/app90UT0ZXO2CSQwS/test%20cases`;
        let api_key = "keyNqSR6NoYacM8nC";
        let headers = { headers: { Authorization : "Bearer "+ api_key}}

        // console.log("url", url);

       return this.http.get(url,
            { headers: { Authorization: "Bearer " + api_key }});
    
    }

   
}