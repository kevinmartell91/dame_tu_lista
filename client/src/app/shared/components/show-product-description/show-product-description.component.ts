import { Component, Inject, Input, OnInit, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToppingSelected } from '../topping/types/toppingSelected';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-product-description',
  templateUrl: './show-product-description.component.html',
  styleUrls: ['./show-product-description.component.sass'],
})
export class ShowProductDescriptionComponent implements OnInit {
  toppingsSelected: ToppingSelected[] = [];
  productLable: string;
  quatityUpdated: number;

  productLableFormControl = new FormControl('', [Validators.required]);
  // matcher = new MyErrorStateMatcher();
  // isProductNameFixed: boolean = false;

  modalResul: any;

  constructor(
    private matDialogRef: MatDialogRef<ShowProductDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
