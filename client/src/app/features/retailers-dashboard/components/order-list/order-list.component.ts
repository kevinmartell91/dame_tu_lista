import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/order/types/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  isMobileView: boolean;
  isOrderCompleted: boolean = false;

  data: any = [ 
    {
      "shipping": {
          "buyer": {
              "_id": "5ef6864931826751d3990ef1",
              "name": "fabrizio",
              "email": "fabrizio@gmail.com",
              "phoneNumber": "(310) 849-0454"
          },
          "address": {
              "streetName": "Calle san juan de miraflores",
              "district": "BREÑA",
              "city": "LIM",
              "department": "LIM",
              "country": "PE",
              "reference": "parque",
              "details": "caceta"
          },
          "tracking": {
              "orderStatus": [
                  [
                      "generated_by_buyer",
                      "1594073978090"
                  ]
              ],
              "driver_name": "",
              "trackingNumber": "",
              "estimatedDelivery": "Se entregaraá su delivery en las próimas tres horas"
          },
          "deliveryNotes": ""
      },
      "payment": {
          "method": "bank_deposit",
          "amount": 5.8
      },
      "createdOn": "2020-07-06T22:19:16.528Z",
      "_id": "5f03a37ad0112b107fd53dc1",
      "retailer_id": "5ef680fb48c26d4f223c9d66",
      "cart": [
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4c8",
              "categoryImageUrl": "assets/testDataStore/categoria_nectarine.jpg",
              "categoryName": "nectarine",
              "varietyImageUrl": "assets/testDataStore/nectarine.jpg",
              "varietyName": "normal",
              "currency": "PEN",
              "price": 10,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.5,
              "size": "",
              "details": "",
              "totalPrice": 5
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4c7",
              "categoryImageUrl": "assets/testDataStore/categoria_platano.jpg",
              "categoryName": "plátano",
              "varietyImageUrl": "assets/testDataStore/platano_seda_organico_selecta.jpg",
              "varietyName": "seda selecta",
              "currency": "PEN",
              "price": 0.8,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": true,
              "isKilo": false,
              "isUnit": true,
              "isOrganic": true,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/platano_seda_organico_selecta_comer_ya.jpg",
              "maturityName": "Comer ya",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 1,
              "size": "",
              "details": "",
              "totalPrice": 0.8
          }
      ],
      "__v": 0
    },
    {
      "shipping": {
          "buyer": {
              "_id": "5ef6864931826751d3990ef1",
              "name": "fabrizio",
              "email": "fabrizio@gmail.com",
              "phoneNumber": "6282354949"
          },
          "address": {
              "streetName": "Calle san juan de miraflores",
              "district": "BREÑA",
              "city": "LIM",
              "department": "LIM",
              "country": "PE",
              "reference": "parque",
              "details": "caceta"
          },
          "tracking": {
              "orderStatus": [
                  [
                      "generated_by_buyer",
                      "1594074061074"
                  ]
              ],
              "driver_name": "",
              "trackingNumber": "",
              "estimatedDelivery": "Se entregaraá su delivery en las próimas tres horas"
          },
          "deliveryNotes": ""
      },
      "payment": {
          "method": "upon_delivery_cash",
          "amount": 32.35
      },
      "createdOn": "2020-07-06T22:19:16.528Z",
      "_id": "5f03a3cdd0112b107fd53dc2",
      "retailer_id": "5ef680fb48c26d4f223c9d66",
      "cart": [
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4dd",
              "categoryImageUrl": "assets/testDataStore/categoria_aguaymanto.jpg",
              "categoryName": "aguaymanto",
              "varietyImageUrl": "assets/testDataStore/aguaymanto_rubias.jpg",
              "varietyName": "rubias",
              "currency": "PEN",
              "price": 10,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.5,
              "size": "",
              "details": "",
              "totalPrice": 5
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4de",
              "categoryImageUrl": "assets/testDataStore/categoria_mandarina.jpg",
              "categoryName": "mandarina",
              "varietyImageUrl": "assets/testDataStore/mandarina_niños_sp.jpg",
              "varietyName": "para niños s/p",
              "currency": "PEN",
              "price": 3.5,
              "isSmallSize": true,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.25,
              "size": "",
              "details": "",
              "totalPrice": 0.88
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4df",
              "categoryImageUrl": "assets/testDataStore/categoria_platano.jpg",
              "categoryName": "plátano",
              "varietyImageUrl": "assets/testDataStore/platano_bizcocho.jpg",
              "varietyName": "bizcocho",
              "currency": "PEN",
              "price": 0.8,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": true,
              "isKilo": false,
              "isUnit": true,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 1,
              "size": "",
              "details": "",
              "totalPrice": 0.8
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e0",
              "categoryImageUrl": "assets/testDataStore/categoria_durazno.jpg",
              "categoryName": "durazno",
              "varietyImageUrl": "assets/testDataStore/durazno.jpg",
              "varietyName": "normal",
              "currency": "PEN",
              "price": 6,
              "isSmallSize": false,
              "isMediumSize": true,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.25,
              "size": "",
              "details": "",
              "totalPrice": 1.5
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e1",
              "categoryImageUrl": "assets/testDataStore/categoria_mango.jpg",
              "categoryName": "mango",
              "varietyImageUrl": "assets/testDataStore/mango_edward_selecta.jpg",
              "varietyName": "edward selecta",
              "currency": "PEN",
              "price": 7,
              "isSmallSize": false,
              "isMediumSize": true,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.25,
              "size": "",
              "details": "",
              "totalPrice": 1.75
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e2",
              "categoryImageUrl": "assets/testDataStore/categoria_aceituna.jpg",
              "categoryName": "aceituna",
              "varietyImageUrl": "assets/testDataStore/aceituna_botija.jpg",
              "varietyName": "botija",
              "currency": "PEN",
              "price": 12,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.25,
              "size": "",
              "details": "",
              "totalPrice": 3
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e3",
              "categoryImageUrl": "assets/testDataStore/categoria_piña.jpg",
              "categoryName": "piña",
              "varietyImageUrl": "assets/testDataStore/piña_golden.jpeg",
              "varietyName": "golden",
              "currency": "PEN",
              "price": 4,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": true,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.25,
              "size": "",
              "details": "",
              "totalPrice": 1
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e4",
              "categoryImageUrl": "assets/testDataStore/categoria_mango.jpg",
              "categoryName": "mango",
              "varietyImageUrl": "assets/testDataStore/mango_kent.jpg",
              "varietyName": "kent",
              "currency": "PEN",
              "price": 3.5,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 0.75,
              "size": "",
              "details": "",
              "totalPrice": 2.63
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e5",
              "categoryImageUrl": "assets/testDataStore/categoria_platano.jpg",
              "categoryName": "plátano",
              "varietyImageUrl": "assets/testDataStore/platano_seda_organico_selecta.jpg",
              "varietyName": "seda selecta",
              "currency": "PEN",
              "price": 0.8,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": true,
              "isKilo": false,
              "isUnit": true,
              "isOrganic": true,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/platano_seda_organico_selecta_inmaduro.jpg",
              "maturityName": "Inmaduro",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 1,
              "size": "",
              "details": "",
              "totalPrice": 0.8
          },
          {
              "isCheckedDone": false,
              "_id": "5ef95cff34b5f25a9e4eb4e6",
              "categoryImageUrl": "assets/testDataStore/categoria_palta.jpg",
              "categoryName": "palta",
              "varietyImageUrl": "assets/testDataStore/palta_de_primera_cremosa.jpg",
              "varietyName": "de primera cremosa",
              "currency": "PEN",
              "price": 12,
              "isSmallSize": false,
              "isMediumSize": false,
              "isBigSize": false,
              "isKilo": true,
              "isUnit": false,
              "isOrganic": false,
              "isSeasonal": true,
              "isMaturityDetails": true,
              "maturityImageUrl": "assets/testDataStore/undefined",
              "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
              "maturityEatIn": "4",
              "maturityLastFor": "6",
              "isInStock": true,
              "quantity": 1.25,
              "size": "",
              "details": "",
              "totalPrice": 15
          }
      ],
      "__v": 0
    }
  ];

  orders: Order[] = []; 
  
  constructor() { }

  ngOnInit(): void {
    this.isMobileView = true;


    //get mock data 
    this.data.forEach(order => {
      this.orders.push( new Order().deserialize(order));
    });

  }

  onIsProductOrderCompleted(data: any): void{
    
    this.orders.forEach(order => {
      if( data.order_id == order._id) {
        console.log("LISTENING => this.isOrderCompleted", data.order_id, order._id);
        order.cart.filter( productOrder => {
          if( productOrder._id == data.cartProductOrder_id ) {
            productOrder.isCheckedDone = !productOrder.isCheckedDone;
            console.log("Maeched => ", productOrder.isCheckedDone);
          }
          //looping again looking if the priducts are checkDone 
          this.isOrderCompleted = order.cart.every( p => p.isCheckedDone);
          console.log("this.isOrderCompleted",this.isOrderCompleted);
        })
      }

    });


  }

  setNextOrderStatus (order_id: string): void {
    console.log("setNextOrderStatus", order_id);
  }

}
