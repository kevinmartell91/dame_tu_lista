import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from './core/buyer/buyer.config';
import { BuyerNavegationStore } from './core/buyer/services/buyer-navegation.store';
import { CartStore } from './core/cart/services/cart.store';
import { CartProduct } from './core/cart/types/cart-product';
import { LOGIN_CONFIG } from './core/login/login.config';
import { AuthenticationStore } from './core/login/services/authentication.store';
import { LoginUser } from './core/login/types/user';
import { Retailer } from './core/retailer/types/retailer';
import {
  TemporaryStorageFacet,
  TemporaryStorageService,
} from './core/session-storage/services/temporary-storage.service';
import { RetailerStoreStore } from './features/retailer-stores/services/retailer.store';
import { BuyerNavegation } from './core/buyer/types/buyer-navegation';
import { updateBuyerNavagation } from './features/retailer-stores/helpers/buyerNavegation.helper';
import { every } from 'rxjs/operators';
import {
  calculateCartTotalPrice,
  calculateCartTotalPriceWithToppings,
  getTotalProductsOnShoppingCart,
} from './core/cart/helpers/cart-helper';
import { containtToppings } from './shared/helpers/cart-product.helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Dame tu lista';
  loginUser: LoginUser = null;
  cartProductsQuantity: number = 0;
  cartProducts: CartProduct[];

  authenticationSubcription: Subscription;
  cartStoreSubcription: Subscription;
  totalCartPrice: number = 0;
  totalCartPriceStr: string;
  isVisible: boolean;

  favoriteRetailerIdSelected: Retailer;
  favoriteRetailerSubcription: Subscription;

  buyerNavegationSubscription: Subscription;
  buyerNavegation: BuyerNavegation;

  retailerStoreName: string;

  temporaryStorage: TemporaryStorageFacet;

  loginType: {
    buyer;
    retailer;
  };

  navegation: {
    accountView;
    storeView;
    categoryView;
    varietyView;
    maturityView;
    cartView;
    thanksView;
    placedOrderView;
    freeBillView;
    homepageView;
  };

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    public buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    public cartStore: CartStore,
    private eleRef: ElementRef,
    private temporaryStorageService: TemporaryStorageService,
    private retailerStoreStore: RetailerStoreStore,
    private readonly activatedRoute: ActivatedRoute
  ) {
    // let url = "https://api.airtable.com/v0/app4dtPR3GvMixMHE/products?api_key=keyNqSR6NoYacM8nC";
    // let url = "https://api.airtable.com/v0/app4dtPR3GvMixMHE/products";
    // let airTableBase = 'app4dtPR3GvMixMHE';
    // let base = 'products';
    // let api_key = 'keyNqSR6NoYacM8nC';
    // this.retailerStoreStore.getAirTableData(
    //   'retailer_id',
    //   airTableBase,
    //   base,
    //   api_key
    // );

    this.temporaryStorage = this.temporaryStorageService.forKey(
      'cart_product_list'
    );

    this.initializeNavegationValues();

    this.buyerNavegationSubscription = this.buyerNavegationStore.buyerNavegation$.subscribe(
      (y) => {
        this.buyerNavegation = y;
      }
    );

    // this.initializeLoginTypeValues();
    this.authenticationSubcription = this.authenticationStore.loginUser$.subscribe(
      (x) => {
        if (x != null) {
          this.loginUser = x;
          console.log('AUTHENTICATION', this.loginUser);
          // if there LoginUser then render ACCOUNT_VIEW as a retailer admin
          // if not, it means a buyer is using the dametulista
          // so the view remains as STORE_VIEW (set on the constructor)

          //       this.initializeNavegationValues();
          //       this.initializeLoginTypeValues();
        }
      }
    );
  }

  onBodyClick = (event) => {
    // console.log("added onBodyClick - APP", event.target, this.eleRef);
  };

  ngOnInit(): void {
    document.body.addEventListener('click', this.onBodyClick);

    //first we restore data form storage then subscribe works
    this.restoreFromTemporaryStorage();

    this.retailerStoreName = localStorage.getItem('retailer_store_name');

    this.cartStoreSubcription = this.cartStore.shoppingCart$.subscribe((y) => {
      if (y !== undefined) {
        this.cartProducts = y.products;
        this.cartProductsQuantity = getTotalProductsOnShoppingCart(y.products);
        // this.cartProductsQuantity = y.products.length;
        if (this.cartProducts.length > 0) {
          this.totalCartPrice = containtToppings(
            this.cartProducts[0].categoryName
          )
            ? calculateCartTotalPriceWithToppings(this.cartProducts)
            : calculateCartTotalPrice(this.cartProducts);
        }
        this.totalCartPriceStr = this.totalCartPrice.toFixed(2);
        this.isVisible = this.totalCartPrice > 0;

        // this.handleSaveTemporaryStorage(y.products);

        this.saveToTemporaryStorage(y.products);
      }
    });

    this.favoriteRetailerSubcription = this.cartStore.favoriteRetailerSelected$.subscribe(
      (z) => {
        this.favoriteRetailerIdSelected = z;
        // this.handleSaveTemporaryStorage();
      }
    );
  }

  ngOnDestroy(): void {
    this.authenticationSubcription.unsubscribe();
    this.cartStoreSubcription.unsubscribe();
    this.favoriteRetailerSubcription.unsubscribe();
    this.buyerNavegationSubscription.unsubscribe();

    document.body.removeEventListener('click', this.onBodyClick);
  }

  initializeNavegationValues(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.homepageView,
      'navegation.homepageView'
    );

    this.navegation = BUYER_CONFIG.navegation;
  }

  initializeLoginTypeValues(): void {
    this.loginType = LOGIN_CONFIG.loginType;
  }

  viewBuyerCart(): void {
    // console.log("viewBuyerCart");
    // this.router.navigate(['/carrito-personal']);
    // TODO get retaialer store name from URL params
    // this.router.navigate([':retailer_store_name/carrito-personal']);
    this.router.navigate([`${this.retailerStoreName}/carrito-personal`]);
  }

  viewBuyerDetails(): void {}

  logout() {
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }

  goToStoreRetailer(): void {
    this.router.navigate([localStorage.getItem('retailer_store_name')]);
  }

  goBackLocation(): void {
    this.location.back();
  }

  public async restoreFromTemporaryStorage(): Promise<void> {
    let cachedData = await this.temporaryStorage.get<any>();

    let cartProducts: CartProduct[] = [];

    // console.log("CacheData:", cachedData);
    if (cachedData) {
      cachedData.forEach((elem) => {
        cartProducts.push(new CartProduct().deserialize(elem));
      });
      // update cartStore with date from temporary storage
      console.log('restoreFromTemporaryStorage');
      this.cartStore.setCart(cartProducts);

      // retrieve favoriteRetailer
      // this.favoriteRetailerIdSelected = cachedData.favoriteRetailer;
      // this.cartStore.setFavoriteRetalerSelected(this.favoriteRetailerIdSelected);
    }
  }

  public saveToTemporaryStorage(cartProduct: CartProduct[]): void {
    this.temporaryStorage.set(cartProduct);
  }

  get nameCapitalized() {
    let word = this.loginUser.name;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  onClickedButton(clicked: boolean) {
    if (clicked)
      this.router.navigate([`${this.retailerStoreName}/carrito-personal`]);
  }
}
