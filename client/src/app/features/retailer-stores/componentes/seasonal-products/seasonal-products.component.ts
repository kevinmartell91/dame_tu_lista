import { Component, OnInit, Input} from '@angular/core';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { Product } from 'src/app/core/retailer/types/product';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
// import { filterProducts } from '../../helpers/product.helper';
// import { ProductDisplaySharedComponent } from "../../../../shared/components/product-display/product-display.component";

@Component({
  selector: 'app-seasonal-products',
  templateUrl: './seasonal-products.component.html',
  styleUrls: ['./seasonal-products.component.sass']
})
export class SeasonalProductsComponent implements OnInit {

  @Input() storeProducts: Product[]; 
  public seasonalView: string;
  public question: string;

  public retailer: Retailer;
  public productsList: Product[];

  constructor(
    private retailerStoreStore: RetailerStoreStore
  ) { 
    this.retailerStoreStore.retailer$.subscribe(
      x => {
        this.retailer = x;
        // this.productsList = filterProducts(STORE_CONFIG.view_type.seasonalView)
      }
    )
  }

  ngOnInit(): void {
    console.log("kevin=> products", this.storeProducts);
    this.seasonalView = STORE_CONFIG.view_type.seasonalView;
    this.question = STORE_CONFIG.question_view_type.seasonalView;
  }

}
