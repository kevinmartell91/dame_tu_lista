import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { filterProducts } from '../../helpers/product.helper';

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass']
})
export class MaturityProductsComponent implements OnInit {

  // @Input() storeProducts: Product; 
  public maturityView: string;
  public question: string;

  public retailer: Retailer;
  public productsList: Product[];

  constructor( 
    private buyerNavegationStore: BuyerNavegationStore,
    private platformLocation: PlatformLocation,
    private retailerStoreStore: RetailerStoreStore
  ) {
    this.listenBrowserBackButton();

    this.retailerStoreStore.retailer$.subscribe(
      x => {
        this.retailer = x;
        this.productsList = filterProducts( STORE_CONFIG.view_type.maturityView, x.store.productsList);

      }
    )
  }
    
    ngOnInit(): void {
      this.maturityView = STORE_CONFIG.view_type.maturityView;
      this.question = STORE_CONFIG.question_view_type.maturityView;
      console.log("MaturityProductsComponent",this.productsList);
  }

  private listenBrowserBackButton():void {

    this.platformLocation.onPopState(() => {
      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.varietyView
      );
    })
  }
}
