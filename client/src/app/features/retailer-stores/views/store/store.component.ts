import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { getTotalProductsOnShoppingCart } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { LoginUser } from 'src/app/core/login/types/user';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from '../../../../core/retailer/types/retailer';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { removeAccents } from '../../helpers/deaccent.helper';
import { RetailerStoreStore } from '../../services/retailer.store';

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
        localStorage.setItem('retailer_store_name', this.retailerStoreName);
      }
    );

    this.subscriptionStoreState = this.retailerStoreStore.state$.subscribe(
      (state) => {
        this.stateRetailer = state.retailer;

        if (this.stateRetailer) {
          localStorage.setItem('retailer_id', this.stateRetailer._id);
          localStorage.setItem(
            'retailer_phone_number',
            this.stateRetailer.phoneNumber
          );
        }
      }
    );
  }
  init(): void {
    this.subscriptionRetailerStore =
      this.retailerStoreStore.products$.subscribe((products) => {
        this.productsList = products;

        console.log('UPDATED AFTER SET IN STORE KEVIN', this.productsList);
      });

    this.subscription = this.cartStore.shoppingCart$.subscribe((x) => {
      this.cartProductsQuantity = getTotalProductsOnShoppingCart(x.products);
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
  }

  public openSeachBox() {
    this.isSearchBoxOpen = !this.isSearchBoxOpen;
  }
}
