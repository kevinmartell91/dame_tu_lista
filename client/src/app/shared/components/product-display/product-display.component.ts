import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../core/retailer/types/product';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { getCartProductFromProduct } from 'src/app/core/cart/helpers/cart-helper';

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
  @Output() selectedCartProduct = new EventEmitter<CartProduct>();
  
  
  isQuantityMode: boolean = false;
  isKiloUnitAvailable: boolean = true;
  isSizeAvailable: boolean = true;
  
  quantityStr : string = "+";
  quantity: number = 0;
  kiloOrUnit: string = "";
  size: string = "";

  isQuantityIncreased: boolean = false;

  constructor() { }

  select(){ 

    console.log("select()",this.quantity,this.size, this.kiloOrUnit);
    this.selected.emit(this.product)
    this.selectedCartProduct.emit(this.getCartProduct());

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
      this.isQuantityIncreased = false;
    } else {
      this.quantityStr = quantityUpdated.toString();
      this.isQuantityIncreased = true;
    }
  
  }
  
  onMassUpdated(kiloOrUnitUpdated: string) {
  
    this.kiloOrUnit = kiloOrUnitUpdated;
  
  }
  
  onSizeUpdated(sizeUpdated: string){
   
    // this.switchQuantityMode();
    this.size = sizeUpdated;
    console.log("onSizeUpdated", this.size);
  
  }

  enableQuantityMode():void {
    
    this.isQuantityMode = true;
 
  }

  disableQuantityMode(): void {
   
    this.isQuantityMode = false;
  
  }
  
  switchQuantityMode(): void {
    
    this.isQuantityMode ? this.isQuantityMode = false : this.isQuantityMode = true;
  
  }
  
  private getCartProduct(): CartProduct {

    return getCartProductFromProduct(this.product, this.quantity, this.size);
    
  }

}
