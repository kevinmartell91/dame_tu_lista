import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getHeadersForGet } from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { RETAILER_STORES_CONFIG } from '../retailer-stores.config';
import { RETAILER_CONFIG } from 'src/app/core/retailer/retailer.config';

@Injectable({ providedIn: 'root' })
export class RetailerEndpoint {

    constructor(
        private http: HttpClient
    ) { }

    public getRetailer(
        retailer_id: string,
        requesStateUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_STORES_CONFIG.request.getRetailer
        const options = getHeadersForGet();

        requesStateUpdater(request.name, { inProgress: true });

        return this.http.get<any>(request.url + retailer_id, options).pipe(
            map(response => {
                requesStateUpdater(request.name, { inProgress: false });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requesStateUpdater(request.name, {
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })

        );
    }
    public getRetailerByNameStore(
        retailer_store_name: string,
        requesStateUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_STORES_CONFIG.request.getRetailerByStoreName
        const options = getHeadersForGet();

        requesStateUpdater(request.name, { inProgress: true });

        return this.http.get<any>(request.url + retailer_store_name, options).pipe(
            map(response => {
                requesStateUpdater(request.name, { inProgress: false });
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                requesStateUpdater(request.name, {
                    inProgress: false,
                    error: true
                });
                return throwError(error);
            })

        );
    }

    public getAirTableData(
        retailer_id: string,
        airTableBase: string,
        base: string,
        api_key: string,
        requesStateUpdater: StoreRequestStateUpdater
    ) {
        const request = RETAILER_STORES_CONFIG.request.getAirTableDataByUrlAndApiKey;

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const params = {
            airTableBase: airTableBase,
            base: base,
            api_key: api_key
        }
        let options = {
            headers: headers,
            params: params
        }
        requesStateUpdater(request.name, {
            inProgress: true
        })

        return this.http.post<any>(request.url + retailer_id, options)
            .pipe(
                map(response => {
                    requesStateUpdater(request.name, {
                        inProgress: false
                    })
                    console.log("response response ", response);
                    return response;
                }),
                catchError((error: HttpErrorResponse) => {
                    requesStateUpdater(request.name, {
                        inProgress: false,
                        error: true
                    })
                    return throwError(error);
                })
            )

    }


}