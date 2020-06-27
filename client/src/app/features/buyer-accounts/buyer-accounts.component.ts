import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit {

  loginUser: LoginUser;
  favoriteRetailers:  FavoriteReatailers[] = [];
  buyer_id: string;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    private buyerNavegationStore: BuyerNavegationStore,
    public buyerAccountStore: BuyerAccountStore) { 

    this.authenticationStore.loginUser$.subscribe(
      (data : any) => { 
        this.buyer_id = data.entity._id;
        this.loginUser = data;
        console.log("SUBSCRIBED to BuyerAccountsComponent - authenticationStore -  Listened");
        
      }
    );
      
    // this.buyerAccountStore.buyerAccount$.subscribe(
    //   (data : any) => { 
    //     console.log("SUBSCRIBED to BuyerAccountsComponent - buyerAccountStore - Listened");
    //     if(data != null) {
    //       this.favoriteRetailers = deserialize(data.myFavoriteRetailers);
    //     }
    //   }
    // )

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
    
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView
    );
    this.buyerAccountStore.init(this.buyer_id);
  }

  goToRetailerStoreView(retailer_id: string): void {
    this.router.navigate(['/retailer-store/',retailer_id]);
  }

  viewBuyerCart(): void {
    this.router.navigate(['/buyer-cart']);
  }
  
  viewBuyerDetails():void {
    this.router.navigate(['/buyer-details']);
  }
  
  logout():void {
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }

  addFavoriteRetailer(): void {
    // this.buyerAccountStore.init();
    // let buyer_id = "5edeecfc09ff9d6770b10344";
    let retailer_email = "keyla@gmail.com";
    console.log("addFavoriteRetailer");
    this.buyerAccountStore.addFavoriteReatailer(this.buyer_id, retailer_email);
  }


}