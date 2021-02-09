import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { environment } from 'src/environments/environment';

interface IProduct {
  id: string,
  name: string,
  price: string
}

@Component({
  selector: 'app-send-free-bill',
  templateUrl: './send-free-bill.component.html',
  styleUrls: ['./send-free-bill.component.sass']
})
export class SendFreeBillComponent implements OnInit {

  controls: FormArray;
  newProductForm: FormGroup;
  strTotalPrice: string;


  productList: IProduct[] = [];
  // productList: IProduct[] = [
  //   { id: "1", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "2", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "3", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "4", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "5", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "6", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "8", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "9", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "10", name: "Mazanas rojas chilenas", price: "10.80" },
  //   { id: "11", name: "Peras", price: "7.80" }
  // ]

  constructor(
    private fb: FormBuilder,
    private buyerNavegationStore: BuyerNavegationStore
  ) { }

  ngOnInit(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.freeBillView
    );

    this.newProductForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required]
    })

    const toGroups = this.productList.map(product => {
      return new FormGroup({
        id: new FormControl(product.id, Validators.required),
        name: new FormControl(product.name, Validators.required),
        price: new FormControl(product.price, Validators.required),
      });
    })
    this.controls = new FormArray(toGroups);
  }

  getControl(id: string, field: string): AbstractControl {
    const absCtrl = this.controls.controls.find(crtl => {
      if (crtl.value.id === id) {
        return crtl;
      }
    })
    return absCtrl.get(field);
  }

  updateField(id: string, field: string) {
    const control = this.getControl(id, field);

    let isPrice = (field === "price") ? true : false;
    console.log("object control", control);
    if (control.valid) {
      this.productList = this.productList.map(prod => {
        if (id === prod.id.toString()) {
          return {
            ...prod,
            [field]: isPrice ? (+control.value).toFixed(2) : control.value
          }
        }
        return prod;
      })
    }
  }

  addProduct(form: IProduct) {
    console.log("form:", form);
    const newEntity: IProduct = {
      id: Date.now().toString(),
      name: form.name,
      price: (+form.price).toFixed(2)
    }

    const newControl = new FormGroup({
      id: new FormControl(Date.now().toString()),
      name: new FormControl(form.name, Validators.required),
      price: new FormControl(form.price, Validators.required),
    });
    this.productList.push(newEntity);
    this.controls.push(newControl);

    this.newProductForm.reset();

  }

  deleteProduct(id: string) {
    this.productList = this.productList.filter((prod) => {
      if (prod.id !== id) {
        return prod;
      }
    });
  }

  sendBill() {
    const listRawText = this.transformProductToRawText(this.productList);
    console.log(listRawText);

    this.sendViaWhatsApp(listRawText, "+51996821980");
  }

  getTotalPrice(): string {
    let total: number = 0;
    this.productList.forEach(prod => {
      total += +prod.price
    });
    return total.toFixed(2);
  }

  transformProductToRawText(productList: IProduct[]): string {

    const tab: string = String.fromCodePoint(parseInt("9", 16));
    const breakLine: string = "\n";
    let orderRawTxt: string = "";
    let title: string = "";
    let subTitle: string = "";
    let totalPrice: string = "";

    title = "🏁       *www.dametulista.com*       🏁" + breakLine;
    subTitle = "📥 *Boleta* :" + breakLine;
    totalPrice = `Total: *S/. ${this.getTotalPrice()}* 🤑` + breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += breakLine;
    
    orderRawTxt += subTitle;
    orderRawTxt += breakLine;
    orderRawTxt += "📌Productos " + tab + tab + tab + " 💰Precio" + breakLine;
    orderRawTxt += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + breakLine;

    productList.forEach(product => {

      orderRawTxt += breakLine +

        this.formatProductNameTo20Characters(
          product.name
        ) + tab + tab +

        "S/." + (+product.price).toFixed(2)
    })

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    // [7:29 PM, 9/25/2020] Kevin Martell: 💰💳💸💵⚖️📥📤🛒📝✅💲✔️🟡🟢🔵🟣⚫⚪🟤🏁🏁🇵🇪🛵🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🌿🌱🌴🐓👍🤠🤝🙏👏
    // [7:30 PM, 9/25/2020] Kevin Martell: 📦✏️📝📌🛒
    orderRawTxt += "📝 *Detalles* :" + breakLine;
    orderRawTxt += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + breakLine;

    orderRawTxt += breakLine;

    orderRawTxt += totalPrice;

    orderRawTxt += breakLine;
    
    orderRawTxt += "       *Hecho con mucho ❤️ en 🇵🇪*       " + breakLine;
    orderRawTxt += breakLine;
    
    return orderRawTxt;
  }

  formatProductNameTo20Characters(term: string): string {

    const maxLenght: number = 18;
    const threePointsLenght: number = 3;

    if (term == null || term == "") return;

    if (term.length < maxLenght) {
      //print null string
      const num = maxLenght - term.length;
      return term + this.getEmptyStr(num);
    }

    return term.slice(0, maxLenght - threePointsLenght) + " . . .";

  }

  sendViaWhatsApp(textMessageOrder: string, phoneNumber: string): void {

    // find out how to paste it automatically in
    // whatsapp
    // const storePhoneNumber: string = "+51996821980";
    console.log("WHATASPP:", phoneNumber);
    let link = `//api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI(textMessageOrder)}`;
    if (environment.production)
      window.location.href = link;
  }

  getEmptyStr(num: number): string {
    let emptyStr = "";
    for (let i = 0; i < num; i++) {
      emptyStr += " .";
    }
    return emptyStr;
  }
}
