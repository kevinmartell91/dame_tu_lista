import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-product-detail-modal',
  templateUrl: './cart-product-detail-modal.component.html',
  styleUrls: ['./cart-product-detail-modal.component.sass']
})
export class CartProductDetailModalComponent implements OnInit {

  @Input() productCartDetail: string;
  cartPoductDetailForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CartProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  
    this.cartPoductDetailForm = this.fb.group({
      productCartDetail: [this.data.cartProductDetail]
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }

}
