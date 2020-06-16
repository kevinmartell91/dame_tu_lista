import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from "../../../../core/retailer/types/retailer";
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from "../../helpers/buyerNavegation.helper";
import { RetailerStoreStore } from '../../services/retailer.store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
        "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "isMaturityDetails": false,
            "maturityImageUrl": "../../../assets/maturity-images/banana_mature.png",
            "maturityName": "Maduro",
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
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
            "isMaturityDetails": false,
            "maturityImageUrl": "../../../assets/maturity-images/banana_comer_ya.png",
            "maturityName": "Comer ya",
            "maturityInfo": "../../../../assets/icons/icons8-información.svg",
            "maturityEatIn": "1 días",
            "maturityLastFor": "+2 dias",
            "isInStock": true
        }
      ]
    }
  }


  // public retailer: Retailer = new Retailer().deserialize(this.DATA); 
  public retailer: Retailer;
  public productsList: Product[];

  constructor( 
    private router: Router,
    private location: Location,
    private platformLocation: PlatformLocation,
    private buyerNavegationStore: BuyerNavegationStore,
    private retailerStoreStore: RetailerStoreStore

  ) { 

    this.retailerStoreStore.retailer$.subscribe(
      x => {
        this.retailer = x;
        this.productsList = x.store.productsList;
        console.log("StoreComponent => retailer$.subscribe");
        
      }
    )

    this.blockBrowserBackButton();    
  }

  ngOnInit(): void {
  }

  viewBuyerCart(): void {
    this.router.navigate(['/buyer-cart']);
  }

  goBackToBuyerAccount(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView
    );
    this.location.back();
  }

  goToRetailerCategoryView(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.categoryView
    );
    this.router.navigate(['/retailer-store',this.retailer._id,'category-view']);
  }

  blockBrowserBackButton():void {
    this.platformLocation.onPopState(() => {
      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.accountView
      );
    })
  }

}
