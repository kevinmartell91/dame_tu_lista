import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from "../../../../core/retailer/types/retailer";
import { updateBuyerNavagation } from "../../helpers/buyerNavegation.helper";
import { RetailerStoreStore } from '../../services/retailer.store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnDestroy{


  // public retailer: Retailer = new Retailer().deserialize(this.DATA); 
  public retailer: Retailer;
  public loading: boolean;
  
  cartProducts: CartProduct[];
  productsList: Product[];
  filteredProductsList$: Observable<Product[]>;
  filteredProductListLength: number;
  cartProductsQuantity: number;
  subscription: Subscription;


  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;

  constructor( 
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    public retailerStoreStore: RetailerStoreStore,
    private cartStore: CartStore
  ){
    this.init();

    // this.retailerStoreStore.state.retailer.store.name
    // this.retailerStoreStore.retailer$.subscribe(
      // x => {
    //     console.log("StoreComponent subscribe => ",x);
    //     this.retailer = x;
    //     this.productsList = x.store.productsList;
        // this.loading = this.retailerStoreStore.state.request.getRetailer.inProgress;
        // console.log("StoreComponent =>", this.loading);
        
      // }
    // )
  }
 
  init(): void {

    this.subscription = this.cartStore.shoppingCart$.subscribe(
      x => {
        this.cartProducts = x.products;
        this.cartProductsQuantity = x.products.length;
      }
    )

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.storeView
    );

    this.filteredProductsList$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  viewBuyerCart(): void {
    this.router.navigate(['/carrito-personal']);
  }

  goBackToBuyerAccount(): void {
    // this.location.back();
    this.router.navigate(['/cuenta-comprador']);
  }

  goToRetailerCategoryView(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.categoryView
    );

    this.router.navigate(['/tienda-vendedor',
      this.retailerStoreStore.state.retailer._id,
      'categoria']);
  }

  private _filter(value: string): Product[] {
    const filterValue = this._normalizeValue(value);
    let res = this.retailerStoreStore.state.productsList.products.filter(prod => this._normalizeValue(prod.categoryName).includes(filterValue));
    // console.log("_filter",res);
    this.filteredProductListLength = res.length;
    return res;
  }

  private _normalizeValue(value: string): string {
    // console.log("_normalizeValue", value);
    return value.toLowerCase().replace(/\s/g, '');
  }
}
