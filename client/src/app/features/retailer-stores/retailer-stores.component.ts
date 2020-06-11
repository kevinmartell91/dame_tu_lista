import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/types/product';
import { Retailer } from "../../core/retailer/types/retailer";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';

@Component({
  selector: 'app-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.sass']
})
export class RetailerStoresComponent implements OnInit {


  retailerstoreProducts: any[] = [
    {
        "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
        "varietyName": "Seda",
        "currency": "PEN",
        "price": 2.5,
        "isSmallSize": true,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": true,
        "isUnit": false,
        "isOrganic": true,
        "isSeasonal": true,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_inmature.png",
        "maturityName": "Inmaduro",
        "maturityInfo": "🍏",
        "maturityEatIn": "7 días",
        "maturityLastFor": "+10 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
        "varietyName": "Seda",
        "currency": "PEN",
        "price": 2.6,
        "isSmallSize": true,
        "isMediumSize": true,
        "isBigSize": true,
        "isKilo": true,
        "isUnit": true,
        "isOrganic": true,
        "isSeasonal": true,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_semi_inmature.png",
        "maturityName": "Semi maduro",
        "maturityInfo": "🍏",
        "maturityEatIn": "6 días",
        "maturityLastFor": "+7 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
        "varietyName": "Seda",
        "currency": "PEN",
        "price": 2.7,
        "isSmallSize": false,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": false,
        "isUnit": false,
        "isOrganic": false,
        "isSeasonal": true,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_mature.png",
        "maturityName": "Maduro",
        "maturityInfo": "🍏",
        "maturityEatIn": "3 días",
        "maturityLastFor": "+5 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
        "varietyName": "Seda",
        "currency": "PEN",
        "price": 2.8,
        "isSmallSize": false,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": false,
        "isUnit": false,
        "isOrganic": false,
        "isSeasonal": true,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
        "maturityName": "Comer ya",
        "maturityInfo": "🍏",
        "maturityEatIn": "1 día",
        "maturityLastFor": "+4 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_isla.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_isla.png", 
        "varietyName": "Isla",
        "currency": "PEN",
        "price": 3.5,
        "isSmallSize": true,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": true,
        "isUnit": false,
        "isOrganic": true,
        "isSeasonal": false,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_mature.png",
        "maturityName": "Maduro",
        "maturityInfo": "🍏",
        "maturityEatIn": "3 días",
        "maturityLastFor": "+4 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_isla.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_isla.png", 
        "varietyName": "Isla",
        "currency": "PEN",
        "price": 3.6,
        "isSmallSize": false,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": false,
        "isUnit": false,
        "isOrganic": false,
        "isSeasonal": false,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
        "maturityName": "Comer ya",
        "maturityInfo": "🍏",
        "maturityEatIn": "1 día",
        "maturityLastFor": "+4 dias",
        "isInStock": true
    },
    {
        "categoryImageUrl": "../../../assets/category-images/banana_bizcocho.png",
        "categoryName": "Platano",
        "varietyImageUrl": "../../../assets/category-images/banana_bizcocho.png", 
        "varietyName": "Bizcocho",
        "currency": "PEN",
        "price": 4.5,
        "isSmallSize": true,
        "isMediumSize": true,
        "isBigSize": false,
        "isKilo": true,
        "isUnit": false,
        "isOrganic": true,
        "isSeasonal": true,
        "isMaturityDetails": true,
        "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
        "maturityName": "Comer ya",
        "maturityInfo": "🍏",
        "maturityEatIn": "1 días",
        "maturityLastFor": "+2 dias",
        "isInStock": true
    }
  ]

  DATA: any = {
    username : "Keyla5431",
    password: "demo",
    name: "keyla Diana",
    lastname: "Romero Diaz",
    email: "keyla@gmail.com",
    phoneNumber: "8348984",
    store: {
      name: "La tienda de Keyla",
      imgUrl: "../../../assets/fruit-images/fruits_portal_img.jpg",
      isDeliveryService: true,
      isPickUpService: true,
      deliveryInfo: "12 hrs - 15 hrs",
      pickUpInfo: "09 hrs - 13 hrs",
      address: {
        streetName: "Belisario Suares",
        streetnumber: "167",
        district: "San Borja",
        city: "Lima",
        department: "LIM",
        country: "PE",
        reference: "reference XYZ",
        details: "details XYZ"
      },
      productsList: [
        {
            "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
            "varietyName": "Seda",
            "currency": "PEN",
            "price": 2.5,
            "isSmallSize": true,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": true,
            "isUnit": false,
            "isOrganic": true,
            "isSeasonal": true,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_inmature.png",
            "maturityName": "Inmaduro",
            "maturityInfo": "🍏",
            "maturityEatIn": "7 días",
            "maturityLastFor": "+10 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
            "varietyName": "Seda",
            "currency": "PEN",
            "price": 2.6,
            "isSmallSize": true,
            "isMediumSize": true,
            "isBigSize": true,
            "isKilo": true,
            "isUnit": true,
            "isOrganic": true,
            "isSeasonal": true,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_semi_inmature.png",
            "maturityName": "Semi maduro",
            "maturityInfo": "🍏",
            "maturityEatIn": "6 días",
            "maturityLastFor": "+7 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
            "varietyName": "Seda",
            "currency": "PEN",
            "price": 2.7,
            "isSmallSize": false,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": false,
            "isUnit": true,
            "isOrganic": false,
            "isSeasonal": true,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_mature.png",
            "maturityName": "Maduro",
            "maturityInfo": "🍏",
            "maturityEatIn": "3 días",
            "maturityLastFor": "+5 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_seda.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_seda.png", 
            "varietyName": "Seda",
            "currency": "PEN",
            "price": 2.8,
            "isSmallSize": false,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": true,
            "isUnit": false,
            "isOrganic": false,
            "isSeasonal": true,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
            "maturityName": "Comer ya",
            "maturityInfo": "🍏",
            "maturityEatIn": "1 día",
            "maturityLastFor": "+4 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_isla.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_isla.png", 
            "varietyName": "Isla",
            "currency": "PEN",
            "price": 3.5,
            "isSmallSize": true,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": true,
            "isUnit": false,
            "isOrganic": true,
            "isSeasonal": false,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_mature.png",
            "maturityName": "Maduro",
            "maturityInfo": "🍏",
            "maturityEatIn": "3 días",
            "maturityLastFor": "+4 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_isla.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_isla.png", 
            "varietyName": "Isla",
            "currency": "PEN",
            "price": 3.6,
            "isSmallSize": false,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": false,
            "isUnit": false,
            "isOrganic": false,
            "isSeasonal": false,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
            "maturityName": "Comer ya",
            "maturityInfo": "🍏",
            "maturityEatIn": "1 día",
            "maturityLastFor": "+4 dias",
            "isInStock": true
        },
        {
            "categoryImageUrl": "../../../assets/category-images/banana_bizcocho.png",
            "categoryName": "Platano",
            "varietyImageUrl": "../../../assets/category-images/banana_bizcocho.png", 
            "varietyName": "Bizcocho",
            "currency": "PEN",
            "price": 4.5,
            "isSmallSize": true,
            "isMediumSize": true,
            "isBigSize": false,
            "isKilo": true,
            "isUnit": false,
            "isOrganic": true,
            "isSeasonal": true,
            "isMaturityDetails": true,
            "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
            "maturityName": "Comer ya",
            "maturityInfo": "🍏",
            "maturityEatIn": "1 días",
            "maturityLastFor": "+2 dias",
            "isInStock": true
        }
      ]
    }
  }

  public retailer: Retailer = new Retailer().deserialize(this.DATA); 

  constructor( 
    private router: Router,
    private location: Location,
    private buyerNavegationStore: BuyerNavegationStore ) { }

  ngOnInit(): void {
    console.log("KEVIN => retailer", this.retailer.store.productsList );
  }

  viewBuyerCart(): void {
    this.router.navigate(['/buyer-cart']);
  }

  goBackToBuyerAccount(): void {
    this.location.back();
  }

  goToRetailerCategoryView(): void {
    let buyerNavegation = this.buyerNavegationStore.state.buyerNavegation;
    buyerNavegation.typeView = BUYER_CONFIG.navegation.categoryView;
    this.buyerNavegationStore.setNewState(buyerNavegation);
    this.router.navigate(['/category-view']);
  }

}
