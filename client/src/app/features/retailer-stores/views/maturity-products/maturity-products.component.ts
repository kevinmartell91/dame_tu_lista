import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass']
})
export class MaturityProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public maturityView: string;
  public question: string;

  constructor( 
    private buyerNavegationStore: BuyerNavegationStore,
    private platformLocation: PlatformLocation
  ) {
    this.listenBrowserBackButton();
  }

  ngOnInit(): void {
    this.maturityView = STORE_CONFIG.view_type.maturityView;
    this.question = STORE_CONFIG.question_view_type.maturityView;
  }

  listenBrowserBackButton():void {

    this.platformLocation.onPopState(() => {
      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.varietyView
      );
    })
  }
}
