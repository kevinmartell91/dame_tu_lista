import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from "../../../shared/helpers/endpoint.helpers";
import { BuyerAccountEndPoint } from './buyer-account.endpoint';
import { BuyerAccountStoreState } from './buyer-account.store.state';



@Injectable()
export class BuyerAccountStore extends Store<BuyerAccountStoreState>
    implements OnDestroy {
    
    buyerAccount$ : Observable<Buyer>;
    private ngUnsubscribe$: Subject<undefined> = new Subject();
    private reloadBuyer$: Subject<undefined> = new Subject();
    private storeRequestUpdater: StoreRequestStateUpdater;

    constructor( 
        private endPoint: BuyerAccountEndPoint
    ) {
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
        this.initReloadBuyer$(buyer_id);
        this.reloadBuyer();
        
    }

    reloadBuyer() : void {
        this.reloadBuyer$.next();
    }

    setNewBuyerAccountState(buyerAccount: Buyer):void {
        this.setState({
            ...this.state,
            buyerAccount: buyerAccount
        })
    }

    private initReloadBuyerOrigin$(buyer_id: string): void {
        this.reloadBuyer$
            .pipe(
                switchMap( () => {
                    return this.endPoint.getBuyerAccount(this.storeRequestUpdater,buyer_id);
                }),
                tap( (data: any) => {
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
    private initReloadBuyer$(buyer_id: string) {
        return this.endPoint.getBuyerAccount(this.storeRequestUpdater,buyer_id)
            .pipe(
                 map( (data: any) => {
                    this.setState({
                        ...this.state,
                        buyerAccount: new Buyer().deserialize(data.data),
                    })
                })
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
                    this.setState({
                        ...this.state,
                        buyerAccount: new Buyer().deserialize(data.entity)
                    })
                })
            )
            .subscribe(
                (val) => {
                    // console.log("val", val);
                },
                (err) => {
                    // console.log("err",err);
                },
                () => {
                    // console.log("complete - this.storeRequestUpdater ", this.storeRequestUpdater);
                }
            );      
    }

 
   
}