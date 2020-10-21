import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from "../../../shared/helpers/endpoint.helpers";
import { getProductDeserialized } from "../helpers/product.helper";
import * as airtable from "../types/airtable";
import { RetailerEndpoint } from './retailer.endpoint';
import { RetailerStoreStoreState } from './retailer.store.state';



@Injectable({ providedIn: 'root'})
export class RetailerStoreStore extends Store<RetailerStoreStoreState>
    implements OnDestroy {

    retailer$: Observable<Retailer>;
    private ngUnsubscribe$: Subject<undefined> = new Subject();
    private reloadRetailer$: Subject<undefined> = new Subject();
    private storeRequestUpdater: StoreRequestStateUpdater;


    constructor( private endPoint: RetailerEndpoint){
        super(new RetailerStoreStoreState())

        this.retailer$ = this.state$.pipe(map(state => state.retailer));
        this.storeRequestUpdater = 
            endpointHelpers.getStoreRequestStateUpdater(this);
    }
    
    ngOnDestroy():void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
    
    init(retailer_id: string): void {
        this.initReloadRetailer$(retailer_id);
        this.reloadRetailer();
        
    }

    reloadRetailer() : void {
        this.reloadRetailer$.next();
    }


    private initReloadRetailer$(retailer_id: string): void {
        this.retailer$
            .pipe(
                switchMap( () => {
                    return this.endPoint.getRetailer(retailer_id, this.storeRequestUpdater);
                }),
                tap( (response: any) => {
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data),
                    }),
                    this.setState({
                        ...this.state,
                        productsList: {
                            ...this.state.productsList,
                            products:  getProductDeserialized(response.data.store.productsList)
                        }
                    })
                }),
                retry(),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe();
    }

    public getRetailer(
        retailer_id: string 
    ) {
        let res;
        return this.endPoint.getRetailer(retailer_id, this.storeRequestUpdater)
            .pipe(
                map( (response: any) => {
                    res = response;
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data)
                    }),
                    this.setState({
                        ...this.state,
                        productsList: {
                            ...this.state.productsList,
                            products:  getProductDeserialized(response.data.store.productsList)
                        }
                    })
                })
            )
            .subscribe(
                (val) => {
                },
                (err) => {
                },
                () => {
                }
            );      
    }
    public getRetailerByNameStore(
        retailer_store_name: string 
    ) {
        let res;
        return this.endPoint.getRetailerByNameStore(retailer_store_name, this.storeRequestUpdater)
            .pipe(
                map( (response: any) => {
                    res = response;
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data)
                    }),
                    this.setState({
                        ...this.state,
                        productsList: {
                            ...this.state.productsList,
                            products:  getProductDeserialized(response.data.store.productsList)
                        }
                    })
                })
            )
            .subscribe(
                (val) => {
                },
                (err) => {
                },
                () => {
                }
            );      
    }

   

    public getAirTabeDATA():any {
     
        return airtable.manuallyRetrievedAritableData();
    }
    
    
}