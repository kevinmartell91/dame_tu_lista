import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToppingSelected } from './types/toppingSelected';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.sass'],
})
export class ToppingComponent implements OnInit {
  @Input() toppingType;
  @Output() selectedToppings = new EventEmitter<ToppingSelected>();

  toppings = new FormControl();

  toppingSelected: ToppingSelected;

  constructor() {
    this.toppings.valueChanges.subscribe((change) => {
      this.toppingSelected = {
        name: this.toppingType.name,
        selected: this.toppings.value.toString(),
      };
      this.selectedToppings.emit(this.toppingSelected);
    });
  }

  ngOnInit(): void {}
}
