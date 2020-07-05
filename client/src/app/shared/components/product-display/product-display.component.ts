import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../../core/retailer/types/product';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { getCartProductFromProduct, round } from 'src/app/core/cart/helpers/cart-helper';

@Component({
  selector: 'app-product-display-shared',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass']
})
export class ProductDisplaySharedComponent implements OnInit {

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
  productPriceStr: string;

  isQuantityIncreased: boolean = false;

  constructor( ) { 
  }
  
  ngOnInit():void {
    // formating to two decimals and as a string
    this.productPriceStr = round(this.product.price,2).toFixed(2);

  }

  isKilo(): boolean {
    return this.product.isKilo;
  }

  select(){ 

    console.log("select()",this.product,this.size, this.kiloOrUnit);
    this.selected.emit(this.product)

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
        return "product_display_grid_variety_view";
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
    
    // if cartProduct quatity is 0, 
    // then disableQuantityMode
    if(quantityUpdated == 0) {
      this.disableQuantityMode();
    }


    this.quantity = quantityUpdated;
    
    if(quantityUpdated == 0) {
      this.quantityStr = "+";
      this.isQuantityIncreased = false;
    } else {
      this.quantityStr = quantityUpdated.toString();
      this.isQuantityIncreased = true;
    }

    // then send it to to listener to be updated in
    // Cart stores
    this.selectedCartProduct.emit(this.getCartProduct());
  
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
