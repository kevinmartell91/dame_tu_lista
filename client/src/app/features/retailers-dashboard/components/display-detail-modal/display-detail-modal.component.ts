import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-display-detail-modal',
  templateUrl: './display-detail-modal.component.html',
  styleUrls: ['./display-detail-modal.component.sass'],
})
export class DisplayDetailModalComponent implements OnInit {
  @Input() productCartDetail: string;
  cartPoductOrderDetailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<DisplayDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cartPoductOrderDetailForm = this.fb.group({
      cartProductOrderDetail: [this.data.cartProductOrderDetail],
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
