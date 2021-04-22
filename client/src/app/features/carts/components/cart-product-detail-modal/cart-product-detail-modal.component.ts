import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToppingSelected } from 'src/app/shared/components/topping/types/toppingSelected';

const tab: string = String.fromCodePoint(parseInt('9', 16));

@Component({
  selector: 'app-cart-product-detail-modal',
  templateUrl: './cart-product-detail-modal.component.html',
  styleUrls: ['./cart-product-detail-modal.component.sass'],
})
export class CartProductDetailModalComponent implements OnInit {
  @Input() productCartDetail: string;
  cartPoductDetailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CartProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cartPoductDetailForm = this.fb.group({
      productCartDetail: [this.data.cartProductDetail],
    });
  }

  // hold this method to format in orders in store profile view
  formatDetails(selectedToppingsStr: string): string {
    let result: string = '';
    console.log('selectedToppingsStr', selectedToppingsStr);

    // const selectedToppings: ToppingSelected[] = result.toppingsSelected;

    // selectedToppingsStr = "• Tipo de papas: Papas al hilo. • Cortesia de la casa: Queso. • Tus cremas: Mayonesa, Mostaza, Tártara, Aji, Salsa Gold. "
    const toppingsObjStr: string[] = selectedToppingsStr.split('. ');

    console.log('toppingsObjStr', toppingsObjStr);
    if (toppingsObjStr.length > 0) {
      toppingsObjStr.forEach((toppingStr, id) => {
        // without format topping list
        // if (id < toppingsObjStr.length - 1) {
        //   result += `${toppingStr} \n\n`;
        // } else if (toppingStr !== '') {
        //   result += `${toppingStr}`;
        // }
        // console.log('result', result);

        // with format topping list
        if (toppingStr !== '') {
          const topping = toppingStr.split(': ');
          // cartProduct.details += `${(id + 1).toString()} ] `;

          console.log('toppingStr');
          console.log(toppingStr);
          // topping name at topping[0]
          const name = topping[0].trim();
          result += `${name}:\n`;
          // topping list at topping[1]
          const toppingsSelected = topping[1].trim();
          const topppingsArr: string[] = toppingsSelected.split(',');
          if (topppingsArr.length > 0) {
            topppingsArr.forEach((topping, idx) => {
              result += `${tab}- ${topping.trim()}\n`;
              // result += `   ${idx + 1}) ${topping} \n`;
            });
            result += '\n';
          }
        }
      });
    }

    // result = this.deformatDetailToString(result);
    return result;
  }

  // not used
  deformatDetailToString(format: string): string {
    // lo

    // let result = format.replace(`\n`, '=');
    let result = format.replace(`${tab} `, '(TAB)');
    result = result.replace(/:[\r\n]+/gm, '(/N)');
    // let result = format.replace(' __ ', '^^');
    // result = format.replace('\n', '^');
    // result = format.replace('\n\n\n', '');
    console.log('deformatDetailToString - result', result);

    return result;
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
