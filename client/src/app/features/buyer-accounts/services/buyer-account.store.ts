import { Store } from 'rxjs-observable-store';
import { Observable, Subject, pipe } from 'rxjs';
import { map, tap, switchMap, takeUntil, retry } from 'rxjs/operators';


import { BuyerAccountStoreState } from './buyer-account.store.state';
import { BuyerAccountEndPoint } from './buyer-account.endpoint';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import * as endpointHelpers from "../../../shared/helpers/endpoint.helpers";
import { FavoriteReatailers } from 'src/app/core/retailer/types/favorite-retailers';
import { OnDestroy, Inject, Injectable } from '@angular/core';
import { Product } from 'src/app/core/retailer/types/product';

@Injectable()
export class BuyerAccountStore extends Store<BuyerAccountStoreState>
    implements OnDestroy {
    
    buyerAccount$ : Observable<Buyer>;
    private ngUnsubscribe$: Subject<undefined> = new Subject();
    private reloadBuyer$: Subject<undefined> = new Subject();
    private storeRequestUpdater: StoreRequestStateUpdater;

    constructor( private endPoint: BuyerAccountEndPoint) {
        super(new BuyerAccountStoreState())

        this.buyerAccount$ = this.state$.pipe(map( state => state.buyerAccount));
        this.storeRequestUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);
    }
    
    ngOnDestroy():void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
    
    init(buyer_id: string): void {
        console.log("ON INIT =>>>>>>");

        this.initReloadBuyer$(buyer_id);
        this.reloadBuyer();
        
    }

    reloadBuyer() : void {
        this.reloadBuyer$.next();
    }

    private initReloadBuyer$(buyer_id: string): void {
        this.reloadBuyer$
            .pipe(
                switchMap( () => {
                    console.log("SWITCH MAP");
                    return this.endPoint.getBuyerAccount(this.storeRequestUpdater,buyer_id);
                }),
                tap( (data: any) => {
                    console.log("BuyerAccount Store - initReloadBuyer()", data);
                    this.setState({
                        ...this.state,
                        buyerAccount: new Buyer().deserialize(data.data),
                    })
                }),
                retry(),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe();
    }

    public addFavoriteReatailer(
        buyer_id: string, 
        retailer_email: string
    ) {
        return this.endPoint.patchtFavoriteRetailer(buyer_id, retailer_email, this.storeRequestUpdater)
            .pipe(
                map( (data: any) => {
                    console.log("result", data);
                    this.setState({
                        ...this.state,
                        buyerAccount: new Buyer().deserialize(data.entity)
                    })
                })
            )
            .subscribe(
                (val) => {
                    console.log("val", val);
                },
                (err) => {
                    console.log("err",err);
                },
                () => {
                    console.log("complete - this.storeRequestUpdater ", this.storeRequestUpdater);
                }
            );      
    }

 
   
}