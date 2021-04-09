import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { RetailerStoreStore } from 'src/app/features/retailer-stores/services/retailer.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.sass'],
})
export class SelectPaymentMethodComponent implements OnInit {
  paymenytForm: FormGroup;
  errorMessage: string;

  currentUser: string;
  saleQuoteType: string = 'sale_quote';

  constructor(
    private fb: FormBuilder,
    private retailerStoreStore: RetailerStoreStore,
    private matDialogRef: MatDialogRef<SelectPaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
  }

  ngOnInit(): void {
    this.paymenytForm = this.fb.group({
      // by default set to upon_delivery_cash
      // works for buyer ans seller
      paymentMethod: [
        this.currentUser ? this.saleQuoteType : '',
        Validators.required,
      ],
    });
  }

  // onSubmit() { }
  // replaced by
  // <button mat-button [mat-dialog-close]="paymenytForm.value">
  // the from is send to the parent through [mat-dialog-close] in .html

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
