import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { CartProductDetailModalComponent } from "../cart-product-detail-modal/cart-product-detail-modal.component";


@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass']
})
export class CartProductComponent implements OnInit {


  @Input() cartProduct: CartProduct;
  @Output() cartProductUpdated = new EventEmitter<CartProduct>();
  @Output() cartProducDeleted = new EventEmitter<CartProduct>();

  cartProductTotalPriceStr: string;
  cartProductPriceStr: string;


  isQuantityMode: boolean = false;

  dialogRef: any;

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.cartProductPriceStr = this.cartProduct.price.toFixed(2);
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
    this.cartProduct.totalPrice = updateTotalProductPrice(this.cartProduct.quantity, this.cartProduct.price);

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

  deleteCartProduct():void {
    this.cartProducDeleted.emit(this.cartProduct);
  }

  enableQuantityMode(): void {
    // console.log("enableQuantityMode");
    this.isQuantityMode = true;
  }

  disableQuantityMode(): void {
    // console.log("disableQuantityMode");
    this.isQuantityMode = false;
  }

  transformCartProductTotalPriceToStr(): void {
    this.cartProductTotalPriceStr = this.cartProduct.totalPrice.toFixed(2);

    // console.log("transformCartProductTotalPriceToStr", this.cartProductTotalPriceStr);
  }

  openAddCartProductDetailModal(): void {
    this.dialogRef = this.matDialog.open(CartProductDetailModalComponent, {
      width: '320px',
      data: {
        cartProductDetail: this.cartProduct.details
      }
    });
    
    this.dialogRef.afterClosed().subscribe( result => {

      // console.log("RESUTL => ",result);
      this.cartProduct.details = result.productCartDetail;
      this.cartProductUpdated.emit(this.cartProduct);


    });

  }

}
