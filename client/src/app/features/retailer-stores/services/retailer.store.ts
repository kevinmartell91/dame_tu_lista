import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from "../../../shared/helpers/endpoint.helpers";
import { getProductDeserialized, transformCartProductsIntoProducts } from "../helpers/product.helper";
import * as airtable from "../types/airtable";
import { RetailerEndpoint } from './retailer.endpoint';
import { RetailerStoreStoreState } from './retailer.store.state';
import { Product } from 'src/app/core/retailer/types/product';
import { CartProduct } from 'src/app/core/cart/types/cart-product';

@Injectable({ providedIn: 'root' })
export class RetailerStoreStore extends Store<RetailerStoreStoreState>
    implements OnDestroy {

    retailer$: Observable<Retailer>;
    products$: Observable<Product[]>
    private ngUnsubscribe$: Subject<undefined> = new Subject();
    private reloadRetailer$: Subject<undefined> = new Subject();
    private storeRequestUpdater: StoreRequestStateUpdater;


    constructor(private endPoint: RetailerEndpoint) {
        super(new RetailerStoreStoreState())

        this.retailer$ = this.state$.pipe(map(state => state.retailer));
        this.products$ = this.state$.pipe(map(state => this.state.productsList.products));
        this.storeRequestUpdater =
            endpointHelpers.getStoreRequestStateUpdater(this);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    init(retailer_id: string): void {
        this.initReloadRetailer$(retailer_id);
        this.reloadRetailer();

    }

    reloadRetailer(): void {
        this.reloadRetailer$.next();
    }


    private initReloadRetailer$(retailer_id: string): void {
        this.retailer$
            .pipe(
                switchMap(() => {
                    return this.endPoint.getRetailer(retailer_id, this.storeRequestUpdater);
                }),
                tap((response: any) => {
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data),
                    }),
                        this.setState({
                            ...this.state,
                            productsList: {
                                ...this.state.productsList,
                                products: getProductDeserialized(response.data.store.productsList)
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
                map((response: any) => {
                    res = response;
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data),
                        productsList: {
                            ...this.state.productsList,
                            products: getProductDeserialized(response.data.store.productsList)
                        }
                    })
                    // ,
                    //     this.setState({
                    //         ...this.state,
                    //         productsList: {
                    //             ...this.state.productsList,
                    //             products: getProductDeserialized(response.data.store.productsList)
                    //         }
                    //     })
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
        return this.endPoint.getRetailerByNameStore(retailer_store_name, this.storeRequestUpdater)
            .pipe(
                map((response: any) => {
                    this.setState({
                        ...this.state,
                        retailer: new Retailer().deserialize(response.data),
                        productsList: {
                            ...this.state.productsList,
                            products: getProductDeserialized(response.data.store.productsList)
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

                    const chacheData = sessionStorage.temp_session_storage;
                    if (chacheData && JSON.parse(chacheData).cart_product_list.length > 0) {

                        //## restore from Session Storage
                        const memCashedProd: Product[] =
                            JSON.parse(chacheData).product_list;
                        const memCashedCartProd: CartProduct[] =
                            JSON.parse(chacheData).cart_product_list;

                        // ETL of memCashed to Product data type
                        const payloadProducts: Product[] =
                            transformCartProductsIntoProducts(
                                memCashedProd,
                                memCashedCartProd
                            );

                        // update products STORE with cart product
                        this.updateProductsFromSessionStorage(payloadProducts);
                        // console.log("INIT - RetailerStoresComponent chacheData: ", chacheData);

                    }
                }
            );
    }

    public updateProductsFromSessionStorage(cachedProducts: Product[]) {

        this.setState({
            ...this.state,
            productsList: {
                ...this.state.productsList,
                products: cachedProducts
            }
        })

        console.log("Finished updateProductsFromSessionStorage");
    }

    public getAirTabeDATA(): any {

        return airtable.manuallyRetrievedAritableData();
    }


}