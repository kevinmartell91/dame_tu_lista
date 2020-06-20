import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../core/retailer/types/product';

@Component({
  selector: 'app-product-display-shared',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass']
})
export class ProductDisplaySharedComponent {

  // getting the list of product and render depending on the typeView
  @Input() typeView: string;
  @Input() product: Product;
  @Output() selected = new EventEmitter<Product>();
  
  
  isQuantityMode: boolean = false;
  isKiloUnitAvailable: boolean = true;
  isSizeAvailable: boolean = true;
  
  quantity: number = 0;
  quantityStr : string = "+";
  kiloOrUnit: string;
  size: string = "";

  constructor() { }

  select(){ 
    console.log("select()",this.quantity);
    this.selected.emit(this.product);
  }

  getGridView(): string {
    switch (this.typeView) {
      case "maturityView":
        return "product_display_grid_maturity_view";
        break;
      case "categoryView":
        return "product_display_grid_category_view";
        break;
      case "varietyView":
        return "product_display_grid_type_view";
        break;
      default: // "SeasonView"
        return "product_display_grid_seasonal_view";
        break;
    }
  }

  /**
   * listen to quantityUpdated from add-button-component.ts
   * @param newQuantity 
   */
  onQuantityUpdated(quantityUpdated: number){ 
    
    this.quantity = quantityUpdated;
    
    if(quantityUpdated == 0) {
      this.quantityStr = "+";
    } else {
      this.quantityStr = quantityUpdated.toString();
    }
  }
  onMassUpdated(kiloOrUnitUpdated: string) {
    this.kiloOrUnit = kiloOrUnitUpdated;
  }
  
  onSizeUpdated(sizeUpdated: string){
    this.switchQuantityMode();
    this.size = sizeUpdated;
    console.log("onSizeUpdated", this.size);
  }

  enableQuantityMode():void {
    this.isQuantityMode = true;
  }
  
  switchQuantityMode(): void {
    this.isQuantityMode ? this.isQuantityMode = false : this.isQuantityMode = true;
  }
  

}
