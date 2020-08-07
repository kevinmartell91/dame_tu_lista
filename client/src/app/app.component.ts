import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from "./core/buyer/buyer.config";
import { BuyerNavegationStore } from "./core/buyer/services/buyer-navegation.store";
import { CartStore } from './core/cart/services/cart.store';
import { CartProduct } from './core/cart/types/cart-product';
import { LOGIN_CONFIG } from "./core/login/login.config";
import { AuthenticationStore } from "./core/login/services/authentication.store";
import { LoginUser } from "./core/login/types/user";
import { Retailer } from './core/retailer/types/retailer';
import { TemporaryStorageFacet, TemporaryStorageService } from './core/session-storage/services/temporary-storage.service';
import { RetailerStoreStore } from './features/retailer-stores/services/retailer.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Dame tu lista';
  loginUser: LoginUser;
  cartProductsQuantity: number = 0;
  cartProducts: CartProduct[];

  authenticationSubcription: Subscription;
  cartStoreSubcription: Subscription;
  
  favoriteRetailerIdSelected: Retailer;
  favoriteRetailerSubcription: Subscription;


  temporaryStorage: TemporaryStorageFacet; 

  loginType: {
    buyer,
    retailer
  }; 


  navegation: {
    accountView,
    storeView,
    categoryView,
    varietyView,
    maturityView
    cartView,
    thanksView
  };

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    public buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    public cartStore: CartStore,
    private temporaryStorageService: TemporaryStorageService,
  ) {

    // console.log("retailerStoreStore Started..");
    // this.retailerStoreStore.getAirTabeDATA();
    

    this.temporaryStorage = this.temporaryStorageService.forKey("cart_products_list");
    // console.log("temporaryStorage",this.temporaryStorage);

    this.authenticationSubcription = this.authenticationStore.loginUser$.subscribe( 
      x => { 
        this.loginUser = x;
        // console.log("AppComponent - loginUser$", this.loginUser); 

        if( this.loginUser != null){
          this.initializeNavegationValues();
          this.initializeLoginTypeValues();
        }
      }
    );
  
  }

  ngOnInit(): void {

    // console.log("AppComponent - ngOnInit() 0709");
    //first we restore data form storage then subscribe works
    this.restoreFromTemporaryStorage();


    this.cartStoreSubcription = this.cartStore.shoppingCart$.subscribe(
      y => {
        this.cartProducts = y.products;
        this.cartProductsQuantity = y.products.length;
        // console.log("cartStoreSubcription => shoppingCart.products",y.products);
       this.handleSaveTemporaryStorage();
        
      }
    )

    this.favoriteRetailerSubcription = this.cartStore.favoriteRetailerSelected$.subscribe(
      z => {
        this.favoriteRetailerIdSelected = z;
        this.handleSaveTemporaryStorage();
        // console.log("this.favoriteRetailerIdSelected - 0709",this.favoriteRetailerIdSelected);
      }
    )
  }


  ngOnDestroy():void {
    this.authenticationSubcription.unsubscribe();
    this.cartStoreSubcription.unsubscribe();
    this.favoriteRetailerSubcription.unsubscribe();

    this.temporaryStorage.remove();
  }
  
  initializeNavegationValues(): void {
    this.navegation = BUYER_CONFIG.navegation; 
  }

  initializeLoginTypeValues(): void {
    this.loginType = LOGIN_CONFIG.loginType; 
  }

  viewBuyerCart(): void {
    this.router.navigate(['/carrito-personal']);
  }

  viewBuyerDetails():void {
    // this.router.navigate(['/buyer-details']);
  }
  
  logout() {
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }
  
  goBackLocation(): void {
    this.location.back();
  }

  public async restoreFromTemporaryStorage(): Promise<void> {

      let cachedData = await this.temporaryStorage.get<any>();
  
      let cartProducts: CartProduct[] = [];
  
      if ( cachedData ) { 
  
        cachedData.cartProducts.forEach(elem => {
          cartProducts.push(new CartProduct().deserialize(elem));
        });
      }   
      
      // update cartStore with date from temporary storage
      this.cartStore.setCart(cartProducts);

      // retrieve favoriteRetailer
      this.favoriteRetailerIdSelected = cachedData.favoriteRetailer;
      this.cartStore.setFavoriteRetalerSelected(this.favoriteRetailerIdSelected);
      

     
   
  }

  public async restoreFromTemporaryStorageDEMO() : Promise<void> {

		var cachedFormData = await this.temporaryStorage.get<any>();

		if ( cachedFormData ) {

      // console.log("cachedData", cachedFormData);
      Object.assign( this.cartProducts, cachedFormData );
      

		}

	}

  handleSaveTemporaryStorage():void {
   
    let dataToStore;

    if(this.cartProducts.length !== 0 && this.favoriteRetailerIdSelected != null) { 
      dataToStore = {
        cartProducts: this.cartProducts,
        favoriteRetailer: this.favoriteRetailerIdSelected
      }
      // console.log("saveToTemporaryStorage 0709");
      this.saveToTemporaryStorage(dataToStore);
    }  
    if (this.cartProducts.length == 0) {
      // clear CartProducts from temporary storage
      //and keep favorite retailer
      
      // console.log("remove CartProducts from temporary storage");
      
      dataToStore = {
        cartProducts: [],
        favoriteRetailer: this.favoriteRetailerIdSelected
      }
      // this.temporaryStorage.remove();
      this.saveToTemporaryStorage(dataToStore);

    }

  }
  
  
  public saveToTemporaryStorage(
    data: any
  ): void {
    this.temporaryStorage.set(data);
  }
  

  get nameCapitalized() {
    let word = this.loginUser.name;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
