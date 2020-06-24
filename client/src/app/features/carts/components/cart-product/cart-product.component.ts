import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { CartProduct } from 'src/app/core/cart/types/cart-product';


@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass']
})
export class CartProductComponent implements OnInit {


  @Input() cartProduct: CartProduct;
  @Output() cartProductUpdated = new EventEmitter<CartProduct>();
  cartProductPriceStr: string;


  isQuantityMode: boolean = false;

  constructor( ) { }

  ngOnInit(): void {

    this.transformCartProductTotalPriceToStr();
  }

   /**
   * listen to quantityUpdated from add-button-component.ts
   * @param newQuantity 
   */
  onQuantityUpdated(quantityUpdated: number){ 
    
    // if cartProduct quatity is 0, 
    // then disableQuantityMode
    if(quantityUpdated == 0){
      this.disableQuantityMode() 
    }


    this.cartProduct.quantity = quantityUpdated;
    this.cartProduct.updateTotalProductPrice();
    
    // formating to two decimals and as a string
    this.transformCartProductTotalPriceToStr();

    this.cartProductUpdated.emit(this.cartProduct);

 
    
    // if(quantityUpdated == 0) {
    //   this.quantityStr = "+";
    //   this.isQuantityIncreased = false;
    // } else {
    //   this.quantityStr = quantityUpdated.toString();
    //   this.isQuantityIncreased = true;
    // }
  
  }
  enableQuantityMode(): void {
    console.log("enableQuantityMode");
    this.isQuantityMode = true;
  }

  disableQuantityMode(): void {
    console.log("disableQuantityMode");
    this.isQuantityMode = false;
  }

  transformCartProductTotalPriceToStr(): void {
    this.cartProductPriceStr = this.cartProduct.totalPrice.toFixed(2);

    console.log("transformCartProductTotalPriceToStr", this.cartProductPriceStr);
  }

}
