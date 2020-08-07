import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { LoginUser } from 'src/app/core/login/types/user';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';
import { BuyerAccountStore } from '../../services/buyer-account.store';
import { AddRetailerModalComponent } from '../add-retailer-modal/add-retailer-modal.component';
import { Buyer } from 'src/app/core/buyer/types/buyer';

@Component({
  selector: 'app-favorite-retailers',
  templateUrl: './favorite-retailers.component.html',
  styleUrls: ['./favorite-retailers.component.sass']
})
export class FavoriteRetailersComponent implements OnInit, OnDestroy {

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
        console.log("FavoriteRetailersComponent  => loginUser$", data);

        // wired issue in this subscription (it is not in sync)
        // temp solution via retrieveing buyer_id through localstorage
        // let loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
        this.buyer_id = data.entity._id;
        // console.log("localStorage", this.buyer_id, data.entity._id);
        this.buyerAccountStore.setNewBuyerAccountState(new Buyer().deserialize(data.entity));
        // ====================================================       
        if(this.buyerAccountStore.state.buyerAccount.myFavoriteRetailers.length == 0) {
          this.addStoreAutomatically();
        }
      
        
      }
    );
  }

  ngOnInit(): void {

     
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView
    );

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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

  addStoreAutomatically():void {
    const retailer_email = "keylahuincho@gmail.com";
    this.buyerAccountStore.addFavoriteReatailer(this.buyer_id, retailer_email);

  }

}
