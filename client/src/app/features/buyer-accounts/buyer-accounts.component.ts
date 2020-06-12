import { Component, OnInit } from '@angular/core';
import { AuthenticationStore  } from "../../core/login/services/authentication.store";
import { LoginUser } from 'src/app/core/login/types/user';
import { Router } from '@angular/router';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { kStringMaxLength } from 'buffer';

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit {

  loginUser: LoginUser;

  constructor(
    private router: Router ,
    private authenticationStore: AuthenticationStore,
    private buyerNavagationStore: BuyerNavegationStore) { 

    this.authenticationStore.loginUser$.subscribe(
      x => { this.loginUser = x }
    );

  }

  ngOnInit(): void {
  }

  goToRetailerStoreView(_id: string): void {
    this.updateBuyerNavagationToStoreView();
    this.router.navigate(['/retailer-store']);
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
  
  updateBuyerNavagationToStoreView():void {
    let buyerNavegationUpdate = this.buyerNavagationStore.state.buyerNavegation;
    buyerNavegationUpdate.typeView = BUYER_CONFIG.navegation.storeView;
    this.buyerNavagationStore.setNewState(buyerNavegationUpdate)
  }
}
