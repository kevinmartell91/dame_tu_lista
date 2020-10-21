import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { BuyerNavegation } from './core/buyer/types/buyer-navegation';
import { updateBuyerNavagation } from './features/retailer-stores/helpers/buyerNavegation.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Dame tu lista';
  loginUser: LoginUser = null;
  cartProductsQuantity: number = 0;
  cartProducts: CartProduct[];

  authenticationSubcription: Subscription;
  cartStoreSubcription: Subscription;
  
  favoriteRetailerIdSelected: Retailer;
  favoriteRetailerSubcription: Subscription;

  buyerNavegationSubscription: Subscription;
  buyerNavegation: BuyerNavegation;

  retailerStoreName: string;

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
    private readonly activatedRoute: ActivatedRoute
  ) {

    // this.retailerStoreStore.getAirTabeDATA();

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.storeView
    );

    console.log("AppComponent retailerStoreName",this.retailerStoreName);


    this.temporaryStorage = this.temporaryStorageService.forKey("cart_products_list");

    this.buyerNavegationSubscription = this.buyerNavegationStore.buyerNavegation$.subscribe(
      y =>  {
        this.buyerNavegation = y;
        console.log("buyerNavegationSubscription", this.buyerNavegation);
      }
    )

    this.initializeNavegationValues();
    // this.initializeLoginTypeValues();
    // this.authenticationSubcription = this.authenticationStore.loginUser$.subscribe( 
    //   x => { 
    //     this.loginUser = x;
    //     if( this.loginUser != null){
    //       this.initializeNavegationValues();
    //       this.initializeLoginTypeValues();
    //     }
    //   }
    // );
  
  }

  ngOnInit(): void {

    //first we restore data form storage then subscribe works
    this.restoreFromTemporaryStorage();

    this.retailerStoreName = localStorage.getItem("retailer_store_name");

    this.cartStoreSubcription = this.cartStore.shoppingCart$.subscribe(
      y => {
        this.cartProducts = y.products;
        this.cartProductsQuantity = y.products.length;
       this.handleSaveTemporaryStorage();
        
      }
    )

    this.favoriteRetailerSubcription = this.cartStore.favoriteRetailerSelected$.subscribe(
      z => {
        this.favoriteRetailerIdSelected = z;
        this.handleSaveTemporaryStorage();
      }
    )
  }


  ngOnDestroy():void {
    this.authenticationSubcription.unsubscribe();
    this.cartStoreSubcription.unsubscribe();
    this.favoriteRetailerSubcription.unsubscribe();
    this.buyerNavegationSubscription.unsubscribe();
    this.temporaryStorage.remove();
  }
  
  initializeNavegationValues(): void {
    this.navegation = BUYER_CONFIG.navegation; 
  }

  initializeLoginTypeValues(): void {
    this.loginType = LOGIN_CONFIG.loginType; 
  }

  viewBuyerCart(): void {
    console.log("viewBuyerCart");
    // this.router.navigate(['/carrito-personal']);
    // TODO get retaialer store name from URL params
    // this.router.navigate([':retailer_store_name/carrito-personal']);
    this.router.navigate([`${this.retailerStoreName}/carrito-personal`]);
  }

  viewBuyerDetails():void {
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
        // update cartStore with date from temporary storage
        this.cartStore.setCart(cartProducts);
  
        // retrieve favoriteRetailer
        this.favoriteRetailerIdSelected = cachedData.favoriteRetailer;
        this.cartStore.setFavoriteRetalerSelected(this.favoriteRetailerIdSelected);
        
      }   
   
  }

  public async restoreFromTemporaryStorageDEMO() : Promise<void> {

		var cachedFormData = await this.temporaryStorage.get<any>();

		if ( cachedFormData ) {

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
      this.saveToTemporaryStorage(dataToStore);
    }  
    if (this.cartProducts.length == 0) {
      // clear CartProducts from temporary storage
      // and keep favorite retailer
      
      dataToStore = {
        cartProducts: [],
        favoriteRetailer: this.favoriteRetailerIdSelected
      }
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
