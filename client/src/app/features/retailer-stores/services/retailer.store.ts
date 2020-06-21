import { Injectable, OnDestroy } from "@angular/core";
import { RetailerStoreStoreState } from './retailer.store.state';
import { RetailerEndpoint } from './retailer.endpoint';
import { Store } from 'rxjs-observable-store';
import { Observable, Subject } from 'rxjs';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { map, switchMap, tap, retry, takeUntil } from 'rxjs/operators';
import * as endpointHelpers from "../../../shared/helpers/endpoint.helpers";
import { Product } from 'src/app/core/retailer/types/product';
import { APP_CONFIG } from 'src/app/app.config';
import { getProductDeserialized } from "../helpers/product.helper";



@Injectable({ providedIn: 'root'})
// @Injectable()
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
        console.log("initReloadRetailer");
        this.retailer$
            .pipe(
                switchMap( () => {
                    console.log("SWITCH MAP");
                    return this.endPoint.getRetailer(retailer_id, this.storeRequestUpdater);
                }),
                tap( (response: any) => {
                    console.log(" retailerStore - initReloadretailer()", response);
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
                    // console.log("val", val);
                },
                (err) => {
                    console.log("err",err);
                },
                () => {
                    console.log("Completed - endPoint.getRetailer ",res);
                }
            );      
    }

    // setNewProductState(newProductsList: Product[]): void {
    //     this.setState({
    //         ...this.state,
    //         productsList: {
    //             ...this.state.productsList,
    //             products: newProductsList
    //         }
    //     });
    // }
    
    
}