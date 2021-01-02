import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { RetailerStoreStore } from 'src/app/features/retailer-stores/services/retailer.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.sass']
})
export class SelectPaymentMethodComponent implements OnInit {

  paymenytForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  @Output() paymentMethodSelected = new EventEmitter<any>();
  @Output() displayDetailEmmit = new EventEmitter<any>();
  phoneNumber: string = "";

  subcription: Subscription;
  currentUser: string;
  saleQuoteType: string = "sale_quote";

  constructor(
    private fb: FormBuilder,
    private retailerStoreStore: RetailerStoreStore,
    private matDialogRef: MatDialogRef<SelectPaymentMethodComponent>
  ) {

    this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);

    // if there is no user => login (seller)
    // then the buyer is about to send an
    // order to the seller phonenumber.
    // also hide the phone number field
    // if (!this.currentUser) {
    //   this.phoneNumber = localStorage.getItem("retailer_phone_number");
    //   console.log("SelectPaymentMethodComponent-this.currentUser", this.phoneNumber);
    // } else {
    //   // if seller is  login, then send invoice
    //   // to customer phone number
    //   // Also show phone number field
    // }


  }

  ngOnInit(): void {

    this.paymenytForm = this.fb.group({
      // by default set to upon_delivery_cash
      // works for buyer ans seller
      paymentMethod: [this.currentUser ? this.saleQuoteType : '', Validators.required],
      // phoneNumber: ["+51" + this.phoneNumber, Validators.required]
      phoneNumber: [this.phoneNumber, Validators.required]
    })
  }

  // onSubmit() { }
  // replaced by 
  // <button mat-button [mat-dialog-close]="paymenytForm.value">
  // the from is send to the parent through [mat-dialog-close] in .html

  onNoClick(): void {
    this.matDialogRef.close();
  }

}
