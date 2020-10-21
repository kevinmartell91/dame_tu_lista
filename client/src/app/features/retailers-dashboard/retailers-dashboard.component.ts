import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { RetailerStore } from 'src/app/core/retailer/services/retailer.store';

@Component({
  selector: 'app-retailers-dashboard',
  templateUrl: './retailers-dashboard.component.html',
  styleUrls: ['./retailers-dashboard.component.sass']
})
export class RetailersDashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    public authenticationStore: AuthenticationStore,
    private router: Router,
    private retailerStore: RetailerStore
  ) {

    console.log("RetailersDashboardComponent");

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
    const retailer_id = loginUserLocalStorage.entity._id;

    console.log("HERE REtailer _ ID", retailer_id);
    // get retailer for all it subscribers
    this.retailerStore.getRetailerById(retailer_id);
  
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }

}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */