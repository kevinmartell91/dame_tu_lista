import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-payment-modal',
  templateUrl: './order-payment-modal.component.html',
  styleUrls: ['./order-payment-modal.component.sass']
})
export class OrderPaymentModalComponent implements OnInit {

  // orderPaymentForm: FormGroup;
  paymentMethod: string;
  amount: string = '';
  buyerName: string = '';
  buyerEmail: string = '';
  buyerPhoneNumber: string = '';

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<OrderPaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  
    this.paymentMethod = this.data.order.payment.method;
    
    // this.orderPaymentForm = this.fb.group({
    //   buyerName: [this.data.order.shipping.buyer.name],
    //   buyerEmail: [this.data.order.shipping.buyer.email],
    //   buyerPhoneNumber: [this.data.order.shipping.buyer.phoneNumber],
    //   amount: [((this.data.order.payment.amount) as Number).toFixed(2)]
    // });

      this. buyerName =  this.data.order.shipping.buyer.name;
      this. buyerEmail =  this.data.order.shipping.buyer.email;
      this. buyerPhoneNumber =  this.data.order.shipping.buyer.phoneNumber;
      this.amount =  ((this.data.order.payment.amount) as Number).toFixed(2);
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}

