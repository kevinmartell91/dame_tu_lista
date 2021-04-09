import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';

@Component({
  selector: 'app-phone-number-modal',
  templateUrl: './phone-number-modal.component.html',
  styleUrls: ['./phone-number-modal.component.sass'],
})
export class PhoneNumberModalComponent implements OnInit {
  phoneNumberForm: FormGroup;
  phoneNumber: string = '';
  message: string;
  currentUser: string;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<PhoneNumberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
  }

  ngOnInit(): void {
    console.log('this.data.isSalesQuote', this.data.isSalesQuote);
    console.log('this.data.isFreeBill', this.data.isFreeBill);
    this.message = this.data.isFreeBill
      ? 'Envia por whatsApp la lista que creaste ingresando un número de celular.'
      : this.data.isSalesQuote
      ? 'Envia directamente la cotización de tus productos via WhatsApp.'
      : 'Ingresa tu WhatsApp para estar en comunicación constante con el vendedor.';
    // : 'Ingresa tu WhatsApp para estar en comunicación constante con el vendedor y en tiempo real coordinar lo que necesites con el vendedor.';
    this.phoneNumberForm = this.fb.group({
      phoneNumber: [this.phoneNumber, Validators.required],
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
