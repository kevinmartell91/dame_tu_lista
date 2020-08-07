import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, tap } from 'rxjs/operators';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { Address } from '../types/address';
import { Buyer } from '../types/buyer';
import { BuyerEndPoint } from './buyer.endpoint';
import { BuyerStoreState } from './buyer.store.state';


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
                // // console.log("registerNewBuyer => response : ",  buyer);
            })
        )
    }

    updateBuyerAddress(buyer_id: string, address: Address): Observable<any> {
        return this.endPoint.patchBuyerAddress(
            this.storeRequestStateUpdater,
            buyer_id,
            address).pipe(
                tap( ( buyer: any ) => {
                    // console.log("Buyer address updated => response : ",  buyer);
                })
            )
    }

    setNewBuyerState( newBuyer: Buyer):void  {
        this.setState({
            ...this.state,
            buyer: newBuyer
        })
    }

    getBuyers(): Observable<any>{
        // console.log("getBuyers");
        return this.endPoint.getBuyers(this.storeRequestStateUpdater).pipe(
            tap( (response: any) => {
                // console.log("DATA ORDERSS RESPONSE =>", response);
                return response;
            })
        )
    }
    
}