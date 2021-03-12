import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormArray,
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SelectPaymentMethodComponent } from '../carts/components/select-payment-method/select-payment-method.component';
import { last } from 'rxjs/operators';

interface IProduct {
  id: string;
  name: string;
  price: string;
}

@Component({
  selector: 'app-send-free-bill',
  templateUrl: './send-free-bill.component.html',
  styleUrls: ['./send-free-bill.component.sass'],
})
export class SendFreeBillComponent implements OnInit {
  controls: FormArray;
  newProductForm: FormGroup;
  strTotalPrice: string;

  productList: IProduct[] = [];
  dialogRef: any;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private buyerNavegationStore: BuyerNavegationStore
  ) {}

  ngOnInit(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.freeBillView,
      'navegation.freeBillView'
    );

    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

    const toGroups = this.productList.map((product) => {
      return new FormGroup({
        id: new FormControl(product.id, Validators.required),
        name: new FormControl(product.name, Validators.required),
        price: new FormControl(product.price, Validators.required),
      });
    });
    this.controls = new FormArray(toGroups);
  }

  @ViewChild('myInputProduct') inputProductField: ElementRef;
  ngAfterViewInit() {
    this.inputProductField.nativeElement.focus();
  }

  getControl(id: string, field: string): AbstractControl {
    const absCtrl = this.controls.controls.find((ctrl) => {
      if (ctrl.value.id === id) {
        return ctrl;
      }
    });
    return absCtrl.get(field);
  }

  updateField(id: string, field: string) {
    const control = this.getControl(id, field);

    let isPrice = field === 'price' ? true : false;
    console.log('object control', control);
    if (control.valid) {
      this.productList = this.productList.map((prod) => {
        if (id === prod.id.toString()) {
          return {
            ...prod,
            // [field]: control.value
            [field]: isPrice ? (+control.value).toFixed(2) : control.value,
          };
        }
        return prod;
      });
    }
  }

  addProduct(form: IProduct) {
    console.log('form:', form);
    const newEntity: IProduct = {
      id: Date.now().toString(),
      name: form.name,
      price: (+form.price).toFixed(2),
    };

    const newControl = new FormGroup({
      id: new FormControl(Date.now().toString()),
      name: new FormControl(form.name, Validators.required),
      price: new FormControl(form.price, Validators.required),
    });
    this.productList.push(newEntity);
    this.controls.push(newControl);

    this.newProductForm.reset();
    this.inputProductField.nativeElement.focus();
  }

  deleteProduct(id: string) {
    this.productList = this.productList.filter((prod) => {
      if (prod.id !== id) {
        return prod;
      }
    });
  }

  sendBillTo(phoneNumber: string): void {
    // const listRawText = this.transformProductToRawText(this.productList);
    const listRawText = this.transformProductToRawTextMiltiline(
      this.productList
    );
    console.log(listRawText);
    this.sendViaWhatsApp(listRawText, phoneNumber);
  }

  getTotalPrice(): string {
    let total: number = 0;
    this.productList.forEach((prod) => {
      total += +prod.price;
    });
    return total.toFixed(2);
  }

  transformProductToRawTextMiltiline(productList: IProduct[]): string {
    const tab: string = String.fromCodePoint(parseInt('9', 16));
    const breakLine: string = '\n';
    let orderRawTxt: string = '';
    let title: string = '';
    let subTitle: string = '';
    let totalPrice: string = '';
    const verticalPipe = ' ║ ';
    const corner = ' ╚> ';
    const priceGuideLine = ' · · · · · · · · · · · · · · · · ·  ';

    title = '🏁       *www.dametulista.com*       🏁' + breakLine;
    subTitle = '📝 *Boleta* :' + breakLine;
    totalPrice = `Total: *S/. ${this.getTotalPrice()}* 🤑` + breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt += breakLine;
    orderRawTxt +=
      '📌Productos ' +
      tab +
      tab +
      tab +
      tab +
      tab +
      tab +
      ' 💰Precio' +
      breakLine;

    productList.forEach((product, id) => {
      const multiplineProdName: string[] = this.formatProductNameTo20CharactersMiltipleLines(
        product.name
      );
      console.log(multiplineProdName);
      orderRawTxt += id + 1 + ')' + breakLine;
      multiplineProdName.forEach((line) => {
        orderRawTxt += verticalPipe + tab + line;
      });
      orderRawTxt += breakLine;
      orderRawTxt +=
        corner + priceGuideLine + 'S/.' + (+product.price).toFixed(2);
      orderRawTxt += breakLine;
      orderRawTxt += breakLine;
    });

    orderRawTxt += breakLine;
    orderRawTxt += totalPrice;
    orderRawTxt += breakLine;
    orderRawTxt += '       *Hecho con mucho ❤️ en 🇵🇪*       ' + breakLine;
    orderRawTxt += breakLine;

    return orderRawTxt;
  }

  transformProductToRawText(productList: IProduct[]): string {
    const tab: string = String.fromCodePoint(parseInt('9', 16));
    const breakLine: string = '\n';
    let orderRawTxt: string = '';
    let title: string = '';
    let subTitle: string = '';
    let totalPrice: string = '';

    title = '🏁       *www.dametulista.com*       🏁' + breakLine;
    subTitle = '📝 *Boleta* :' + breakLine;
    totalPrice = `Total: *S/. ${this.getTotalPrice()}* 🤑` + breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt += breakLine;
    orderRawTxt +=
      '📌Productos ' + tab + tab + tab + tab + ' 💰Precio' + breakLine;

    productList.forEach((product) => {
      orderRawTxt += tab + 'S/.' + (+product.price).toFixed(2) + breakLine;
    });

    orderRawTxt += breakLine;

    orderRawTxt += totalPrice;

    orderRawTxt += breakLine;

    orderRawTxt += '       *Hecho con mucho ❤️ en 🇵🇪*       ' + breakLine;
    orderRawTxt += breakLine;

    return orderRawTxt;
  }

  formatProductNameTo20CharactersMiltipleLines(productName: string): string[] {
    const maxLenTextByLine: number = 27;
    const breakLine = '\n';

    const arrWords = productName.split(' ');
    let bufferMultilineText: string[] = [];
    let tempLine = '';

    arrWords.forEach((word) => {
      if (tempLine.length + word.length < maxLenTextByLine) {
        tempLine += word + ' ';
      } else {
        tempLine += breakLine;
        bufferMultilineText.push(tempLine);
        tempLine = '';
        tempLine += word + ' ';
      }
    });
    // addinfg the left over words
    bufferMultilineText.push(tempLine);

    return bufferMultilineText;
  }

  // formatProductNameTo20Characters(term: string): string {

  //   const maxLenName: number = 27;
  //   const difErr = 2;
  //   const strFillCharacters = '  ';

  //   const threePointsLenght: number = 3;

  //   if (term == null || term == '') return;

  //   if (term.length < maxLenName) {
  //     //print null string
  //     const num = maxLenName - term.length;
  //     return term + this.getEmptyStr(num * 1) + strFillCharacters;
  //   }

  //   return term.slice(0, maxLenName + difErr) + strFillCharacters ;
  // }

  sendViaWhatsApp(textMessageOrder: string, phoneNumber: string): void {
    // find out how to paste it automatically in
    // whatsapp
    // const storePhoneNumber: string = "+51996821980";
    console.log('WHATASPP:', phoneNumber);
    let link = `//api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI(
      textMessageOrder
    )}`;
    if (environment.production) window.location.href = link;
  }

  getEmptyStr(num: number): string {
    let emptyStr = ' ';
    for (let i = 0; i < num; i++) {
      emptyStr += '. ';
    }
    return emptyStr;
  }

  openPhoneNumberModal(): void {
    this.dialogRef = this.matDialog.open(SelectPaymentMethodComponent, {
      width: '420px',
      data: {
        isFreeBill: true,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.sendBillTo('+51' + result.phoneNumber);
      }
    });
  }
}
