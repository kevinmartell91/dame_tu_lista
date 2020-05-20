import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-product-quantity',
  templateUrl: './input-product-quantity.component.html',
  styleUrls: ['./input-product-quantity.component.sass']
})
export class InputProductQuantityComponent implements OnInit {

  @Input() quantity: string;

  constructor() { }

  ngOnInit(): void {
  }

}
