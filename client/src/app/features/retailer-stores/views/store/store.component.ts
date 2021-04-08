import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { map, startWith, timeout } from 'rxjs/operators';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from '../../../../core/retailer/types/retailer';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { RetailerStoreStore } from '../../services/retailer.store';
import { LoginUser } from 'src/app/core/login/types/user';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { WindowScrollService } from 'src/app/features/retailer-stores/services/window-scroll.service';
import { removeAccents } from '../../helpers/deaccent.helper';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass'],
})
export class StoreComponent implements OnDestroy {
  // public retailer: Retailer = new Retailer().deserialize(this.DATA);
  public retailer: Retailer;
  public loading: boolean;

  cartProducts: CartProduct[];
  productsList: Product[];
  filteredProductsList$: Observable<Product[]>;
  filteredProductListLength: number;
  cartProductsQuantity: number;
  subscription: Subscription;

  retailerStoreName: string;
  subscriptionStoreName: Subscription;
  subscriptionRetailerStore: Subscription;
  subscriptionStoreState: Subscription;

  stateProductsList: Product[] = null;
  stateRetailer: Retailer = null;

  control = new FormControl();
  isSearchBoxOpen: boolean = true;
  currentUser: LoginUser = null;

  allProductTypes: string[] = ['🍏', '🐄', '🐑', '🐓', '🐷', '🐟'];

  timerId: any;

  constructor(
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    public retailerStoreStore: RetailerStoreStore,
    private cartStore: CartStore,
    private readonly activedRoute: ActivatedRoute
  ) {
    this.init();

    const currentUserStorage = localStorage.getItem(
      LOGIN_CONFIG.loginUserStorage
    );

    if (currentUserStorage) {
      this.currentUser = new LoginUser().deserialize(currentUserStorage);
    }

    this.subscriptionStoreName = this.activedRoute.paramMap.subscribe(
      (params) => {
        this.retailerStoreName = params.get('retailer_store_name');
        // console.log("KEVIN -StoreComponent retailerStoreName", this.retailerStoreName);
        localStorage.setItem('retailer_store_name', this.retailerStoreName);

        // if (this.stateProductsList == null ) {
        //   this.stateProductsList = JSON.parse(sessionStorage.temp_session_storage).product_list;
        // }
      }
    );

    this.subscriptionStoreState = this.retailerStoreStore.state$.subscribe(
      (state) => {
        // this.stateProductsList = state.productsList.products;
        this.stateRetailer = state.retailer;

        // console.log("stateProductsList Kevin", this.stateProductsList);
        if (this.stateRetailer) {
          localStorage.setItem('retailer_id', this.stateRetailer._id);
          localStorage.setItem(
            'retailer_phone_number',
            this.stateRetailer.phoneNumber
          );
        }

        // console.log("subscriptionStoreState HERE KEVIN", this.stateRetailer);
      }
    );
  }

  init(): void {
    // console.log("INIT -  StoreComponent: ");

    this.subscriptionRetailerStore = this.retailerStoreStore.products$.subscribe(
      (products) => {
        // console.log("subscriptionRetailerStore- products KEVIN", products);
        this.productsList = products;
        // console.log("FORM SESSION STORAGE", this.productsList);
        // console.log(" this.state.productsList.products KEVIN : ", this.retailerStoreStore.state.productsList.products);
      }
    );

    this.subscription = this.cartStore.shoppingCart$.subscribe((x) => {
      this.cartProductsQuantity = x.products.length;
    });

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.storeView,
      'navegation.storeView'
    );

    this.filteredProductsList$ = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // this.filteredProductsList$ = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {

    //     setTimeout(()=>{
    //       this._filter(value)
    //     },1000);
    //   })
    // );
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
    this.subscription.unsubscribe();
    this.subscriptionStoreState.unsubscribe();
    this.subscriptionStoreName.unsubscribe();
    this.subscriptionRetailerStore.unsubscribe();
  }

  viewBuyerCart(): void {
    // this.router.navigate(['/carrito-personal']);
    this.router.navigate([`${this.retailerStoreName}/carrito-personal`]);
  }

  goBackToRetailerAccount(): void {
    this.router.navigate(['vendedor-dashboard/cuenta']);
  }

  goToRetailerCategoryView(): void {
    // updateBuyerNavagation(
    //   this.buyerNavegationStore,
    //   BUYER_CONFIG.navegation.categoryView
    // );

    // this.router.navigate(['/tienda-vendedor',
    //   this.retailerStoreStore.state.retailer._id,
    //   'categoria']);
    this.router.navigate([
      this.retailerStoreStore.state.retailer.store.nameUrl,
      'categoria',
    ]);
  }

  private _filter(value: string): Product[] {
    const filterValue = this._normalizeValue(value);
    this.retailerStoreStore.updateProductsFromSessionStorage();
    let res = this.retailerStoreStore.state.productsList.products.filter(
      (prod) =>
        this._deaccent(
          prod.categoryName + prod.varietyName + prod.maturityName
        ).includes(this._deaccent(filterValue))
    );
    this.filteredProductListLength = res.length;
    return res;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _deaccent(value: string): string {
    let deacceted = removeAccents(value);
    deacceted = this._normalizeValue(deacceted);
    // console.log(" deacceted :",deacceted);
    return deacceted;
  }
  public deaccentSelectedSearcTerm(product: Product): string {
    // return `${product.categoryName} - ${product.varietyName}`;
    return product.categoryName === 'Comida rápida'
      ? product.maturityName
      : product.varietyName;

    // return `${product.varietyName}`;
  }

  public openSeachBox() {
    this.isSearchBoxOpen = !this.isSearchBoxOpen;
  }
}
