import { Component, OnInit } from '@angular/core';
import { AuthenticationStore  } from "../../core/login/services/authentication.store";
import { LoginUser } from 'src/app/core/login/types/user';
import { Router } from '@angular/router';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerAccountStore } from './services/buyer-account.store';
import { FavoriteReatailers } from 'src/app/core/retailer/types/favorite-retailers';

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit {

  loginUser: LoginUser;
  favoriteRetailers:  FavoriteReatailers[] = [];

  constructor(
    private router: Router ,
    private authenticationStore: AuthenticationStore,
    private buyerNavagationStore: BuyerNavegationStore,
    public buyerAccountStore: BuyerAccountStore) { 

    // this.authenticationStore.loginUser$.subscribe(
    //   x => { this.loginUser = x; console.log("UPDATED - authenticationStore") }
    // );

    this.authenticationStore.loginUser$.subscribe(
      (data : any) => { 
        this.loginUser = data;
        console.log("subscribe - authenticationStore - login.data.entity",data.entity);
        let favorites = data.entity.myFavoriteRetailers;
        favorites.forEach(element => {
          this.favoriteRetailers.push(new FavoriteReatailers().deserialize(element));
        });
      }
    );

    this.buyerAccountStore.buyerAccount$.subscribe(
      (data : any) => { 
        if(data != null) {
          console.log("subscribe - buyerAccountStore => data.entity",data);
          this.favoriteRetailers = [];
          let favorites = data.myFavoriteRetailers;
          favorites.forEach(element => {
            this.favoriteRetailers.push(new FavoriteReatailers().deserialize(element));
          });  
        }
      }
    )

  }

  ngOnInit(): void {
  }

  goToRetailerStoreView(retailer_id: string): void {
    this.updateBuyerNavagationToStoreView();
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
    let buyer_id = ((this.loginUser.entity) as any )._id;
    // let buyer_id = "5edeecfc09ff9d6770b10344";
    let retailer_email = "irene03@gmail.com";
    console.log("addFavoriteRetailer");
    this.buyerAccountStore.addFavoriteReatailer(buyer_id, retailer_email);
   
  }
  
  updateBuyerNavagationToStoreView():void {
    let buyerNavegationUpdate = this.buyerNavagationStore.state.buyerNavegation;
    buyerNavegationUpdate.typeView = BUYER_CONFIG.navegation.storeView;
    this.buyerNavagationStore.setNewState(buyerNavegationUpdate)
  }

}
