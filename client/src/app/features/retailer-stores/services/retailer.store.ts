import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import * as endpointHelpers from '../../../shared/helpers/endpoint.helpers';
import {
  getProductDeserialized,
  transformCartProductsIntoProducts,
  transformCartProductsIntoProductsWithToppings,
} from '../helpers/product.helper';
import * as airtable from '../types/airtable';
import { RetailerEndpoint } from './retailer.endpoint';
import { RetailerStoreStoreState } from './retailer.store.state';
import { Product } from 'src/app/core/retailer/types/product';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';

@Injectable({ providedIn: 'root' })
export class RetailerStoreStore
  extends Store<RetailerStoreStoreState>
  implements OnDestroy {
  retailer$: Observable<Retailer>;
  products$: Observable<Product[]>;
  private ngUnsubscribe$: Subject<undefined> = new Subject();
  private reloadRetailer$: Subject<undefined> = new Subject();
  private storeRequestUpdater: StoreRequestStateUpdater;

  constructor(private endPoint: RetailerEndpoint) {
    super(new RetailerStoreStoreState());

    this.retailer$ = this.state$.pipe(map((state) => state.retailer));
    this.products$ = this.state$.pipe(
      map((state) => state.productsList.products)
    );
    this.storeRequestUpdater = endpointHelpers.getStoreRequestStateUpdater(
      this
    );
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
          return this.endPoint.getRetailer(
            retailer_id,
            this.storeRequestUpdater
          );
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
                products: getProductDeserialized(
                  response.data.store.productsList
                ),
              },
            });
        }),
        retry(),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe();
  }

  public getRetailer(retailer_id: string) {
    let res;
    return this.endPoint
      .getRetailer(retailer_id, this.storeRequestUpdater)
      .pipe(
        map((response: any) => {
          res = response;
          this.setState({
            ...this.state,
            retailer: new Retailer().deserialize(response.data),
            productsList: {
              ...this.state.productsList,
              products: getProductDeserialized(
                response.data.store.productsList
              ),
            },
          });
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
        (val) => {},
        (err) => {},
        () => {}
      );
  }
  public getRetailerByNameStore(retailer_store_name: string) {
    return this.endPoint
      .getRetailerByNameStore(retailer_store_name, this.storeRequestUpdater)
      .pipe(
        map((response: any) => {
          this.setState({
            ...this.state,
            retailer: new Retailer().deserialize(response.data),
            productsList: {
              ...this.state.productsList,
              products: getProductDeserialized(
                response.data.store.productsList
              ),
            },
          });
        })
      )
      .subscribe(
        (val) => {},
        (err) => {},
        () => {
          setTimeout(() => {
            console.log(
              'updateProductsFromSessionStorage CALLED',
              this.state.productsList.products.length
            );
            this.updateProductsFromSessionStorage();
          }, 2500);
        }
      );
  }

  public updateProductsFromSessionStorage() {
    // console.log("updateProductsFromSessionStorage");
    // restoreBuyerSelectedProductsFromTemporaryStorage()
    const chacheData = sessionStorage.temp_session_storage;

    if (!JSON.parse(chacheData).product_list) return;
    console.log(
      'subscribe RESOLVED -  SECOND',
      JSON.parse(chacheData).product_list
    );

    const memCashedProd: Product[] = JSON.parse(chacheData).product_list;

    const memCashedCartProd: CartProduct[] = JSON.parse(chacheData)
      .cart_product_list;
    //console.log("restored Buyer Selected Products From Temporary Storage :", "memCashedProd.length", memCashedProd.length, "memCashedCartProd.length", memCashedCartProd.length);
    // if (chacheData && memCashedProd.length > 0 && memCashedCartProd.length > 0) {
    if (
      chacheData &&
      memCashedProd &&
      this.state.productsList.products.length > 0 &&
      memCashedCartProd.length > 0
    ) {
      let payloadProducts: Product[] = [];

      const isCartProductWithToppings = containtToppings(
        memCashedCartProd[0].categoryName
      );

      // ETL of memCashed to Product data type
      isCartProductWithToppings
        ? (payloadProducts = transformCartProductsIntoProductsWithToppings(
            this.state.productsList.products,
            memCashedCartProd
          ))
        : (payloadProducts = transformCartProductsIntoProducts(
            this.state.productsList.products,
            memCashedCartProd
          ));

      // update products STORE with cart product
      this._updateProductsFromSessionStorage(payloadProducts);
      //console.log("RetailerStoreStore - restoreBuyerSelectedProductsFromTemporaryStorage");
    } else {
      //console.log('RETURN');
      return;
    }
  }

  public _updateProductsFromSessionStorage(cachedProducts: Product[]) {
    setTimeout(() => {
      this.setState({
        ...this.state,
        productsList: {
          ...this.state.productsList,
          products: [],
        },
      });
    }, 10);

    setTimeout(() => {
      this.setState({
        ...this.state,
        productsList: {
          ...this.state.productsList,
          products: cachedProducts,
        },
      });
    }, 10);
    console.log('Finished updateProductsFromSessionStorage');
  }

  public getAirTableData(
    retailer_id: string,
    airTableBase: string,
    base: string,
    api_key: string
  ) {
    let json: string;
    this.endPoint
      .getAirTableData(
        retailer_id,
        airTableBase,
        base,
        api_key,
        this.storeRequestUpdater
      )
      .subscribe((result) => {
        console.log('getAirTableData', result);
        //
        // return result;
      })
      .unsubscribe();

    // airtable.manuallyRetrievedAritableData('ff');
  }
}
