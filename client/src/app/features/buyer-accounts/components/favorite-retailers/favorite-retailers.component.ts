import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerAccountStore } from '../../services/buyer-account.store';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginUser } from 'src/app/core/login/types/user';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { AddRetailerModalComponent } from '../add-retailer-modal/add-retailer-modal.component';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';

@Component({
  selector: 'app-favorite-retailers',
  templateUrl: './favorite-retailers.component.html',
  styleUrls: ['./favorite-retailers.component.sass']
})
export class FavoriteRetailersComponent implements OnInit {

  loginUser: LoginUser;
  buyer_id: string;
  subscription: Subscription;

  dialogRef: any;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    private buyerNavegationStore: BuyerNavegationStore,
    public buyerAccountStore: BuyerAccountStore,
    private cartStore: CartStore,
    private snackBarService: MatSnackBar,
    private matDialog: MatDialog
  ) { 

    this.subscription = this.authenticationStore.loginUser$.subscribe(
      (data : any) => { 
        this.loginUser = data;
        // console.log("authenticationStore  => loginUser$", data);

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

  ngOnInit(): void {

     
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView
    );

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


  
  viewBuyerDetails():void {
    this.router.navigate(['/buyer-details']);
  }

  addFavoriteRetailer(): void {

    this.dialogRef = this.matDialog.open(AddRetailerModalComponent, {
      width: '320px'
    });
    
    this.dialogRef.afterClosed().subscribe( result => {

      let message = "Ya agregaste al vendedor."

      if(result != undefined){
        let email = result.retailer_email;

        if(this.isNewFavoriteRetailer(email)){
          
          message = "Vendedor agregado."
          // console.log("addFavoriteRetailer", result);
          let retailer_email = email;
          this.buyerAccountStore.addFavoriteReatailer(this.buyer_id, retailer_email);
       
        } 
        this.openSnackBar( message,"Cerrar");
      }
      
    });

  }

  isNewFavoriteRetailer(email: string): boolean {
    let favRet =  this.buyerAccountStore.state.buyerAccount.myFavoriteRetailers;
    // console.log("myFavoriteRetailers", favRet);
    return  !Boolean(favRet.find( function (fr) { return fr.email == email}));
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 2000,
    });
  }

}
