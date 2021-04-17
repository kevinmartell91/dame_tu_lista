import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, tap } from 'rxjs/operators';
import * as endpointHelpers from 'src/app/shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from 'src/app/shared/types/store-request-state-updater';
import { RetailerStoreState } from '../services/retailer.store.state';
import { Retailer } from '../types/retailer';
import { RetailerEndPoint } from './retailer.endpoint';

@Injectable({ providedIn: 'root' })
export class RetailerStore extends Store<RetailerStoreState> {
  retailer$: Observable<Retailer>;
  private storeRequestStateUpdater: StoreRequestStateUpdater;

  constructor(private endPoint: RetailerEndPoint) {
    super(new RetailerStoreState());

    this.retailer$ = this.state$.pipe(map((state) => state.retailer));
    this.storeRequestStateUpdater = endpointHelpers.getStoreRequestStateUpdater(
      this
    );
  }

  setNewRetailerState(retailer: Retailer): void {
    this.setState({
      ...this.state,
      retailer: retailer,
    });
  }

  registerNewRetailer(newBuyer: Retailer): Observable<any> {
    return this.endPoint
      .postRetailer(this.storeRequestStateUpdater, newBuyer)
      .pipe(tap((retailer: any) => {}));
  }

  getRetailerById(retailer_id: string) {
    return this.endPoint
      .getRetailerById(retailer_id, this.storeRequestStateUpdater)
      .pipe(
        map((data: any) => {
          this.setState({
            ...this.state,
            retailer: new Retailer().deserialize(data.data),
          });
        })
      )
      .subscribe();
  }

  updateRetailerStoreInfo(retailer_id: string, data: any) {
    return this.endPoint
      .putRetailerStoreInfo(retailer_id, data, this.storeRequestStateUpdater)
      .pipe(
        map((data: any) => {
          if (data.success) {
            // console.log("putRetailerStoreInfo", data);
            this.setState({
              ...this.state,
              retailer: new Retailer().deserialize(data.data),
            });
          }
          return data;
        })
      );
  }

  updateRetailerStoreProductList(retaile_id: string, data: any) {
    return this.endPoint
      .putRetailerStoreProductList(
        retaile_id,
        data,
        this.storeRequestStateUpdater
      )
      .pipe(
        map((data: any) => {
          if (data.success) {
            this.setState({
              ...this.state,
              retailer: new Retailer().deserialize(data.data),
            });
          }
          return data;
        })
      );
  }
}
