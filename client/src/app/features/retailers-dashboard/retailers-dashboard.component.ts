import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { RetailerStore } from 'src/app/core/retailer/services/retailer.store';
import { getStoreNameDashFormat } from './helpers/profile-settings.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-retailers-dashboard',
  templateUrl: './retailers-dashboard.component.html',
  styleUrls: ['./retailers-dashboard.component.sass']
})
export class RetailersDashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  retailerStoreName: string = "";
  subscriptionRetailerStore: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    public authenticationStore: AuthenticationStore,
    private router: Router,
    private retailerStore: RetailerStore
  ) {


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
    const retailer_id = loginUserLocalStorage.entity._id;
    this.retailerStoreName = loginUserLocalStorage.entity.store.name;

    console.log("HERE retailerStoreName _ ID", this.retailerStoreName);
    // get retailer for all it subscribers
    this.retailerStore.getRetailerById(retailer_id);


    this.subscriptionRetailerStore =  this.retailerStore.retailer$.subscribe(
      y => {
        if(y != null){
          this.retailerStoreName = y.store.name;
          localStorage.setItem("retailer_store_name", this.retailerStoreName);
        } 
      }
    )

  
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptionRetailerStore.unsubscribe();
  }

  goToRetailerStore(){
    console.log("STORE NAME", this.retailerStoreName);
    const storeNameDashFormat = getStoreNameDashFormat(this.retailerStoreName);
    this.router.navigate([storeNameDashFormat]);
  }

  logout(){
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }

}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */