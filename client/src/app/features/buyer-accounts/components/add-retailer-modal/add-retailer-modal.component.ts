import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-retailer-modal',
  templateUrl: './add-retailer-modal.component.html',
  styleUrls: ['./add-retailer-modal.component.sass'],
})
export class AddRetailerModalComponent implements OnInit {
  favoriteRetailerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddRetailerModalComponent>
  ) {}

  ngOnInit(): void {
    this.favoriteRetailerForm = this.fb.group({
      retailer_email: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
