import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, Input, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToppingSelected } from '../topping/types/toppingSelected';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-toppings',
  templateUrl: './add-toppings.component.html',
  styleUrls: ['./add-toppings.component.sass'],

  // animations: [
  //   trigger('changeState', [
  //     state('in', style({ transform: 'translateX(0%)', opacity: 1 })),
  //     state(
  //       'out',
  //       style({ transform: 'translateX(-150%)', opacity: 0, display: 'none' })
  //     ),
  //     transition('in=>out', [animate('0.3s ease-in')]),
  //     transition('out=>in', [animate('0.3s ease-in')]),
  //   ]),
  // ],
})
export class AddToppingsComponent implements OnInit {
  toppingsSelected: ToppingSelected[] = [];
  productLable: string;
  quatityUpdated: number;

  productLableFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isProductNameFixed: boolean = false;

  modalResul: any;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddToppingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('AddToppingsComponent');
  }

  ngOnInit(): void {
    this.quatityUpdated = this.data.quantity;

    this.productLableFormControl.valueChanges.subscribe((changes) => {
      console.log(
        'this.productLableFormControl.value',
        this.productLableFormControl.value
      );
      this.modalResul = {
        toppingsSelected: this.toppingsSelected,
        productLabel: this.productLableFormControl.value,
        quantity: this.quatityUpdated,
      };
    });
  }

  @HostListener('window:scroll') onScroll(e: Event): void {
    const posY = this.getYPosition(e);
  }

  getYPosition(e: Event): number {
    console.log('posY', 'posY');
    return (e.target as Element).scrollTop;
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }

  onSelectedToppings(topping: ToppingSelected) {
    // search and update the incoming topping
    // incomming topping !exist
    if (!existIncommingTopping(topping, this.toppingsSelected)) {
      // then add
      this.toppingsSelected.push(topping);
    } else {
      this.toppingsSelected = updateToppingsSelected(
        topping,
        this.toppingsSelected
      );
    }
    console.log('this.toppingsSelected', this.toppingsSelected);
    this.modalResul = {
      toppingsSelected: this.toppingsSelected,
      productLabel: this.productLableFormControl.value,
      quantity: this.quatityUpdated,
    };
  }

  async onQuantityUpdated(quantityUpdated: number) {
    if (quantityUpdated === 0) {
      // this.disableQuantityMode();
      this.onNoClick();
    }
    this.quatityUpdated = quantityUpdated;

    // if (quantityUpdated == 0) {
    //   this.quantityStr = '+';
    //   this.productTotalPriceQuantityStr = '';
    //   this.isQuantityIncreased = false;
    // } else {
    //   this.quantity = quantityUpdated;
    //   this.quantityStr = quantityUpdated.toString();
    //   this.productTotalPriceQuantityStr = `S/.
    //    ${round(this.product.price * quantityUpdated, 2).toFixed(2)}`;

    //   this.isQuantityIncreased = true;
    // }

    // // create a new cart stores with updated quantity
    // const cartProduct: CartProduct = getCartProductFromProduct(
    //   this.product,
    //   quantityUpdated,
    //   this.size
    // );
    // // then send it to to listener to be updated in
    // this.selectedCartProduct.emit(cartProduct);
  }
}

const existIncommingTopping = (
  incommingTopping: ToppingSelected,
  toppingsSelected: ToppingSelected[]
): boolean => {
  let result = false;
  toppingsSelected.forEach((toppingSelected) => {
    if (toppingSelected.name === incommingTopping.name) {
      return (result = true);
    }
  });
  return result;
};

const updateToppingsSelected = (
  incommingTopping: ToppingSelected,
  toppingsSelected: ToppingSelected[]
): ToppingSelected[] => {
  for (let i = 0; i < toppingsSelected.length; i++) {
    const name = toppingsSelected[i].name;
    if (incommingTopping.name === name) {
      toppingsSelected[i] = incommingTopping;
      return toppingsSelected;
    }
  }
};

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
