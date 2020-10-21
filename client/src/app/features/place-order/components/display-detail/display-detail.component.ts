import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductDetail } from '../../types/product-detail';

@Component({
  selector: 'app-display-detail',
  templateUrl: './display-detail.component.html',
  styleUrls: ['./display-detail.component.sass']
})
export class DisplayDetailComponent  {

  @Output() displayDetailEmmit = new EventEmitter<ProductDetail>();
  isKilogramsOrUnits : string = "";
  
  myFlagForSlideToggle : boolean = true;

  last_for_List = [ 
    '4 días',
    '1 semana',
    '1.3335 semanas',
    '2 semanas'
  ]

  constructor(
    public matDialogRef: MatDialogRef<DisplayDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductDetail 
    ) { }

  onNoClick(): void {
    this.matDialogRef.close();
  }

  ChangeAction (last_for_selected){
  }

  //////  Child parent comunication implementation //////
  sendProductDetailToProductDisplay(displayDetail: ProductDetail) {
    // change PRODUCT NAME to productToEmmit
    this.displayDetailEmmit.emit(displayDetail);
  }
}
