import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit, OnDestroy{

  loginUser: LoginUser;
  favoriteRetailers:  FavoriteReatailers[] = [];
  buyer_id: string;
  subscription: Subscription;

  dialogRef: any;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    private buyerNavegationStore: BuyerNavegationStore,
    public buyerAccountStore: BuyerAccountStore,
    private cartStore: CartStore,
    private matDialog: MatDialog) { 

        

    this.subscription = this.authenticationStore.loginUser$.subscribe(
      (data : any) => { 
        this.loginUser = data;
        console.log("authenticationStore  => loginUser$", data);

    // wired issue in this subscription (it is not in sync)
    // temp solution via retrieveing buyer_id through localstorage
    let loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
    this.buyer_id = loginUserLocalStorage.entity._id;
    // console.log("localStorage", this.buyer_id, data.entity._id);
    this.buyerAccountStore.init(this.buyer_id);
    // ====================================================       
      
        
      }
    );

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



  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  goToRetailerStoreView(retailer: Retailer): void {

    // In order to keep the selected favorite retailer _id,
    // we store it in cartStore. So its subscribers will
    // about which one was selecetd from other components
    // such as this one and cart component to generate a
    // new order which requieres favorite reatiler _id.
    this.cartStore.setFavoriteRetalerSelected(retailer);

    this.router.navigate(['/tienda-vendedor/',retailer._id]);
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

    this.dialogRef = this.matDialog.open(AddRetailerModalComponent, {
      width: '320px'
    });
    
    this.dialogRef.afterClosed().subscribe( result => {

      if(result != undefined){
        
        console.log("addFavoriteRetailer", result);
        let retailer_email = result.retailer_email;
        this.buyerAccountStore.addFavoriteReatailer(this.buyer_id, retailer_email);
      }
      
    });

  }


}