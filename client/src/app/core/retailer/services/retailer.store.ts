import { Store } from 'rxjs-observable-store';
import { Observable } from 'rxjs';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { map, tap } from 'rxjs/operators';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';
import { Injectable } from '@angular/core';
import { RetailerStoreState} from "../services/retailer.store.state";
import { Retailer } from '../types/retailer';
import { RetailerEndPoint } from './retailer.endpoint';


@Injectable({ providedIn: 'root'})
export class RetailerStore extends Store<RetailerStoreState> {

    buyer$: Observable<Retailer>;
    private storeRequestStateUpdater: StoreRequestStateUpdater;

    constructor( 
        private endPoint: RetailerEndPoint 
    ) {
        super(new RetailerStoreState())

        this.buyer$ = this.state$.pipe(map (state => state.buyer))
        this.storeRequestStateUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);

    }

    registerNewBuyer(newBuyer: Retailer): Observable<any> {
        return this.endPoint.postBuyer(this.storeRequestStateUpdater, newBuyer).pipe(
            tap( ( buyer: any ) => {
                console.log("registerNewBuyer => response : ",  buyer);
            })
        )
    }
    
}