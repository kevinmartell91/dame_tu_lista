import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-payment-modal',
  templateUrl: './order-payment-modal.component.html',
  styleUrls: ['./order-payment-modal.component.sass']
})
export class OrderPaymentModalComponent implements OnInit {

  orderPaymentForm: FormGroup;
  paymentMethod: string;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<OrderPaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  
    console.log("KEVIN", this.data.order);

    this.paymentMethod = this.data.order.payment.method;
    
    this.orderPaymentForm = this.fb.group({
      buyerName: [this.data.order.shipping.buyer.name],
      buyerEmail: [this.data.order.shipping.buyer.email],
      buyerPhoneNumber: [this.data.order.shipping.buyer.phoneNumber],
      amount: [this.data.order.payment.amount]
    });
  }


  onNoClick(): void {
    this.matDialogRef.close();
  }
}

