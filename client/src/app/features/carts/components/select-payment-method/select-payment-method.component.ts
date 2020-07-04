import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.sass']
})
export class SelectPaymentMethodComponent implements OnInit {

  paymenytForm: FormGroup;
  errorMessage:  string;
  loading: boolean= false;
  @Output() paymentMethodSelected = new  EventEmitter<any>();
  @Output() displayDetailEmmit = new EventEmitter<any>();



  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<SelectPaymentMethodComponent>
  ) { }

  ngOnInit(): void {

    this.paymenytForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      phoneNumber: ['', Validators.required]
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
