import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
      // console.log('this.toppings.value', this.toppings.value);

      this.toppingSelected = {
        name: this.toppingType.title_toppings,
        selected: this.toppings.value.toString(),
        isMultipleSelection: this.toppingType.isMultipleSelection_toppings,
        countSelected: this.toppingType.isMultipleSelection_toppings
          ? this.toppings.value.length
          : 1,
        name_abbreviation:
          typeof this.toppings.value === 'string'
            ? this.getAbbreviationNamesString(this.toppings.value)
            : this.getAbbreviationNamesArray(this.toppings.value),
      };
      this.selectedToppings.emit(this.toppingSelected);
    });
  }

  getAbbreviationNamesString(selectedTopping: string): string {
    console.log('selectedTopping', selectedTopping);
    const selected = (elem) => elem === selectedTopping.trim();
    const idx = this.toppingType.name_toppings.findIndex(selected).toString();
    return this.toppingType.name_abbreviation_toppings[idx];
  }
  getAbbreviationNamesArray(selectedToppings: string[]): string {
    const sign = 'S/.';
    let result = [];
    if (selectedToppings === null) return null;

    selectedToppings.map((selected) => {
      console.log('selectedTopping', selected.trim());
      const hasPrice = selected.trim().includes(sign);
      if (hasPrice) {
        selected = selected.split(sign)[0];
        console.log('selected FISRT', selected);
      }
      console.log(
        'this.toppingType.name_toppings',
        this.toppingType.name_toppings
      );
      const isExit = (elem) => elem == selected.trim();
      const idx = this.toppingType.name_toppings.findIndex(isExit);
      if (idx > -1) {
        result.push(this.toppingType.name_abbreviation_toppings[idx]);
      }
    });
    console.log('result', result);
    return result.toString();
  }

  getToppingPriceFormat(id: number): string {
    if (this.toppingType.price_toppings[id] === 0) return '';
    return `S/. ${this.toppingType.price_toppings[id].toFixed(2)}`;
  }

  getToppingNameAndPriceAsValue(name: string, idx: number): string {
    return `${name} ${this.getToppingPriceFormat(idx)}`;
  }

  ngOnInit(): void {
    console.log('toppingType', this.toppingType);

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
