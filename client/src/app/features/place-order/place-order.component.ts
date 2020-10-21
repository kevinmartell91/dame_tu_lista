import { Component, EventEmitter, Output } from '@angular/core';
import { ProductDetail } from './types/product-detail';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.sass'],
})
export class PlaceOrderComponent {

  @Output() productDisplayAddedDoneEmmit = new EventEmitter<boolean>();

  img_url = `url(../../../assets/fruit-images/platano.jpeg)`;


  productDisplay: ProductDetail;


  constructor(  ) {
  }


  getProductDisplay(productDisplay: ProductDetail){
    this.productDisplay = productDisplay;
    
    // end a notification that productDisplay was gotten
    // in order to move out the displayDitailComponent called 
    // in  productDisplayComponent and finally clear the 
    // the former fields(displayDetail component).

    // First notify to ProductDisplay  TO 
    this.productDisplayAddedDoneEmmit.emit(true);
  }
  

}