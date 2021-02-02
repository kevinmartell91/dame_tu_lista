import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Retailer } from "../../core/retailer/types/retailer";
import { RetailerStoreStore } from './services/retailer.store';
import { transformCartProductsIntoProducts } from './helpers/product.helper';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from 'src/app/core/retailer/types/product';
import { TemporaryStorageService, TemporaryStorageFacet } from 'src/app/core/session-storage/services/temporary-storage.service';

@Component({
  selector: 'app-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.sass'],
  providers: [RetailerStoreStore]
})
export class RetailerStoresComponent implements OnDestroy {

  subscribedParamRetailerStoreName: string;
  retailer: Retailer;
  subscribeStoreName: Subscription;
  subscribeRetailerStore: Subscription;
  temporaryStorage: TemporaryStorageFacet;

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private temporaryStorageService: TemporaryStorageService,
    private retailerStoreStore: RetailerStoreStore
  ) {

    console.log("RetailerStoresComponent");
    this.temporaryStorage = this.temporaryStorageService.forKey("product_list");


    this.init();
  }

  init(): void {

    // Not used for now
    // this.restoreBuyerSelectedProductsFromTemporaryStorage();

    this.subscribeStoreName = this.route.paramMap.subscribe(params => {
      // this.subscribedParamRetailerId = params.get("retailer_id");
      this.subscribedParamRetailerStoreName = params.get("retailer_store_name");
    });

    this.subscribeRetailerStore = this.retailerStoreStore.products$.subscribe(
      productsList => {


        console.log("LOG => Retailer-Store - Set product list to Session storage", productsList.length);
        this.temporaryStorage.set(productsList);


        // if (sessionStorage.length == 0 ||
        //   !("product_list" in JSON.parse(sessionStorage.temp_session_storage)) ||
        //   JSON.parse(sessionStorage.temp_session_storage).product_list.length === 0
        //   ) {

        //     this.temporaryStorage.set(productsList);

        // }
      }
    )
    this.retailerStoreStore.getRetailerByNameStore(this.subscribedParamRetailerStoreName);


  }

  public async restoreBuyerSelectedProductsFromTemporaryStorage(): Promise<void> {

    let cachedData = await this.temporaryStorage.get<any>();
    // console.log("CacheData:", cachedData);
    const memCashedCartProd: CartProduct[] =
      JSON.parse(sessionStorage.temp_session_storage).cart_product_list;


    //if there is something to pass from Cart to products after reloading the page    
    if (cachedData && cachedData.length > 0 &&
      memCashedCartProd && memCashedCartProd.length > 0) {
      // if ( JSON.parse(sessionStorage.temp_session_storage).cart_product_list.length > 0) {


      //## restore from Session Storage
      const memCashedProd: Product[] =
        cachedData;



      // console.log("memCashedProd",memCashedProd);
      // retrievinf selected product by buyers
      const payloadProducts: Product[] =
        transformCartProductsIntoProducts(
          memCashedProd,
          memCashedCartProd
        );

      // console.log("payloadProducts",payloadProducts);
      // update cartStore with date from temporary storage
      this.retailerStoreStore._updateProductsFromSessionStorage(payloadProducts);
    }

  }

  ngOnDestroy(): void {
    this.subscribeStoreName.unsubscribe();
    this.subscribeRetailerStore.unsubscribe();
  }

}
