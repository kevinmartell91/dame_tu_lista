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

    retailer$: Observable<Retailer>;
    private storeRequestStateUpdater: StoreRequestStateUpdater;

    constructor( 
        private endPoint: RetailerEndPoint 
    ) {
        super(new RetailerStoreState())

        this.retailer$ = this.state$.pipe(map (state => state.retailer))
        this.storeRequestStateUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);

    }

    setNewRetailerState(retailer: Retailer): void{
        this.setState({
            ...this.state,
            retailer: retailer
        });
    }

    registerNewRetailer(newBuyer: Retailer): Observable<any> {
        return this.endPoint.postRetailer(this.storeRequestStateUpdater, newBuyer).pipe(
            tap( ( retailer: any ) => {
                console.log("postRetailer => response : ",  retailer);
            })
        )
    }

    getRetailerById(retailer_id: string) {
        return this.endPoint.getRetailerById(retailer_id, this.storeRequestStateUpdater)
            .pipe(
                map((data: any) => {
                    console.log("getRetailerById KEVIN", data);
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(data.data)
                    });
                })
            )
            .subscribe();
    }

    updateRetailerStoreInfo(retailer_id: string, data: any){
        return this.endPoint.putRetailerStoreInfo(retailer_id, data, this.storeRequestStateUpdater)
            .pipe(
                map((data: any) => {
                    console.log("updateRetailerStoreInfo", data);
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(data.data)
                    })
                })
            )
            .subscribe();
    }

    
}