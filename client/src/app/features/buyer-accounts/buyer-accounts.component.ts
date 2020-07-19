import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationStore  } from "../../core/login/services/authentication.store";
import { LoginUser } from 'src/app/core/login/types/user';
import { Router } from '@angular/router';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerAccountStore } from './services/buyer-account.store';
import { FavoriteReatailers } from 'src/app/core/retailer/types/favorite-retailers';
import { deserialize } from './helpers/buyer-accounts.helper';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { Subscription } from 'rxjs';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { MatDialog } from '@angular/material/dialog';
import { AddRetailerModalComponent } from "./components/add-retailer-modal/add-retailer-modal.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit, OnDestroy{

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);    

   

  }
  
  /**
   * when reloadig the web page, this method
   * retrieve updated data from DB
   * then pupulate using a subs object is created
   * whose role is to store subscriptions to different
   *  observables stores. This is an optimization so 
   * that only one subscription per store is created 
   * in a template by storing a conditional result 
   * in a variable.
   */
  ngOnInit(): void {
   


  }

    
  logout():void {
    this.authenticationStore.logout();
    this.router.navigateByUrl('login');
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }


}