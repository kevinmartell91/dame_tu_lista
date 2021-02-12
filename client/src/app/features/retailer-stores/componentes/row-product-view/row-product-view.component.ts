import { Component, Input, OnInit,OnChanges, SimpleChange } from '@angular/core';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { RetailerStoreStore } from '../../services/retailer.store';
import { MaturityProductsByVariety } from '../../types/maturityProductsByVariety';
import { getMaturityProductsByVariety } from '../../helpers/product.helper';
import { Observable, observable } from 'rxjs';


@Component({
  selector: 'app-row-product-view',
  templateUrl: './row-product-view.component.html',
  styleUrls: ['./row-product-view.component.sass']
})
export class RowProductViewComponent implements OnInit {


  @Input() storeProducts: Product[];
  public maturityProductsByVariety$: Observable<MaturityProductsByVariety[]>;
  // public maturityProductsByVariety$: MaturityProductsByVariety[];

  public rowView: string;
  public question: string;
  public productSelected: Product;

  public retailer: Retailer;
  public productsList: Product[];

  constructor(
    public retailerStoreStore: RetailerStoreStore,
    private cartStore: CartStore
  ) {
    this.retailerStoreStore.retailer$.subscribe(
      x => {

        this.retailer = x;
      }
    )
  }
  ngOnChanges(changes: SimpleChange) {

    this.getVarietiesByMaturiry(this.storeProducts);


  }

  ngOnInit(): void {
    this.getVarietiesByMaturiry(this.storeProducts);
    
    //   .then( x=>{
    //     this.maturityProductsByVariety  = x;
    // });


    this.rowView = STORE_CONFIG.view_type.rowView;
    this.question = STORE_CONFIG.question_view_type.rowView;
  }

  /**
   * Listen to childre component(product-displaycomponent)
   * @param product product selected on children 
   * component
   */
  public onSelected(product: Product) {
    this.productSelected = product;
  }


  public onSelectedCartProduct(cartProduct: CartProduct) {

    cartProduct.totalPrice = updateTotalProductPrice(cartProduct.quantity, cartProduct.price);
    this.cartStore.updateCart(cartProduct);

  }

  async getVarietiesByMaturiry_promise(products: Product[]) {
    const matPodVar = await new Promise<MaturityProductsByVariety[]>((resolve, reject) => {
      resolve(getMaturityProductsByVariety(products));
    });

    console.log("matPodVar", matPodVar);
    // this.maturityProductsByVariety$.
    return matPodVar;

  }

  getVarietiesByMaturiry(products: Product[]) {

    console.log("getVarietiesByMaturiry",products)
    this.maturityProductsByVariety$ = new Observable<MaturityProductsByVariety[]>(
      observer => {
          observer.next(getMaturityProductsByVariety(products));
      });
  }

  getVarietyName(maturityProductsByVariety:MaturityProductsByVariety):string{

    console.log("maturityProductsByVariety",maturityProductsByVariety);
    return maturityProductsByVariety.categoryName === "Comida rápida" 
    ? maturityProductsByVariety.varietyName 
    : `${maturityProductsByVariety.categoryName} - ${maturityProductsByVariety.varietyName}`
  }
}