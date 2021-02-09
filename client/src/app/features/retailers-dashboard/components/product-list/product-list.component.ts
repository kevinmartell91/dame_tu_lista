import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RetailerStore } from 'src/app/core/retailer/services/retailer.store';
import { Product } from 'src/app/core/retailer/types/product';

import { Subscription } from 'rxjs';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';


interface IProduct {
  _id?: string;
  categoryImageUrl?: string;
  categoryName?: string;
  varietyImageUrl?: string;
  varietyName?: string;
  currency?: string;
  price?: number;
  isSmallSize?: boolean;
  isMediumSize?: boolean;
  isBigSize?: boolean;
  isKilo?: boolean;
  isUnit?: boolean;
  isOrganic?: boolean;
  isSeasonal?: boolean;
  isMaturityDetails?: boolean;
  maturityImageUrl?: string;
  maturityName?: string;
  maturityInfo?: string;
  maturityEatIn?: string;
  maturityLastFor?: string;
  isInStock?: boolean;

  // quantity?: number;

}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit, OnDestroy {

  controls: FormArray;
  subscribe: Subscription;
  products: IProduct[] = null;


  constructor(
    private retailerStore: RetailerStore

  ) {

    this.subscribe = this.retailerStore.retailer$.subscribe(
      retailer => {
        if (retailer) {
          this.products = retailer.store.productsList;
          this.initFormArray();
          // console.log("PRODUCTS", this.products);
        }
      }
    )

  }
  ngOnInit() { }

  initFormArray(): void {

    if (this.products) {

      const toGroups = this.products.map(product => {
        return new FormGroup({
          _id: new FormControl(product._id, Validators.required),
          categoryImageUrl: new FormControl(product.categoryImageUrl),
          categoryName: new FormControl(product.categoryName),
          varietyImageUrl: new FormControl(product.varietyImageUrl),
          varietyName: new FormControl(product.varietyName),
          currency: new FormControl(product.currency),
          price: new FormControl(product.price),
          isSmallSize: new FormControl(product.isSmallSize),
          isMediumSize: new FormControl(product.isMediumSize),
          isBigSize: new FormControl(product.isBigSize),
          isKilo: new FormControl(product.isKilo),
          isUnit: new FormControl(product.isUnit),
          isOrganic: new FormControl(product.isOrganic),
          isSeasonal: new FormControl(product.isSeasonal),
          isMaturityDetails: new FormControl(product.isMaturityDetails),
          maturityImageUrl: new FormControl(product.maturityImageUrl),
          maturityName: new FormControl(product.maturityName),
          maturityInfo: new FormControl(product.maturityInfo),
          maturityEatIn: new FormControl(product.maturityEatIn),
          maturityLastFor: new FormControl(product.maturityLastFor),
          isInStock: new FormControl(product.isInStock),

        });
      });
      this.controls = new FormArray(toGroups);
    }
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getControl(index: number, field: string): AbstractControl {
    return this.controls.at(index).get(field);
  }

  updateField(index: number, field: string) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.products = this.products.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value,
          }
        }
        return e;
      })
    }
  }

  saveProductAllAtOnce() {
    // const loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
    // const retailer_id = loginUserLocalStorage.entity._id;
    // this.retailerStore.updateRetailerStoreProductList(retailer_id, this.controls.value).subscribe(
    //   response => {
    //     console.log("saveProductAllAtOnce - response", response.data.store.productsList);
    //     this.products = response.data.store.productsList
    //   }
    // );

    this.addProduct();
  }

  addProduct( ){
    let newProd = new Product();
    newProd.categoryName = "kevin"; 
    this.products.push(newProd);
  }

  deleteProducto(id){
  
    this.products = this.products.filter((prod) => {
      if(prod._id !== id){
        return prod;
      }
    });
    console.log("this.products", id,this.products);
  }
}

