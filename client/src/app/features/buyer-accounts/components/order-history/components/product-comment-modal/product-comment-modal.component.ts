import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-comment-modal',
  templateUrl: './product-comment-modal.component.html',
  styleUrls: ['./product-comment-modal.component.sass']
})
export class ProductCommentModalComponent implements OnInit {

  @Input() productCartDetail: string;
  cartPoductDetailForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<ProductCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  
    this.cartPoductDetailForm = this.fb.group({
      productCartDetail: [this.data.cartProductDetail]
    });
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}