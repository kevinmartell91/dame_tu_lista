import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../core/retailer/types/product';

@Component({
  selector: 'app-product-display-shared',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass']
})
export class ProductDisplaySharedComponent implements OnInit {

  // getting the list of product and render depending on the typeView
  @Input() typeView: string;
  @Input() product: Product;
  

  constructor() { }

  ngOnInit(): void {
    // console.log("product", (this.product));
  }

  increment(): number {
    console.log("increment()",this.product.price);
    return 99;
  }  
  getProductAttributesByViewType(){
    switch (this.typeView) {
      case "value":
        
        break;
    
      default:
        break;
    }
  }

  
  
  getGridView(typeView: String): string {
    // console.log("getGridView(typeView) = > ",typeView);
    switch (this.typeView) {
      case "maturityView":
        return "product_display_grid_maturity_view";
        break;
      case "categoryView":
        return "product_display_grid_category_view";
        break;
      case "typeView":
        return "product_display_grid_type_view";
        break;
      default: // "SeasonView"
        return "product_display_grid_seasonal_view";
        break;
    }
  }
}
