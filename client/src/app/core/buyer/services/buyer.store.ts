import { Store } from 'rxjs-observable-store';
import { BuyerStoreState } from './buyer.store.state';
import { Observable } from 'rxjs';
import { Buyer } from '../types/buyer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { BuyerEndPoint } from './buyer.endpoint';
import { map, tap } from 'rxjs/operators';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root'})
export class BuyerStore extends Store<BuyerStoreState> {

    buyer$: Observable<Buyer>;
    private storeRequestStateUpdater: StoreRequestStateUpdater;

    constructor( 
        private endPoint: BuyerEndPoint 
    ) {
        super(new BuyerStoreState())

        this.buyer$ = this.state$.pipe(map (state => state.buyer))
        this.storeRequestStateUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);

    }

    registerNewBuyer(newBuyer: Buyer): Observable<any> {
        return this.endPoint.postBuyer(this.storeRequestStateUpdater, newBuyer).pipe(
            tap( ( buyer: any ) => {
                console.log("registerNewBuyer => response : ",  buyer);
            })
        )
    }
    
}