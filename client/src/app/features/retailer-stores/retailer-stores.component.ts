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

    this.temporaryStorage = this.temporaryStorageService.forKey("product_list");

    
    this.init();
  }
  
  init(): void {

    this.restoreFromTemporaryStorage();

    this.subscribeStoreName = this.route.paramMap.subscribe(params => {
      // this.subscribedParamRetailerId = params.get("retailer_id");
      this.subscribedParamRetailerStoreName = params.get("retailer_store_name");
    });

    this.subscribeRetailerStore = this.retailerStoreStore.products$.subscribe(
      productsList => {
        

        this.temporaryStorage.set(productsList);


        if (sessionStorage.length == 0 ||
          !("product_list" in JSON.parse(sessionStorage.temp_session_storage)) ||
          JSON.parse(sessionStorage.temp_session_storage).product_list.length === 0
          ) {
            console.log("Brian => temporaryStorage.set(productsList);",productsList.length);
            
            // this.temporaryStorage.set(productsList);

        }
      }
    )

    this.retailerStoreStore.getRetailerByNameStore(this.subscribedParamRetailerStoreName);

  }

  public async restoreFromTemporaryStorage(): Promise<void> {

    let cachedData = await this.temporaryStorage.get<any>();

    // let products: Product[] = [];

    console.log("CacheData:", cachedData);

    if (cachedData.length > 0) {
    // if ( JSON.parse(sessionStorage.temp_session_storage).cart_product_list.length > 0) {

      console.log("restoreFromTemporaryStorage > 0");

      //## restore from Session Storage
      const memCashedProd: Product[] =
        JSON.parse(sessionStorage.temp_session_storage).product_list;
      const memCashedCartProd: CartProduct[] =
        JSON.parse(sessionStorage.temp_session_storage).cart_product_list;


        console.log("memCashedProd",memCashedProd);
      // ETL of memCashed to Product data type
      const payloadProducts: Product[] =
        transformCartProductsIntoProducts(
          memCashedProd,
          memCashedCartProd
        );
      
        console.log("payloadProducts",payloadProducts);
      // update cartStore with date from temporary storage
      this.retailerStoreStore.updateProductsFromSessionStorage(payloadProducts);

    }

  }

  ngOnDestroy(): void {
    this.subscribeStoreName.unsubscribe();
    this.subscribeRetailerStore.unsubscribe();
  }

}
