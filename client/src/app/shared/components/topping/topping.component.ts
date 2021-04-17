import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Topping } from '../../models/deserializable.model';
import { ToppingSelected } from './types/toppingSelected';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.sass'],
})
export class ToppingComponent implements OnInit {
  @Input() toppingType: Topping;
  @Input() incommingSelectedToppings: ToppingSelected;
  @Output() selectedToppings = new EventEmitter<ToppingSelected>();

  toppings = new FormControl();

  toppingSelected: ToppingSelected;

  constructor() {
    this.toppings.valueChanges.subscribe((change) => {
      this.toppingSelected = {
        name: this.toppingType.title_toppings,
        selected: this.toppings.value.toString(),
      };
      this.selectedToppings.emit(this.toppingSelected);
    });
  }

  getToppingPriceFormat(id: number): string {
    if (this.toppingType.price_toppings[id] === 0) return '';
    return `S/. ${this.toppingType.price_toppings[id].toFixed(2)}`;
  }

  getToppingNameAndPriceAsValue(name: string, idx: number): string {
    return `${name} ${this.getToppingPriceFormat(idx)}`;
  }

  ngOnInit(): void {
    let incommingToppings = this.incommingSelectedToppings;
    if (
      incommingToppings !== undefined &&
      incommingToppings !== null &&
      incommingToppings.selected !== null
    ) {
      //pupulate combos and multicombos
      if (this.toppingType.isMultipleSelection_toppings) {
        // multple topping names selected
        const nameArr = incommingToppings.selected.split(',');
        this.toppings.setValue(nameArr);
      } else {
        // one topping names selected
        this.toppings.setValue(incommingToppings.selected);
      }
    }
  }
}
