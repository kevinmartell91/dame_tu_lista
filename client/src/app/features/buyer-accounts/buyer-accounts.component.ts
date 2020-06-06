import { Component, OnInit } from '@angular/core';
import { AuthenticationStore  } from "../../core/login/services/authentication.store";
import { LoginUser } from 'src/app/core/login/types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass']
})
export class BuyerAccountsComponent implements OnInit {

  loginUser: LoginUser;

  constructor(
    private authenticationStore: AuthenticationStore,
    private router: Router ) { 

    this.authenticationStore.loginUser$.subscribe(
      x => {
        this.loginUser = x
      }
    );
    console.log("this.authenticationStore.loginUser",this.authenticationStore.loginUser);

  }

  ngOnInit(): void {
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

}
