import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.sass']
})
export class OrderDetailModalComponent implements OnInit {

  orderDetailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<OrderDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  
    this.orderDetailForm = this.fb.group({
      streetName: [this.data.order.shipping.address.streetName],
      streetNumber: [this.data.order.shipping.address.streetNumber],
      district: [this.data.order.shipping.address.district],
      city: [this.data.order.shipping.address.city],
      reference: [this.data.order.shipping.address.reference],
      details: [this.data.order.shipping.address.details]
    });
  }


  onNoClick(): void {
    this.matDialogRef.close();
  }

}
