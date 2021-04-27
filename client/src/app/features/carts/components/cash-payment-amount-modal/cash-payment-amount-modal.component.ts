import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';

@Component({
  selector: 'app-cash-payment-amount-modal',
  templateUrl: './cash-payment-amount-modal.component.html',
  styleUrls: ['./cash-payment-amount-modal.component.sass'],
})
export class CashPaymentAmountModalComponent implements OnInit {
  cashPaymentAmountForm: FormGroup;
  cashAmount: number;
  message: string;
  // currentUser: string;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CashPaymentAmountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
  }

  ngOnInit(): void {
    this.message = '¿Con cuánto pagaras?';
    // this.message = this.data.isFreeBill
    //   ? 'Envia por whatsApp la lista que creaste ingresando un número de celular.'
    //   : this.data.isSalesQuote
    //   ? 'Envia directamente la cotización de tus productos via WhatsApp.'
    //   : 'Ingresa tu WhatsApp para estar en comunicación constante con el vendedor.';
    // // : 'Ingresa tu WhatsApp para estar en comunicación constante con el vendedor y en tiempo real coordinar lo que necesites con el vendedor.';
    this.cashPaymentAmountForm = this.fb.group({
      cashAmount: [this.cashAmount, Validators.required],
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
