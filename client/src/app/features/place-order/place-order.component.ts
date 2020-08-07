import { Component, EventEmitter, Output } from '@angular/core';
import { ProductDetail } from './types/product-detail';


// import orders  from '../../../assets/mocked-data/orders.json';

 export interface Tile {
  color: string;
  background: string;
  cols: number;
  rows: number;
  text: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.sass'],
})
export class PlaceOrderComponent {

  @Output() productDisplayAddedDoneEmmit = new EventEmitter<boolean>();

  img_url = `url(../../../assets/fruit-images/platano.jpeg)`;

  // data = 'assets/mocked-data/orders.json';
  
  orders: any = [
    {   
        "stage": "1 => order_generated",
        "_id": "1",
        "order_num": "0001",
        "order_package_color": "rojo",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 0,
                "isPackaged": false
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 0,
                "isPackaged": false
            }
        ],
        "total_price" : 0,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"}
        ],

        "buyer_id" : "001",
        "buyer_name" : "Antony Centeno",
        "buyer_address": {
            "street": "Av. Arequipa",
            "number" : 4545,
            "district": "Lince",
            "country": "PE"
        },
        "buyer_phone" : "906541650"
    },
    {   
        "stage": "2 => seen_by_retailer",
        "_id": "2",
        "order_num": "0002",
        "order_package_color": "verde",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 0,
                "isPackaged": false
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 0,
                "isPackaged": false
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 0,
                "isPackaged": false
            }
        ],
        "total_price" : 0,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"}
        ],
        

        "buyer_id" : "002",
        "buyer_name" : "Alex Mendoza",
        "buyer_address": {
            "street": "Av. la Fontana",
            "number" : 566,
            "district": "La Molina",
            "country": "PE"
        },
        "buyer_phone" : "996829180"
        
    },
    {
        "stage": "3 => packaged_buy_retailer",
        "_id": "3",
        "order_num": "0003",
        "order_package_color": "blanco",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"}
        ],
        
        
        "buyer_id" : "003",
        "buyer_name" : "Rosario Moya",
        "buyer_address": {
            "street": "Calle Danta",
            "number" : 109,
            "district": "Surquillo",
            "country": "PE"
        },
        "buyer_phone" : "976789480"
        
    },
    {
        "stage": "4 => received_by_driver",
        "_id": "4",
        "order_num": "0004",
        "order_package_color": "rosado",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"}
        ],
        
        
        "buyer_id" : "004",
        "buyer_name" : "Karla Beltran",
        "buyer_address": {
            "street": "Av. Panamericana",
            "number" : 7120,
            "district": "Comas",
            "country": "PE"
        },
        "buyer_phone" : "902033570"
        
    },
    {
        "stage": "5 => delivering_by_driver",
        "_id": "5",
        "order_num": "0005",
        "order_package_color": "amarillo",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 86.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"},
            {"delivering_by_driver" : true, "date" : "2020-02-10T11:50:57.240Z"}
        ],
        
        
        "buyer_id" : "005",
        "buyer_name" : "Tomas",
        "buyer_address": {
            "street": "Av. Bolivar",
            "number" : 167,
            "district": "Pueblo Libre",
            "country": "PE"
        },
        "buyer_phone" : "936183654"
        
    },
    {
        "stage": "6 => delivered_by_driver",
        "_id": "6",
        "order_num": "0006",
        "order_package_color": "amarillo",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"},
            {"delivering_by_driver" : true, "date" : "2020-02-10T11:50:57.240Z"},
            {"delivered_by_driver" : true, "date" : "2020-02-10T12:24:57.240Z"}
        ],
        
        
        "buyer_id" : "007",
        "buyer_name" : "Rosa",
        "buyer_address": {
            "street": "Av. Larco",
            "number" : 222,
            "district": "Miraflores",
            "country": "PE"
        },
        "buyer_phone" : "965245746"
        
    },
    {
        "stage": "7.1 => paid_to_driver: true",
        "_id": "7.1",
        "order_num": "0007",
        "order_package_color": "amarillo",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"},
            {"delivering_by_driver" : true, "date" : "2020-02-10T11:50:57.240Z"},
            {"delivered_by_driver" : true, "date" : "2020-02-10T12:24:57.240Z"},
            {"paid_to_driver" : true, "date" : "2020-02-10T12:30:57.240Z"}
        ],
        
        
        "buyer_id" : "008",
        "buyer_name" : "Cristina Chang",
        "buyer_address": {
            "street": "Calle Carrion",
            "number" : 120,
            "district": "San Borja",
            "country": "PE"
        },
        "buyer_phone" : "936478730"
        
    },
    {
        "stage": "7.2 => paid_to_driver: false",
        "_id": "7.2",
        "order_num": "0008",
        "order_package_color": "rojo",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"},
            {"delivering_by_driver" : true, "date" : "2020-02-10T11:50:57.240Z"},
            {"delivered_by_driver" : true, "date" : "2020-02-10T12:24:57.240Z"},
            {"paid_to_driver" : false, "date" : "2020-02-10T12:30:57.240Z"}
        ],
        
        
        "buyer_id" : "007",
        "buyer_name" : "kevin Martell",
        "buyer_address": {
            "street": "Calle Balizario Suarez",
            "number" : 120,
            "district": "San Borja",
            "country": "PE"
        },
        "buyer_phone" : "996829180"
        
    },
    {
        "stage": "8 => order_finished",
        "_id": "8",
        "order_num": "0009",
        "order_package_color": "verde",
        "product_list" : [
            {
                "url_img": "url(../../../../../assets/fruit-images/papaya.png",
                "name": "Papaya",
                "type": "Tainung",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : 3,
                "weight": "",
                "price": 8,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/mandarina.png",
                "name": "Madarina",
                "type": "Clementinas",
                "size": "Medianas",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "2 Kg",
                "price": 5,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/uva.png",
                "name": "Uva",
                "type": "-",
                "size": "Grande",
                "last_for" : "1 semana",
                "quantity" : -9999,
                "weight": "3 Kg",
                "price": 18,
                "isPackaged": true
            },

            {
                "url_img": "url(../../../../../assets/fruit-images/palta.png",
                "name": "Palta",
                "type": "Fuerte",
                "size": "Grandes",
                "last_for" : "1 semana",
                "quantity" : 7,
                "weight": "",
                "price": 13,
                "isPackaged": true
            },
            {
                "url_img": "url(../../../../../assets/fruit-images/platano.jpeg",
                "name": "Plátanos",
                "type": "-",
                "size": "Mediano",
                "last_for" : "03 días",
                "quantity" : -9999,
                "weight": "1 Kg",
                "price": 2.5,
                "isPackaged": true
            }
        ],
        "total_price" : 46.50,
        "order_status" : [
            {"order_generated" : true, "date" : "2020-02-10T10:50:57.240Z"},
            {"seen_by_retailer" : true, "date" : "2020-02-10T11:00:57.240Z"},
            {"packaged_buy_retailer" : true, "date" : "2020-02-10T11:30:57.240Z"},
            {"received_by_driver" : true, "date" : "2020-02-10T11:40:57.240Z"},
            {"delivering_by_driver" : true, "date" : "2020-02-10T11:50:57.240Z"},
            {"delivered_by_driver" : true, "date" : "2020-02-10T12:24:57.240Z"},
            {"paid_to_driver" : true, "date" : "2020-02-10T12:30:57.240Z"},
            {"order_finished" : true, "date" : "2020-02-10T10:50:57.240Z"}
        ],
        
        
        "buyer_id" : "009",
        "buyer_name" : "Anita Vico",
        "buyer_address": {
            "street": "Calle Dante ",
            "number" : 101,
            "district": "San Isidro",
            "country": "PE"
        },
        "buyer_phone" : "959549995"
        
    }
  ]

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue', background: this.img_url},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen', background: this.img_url},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink', background: this.img_url},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1', background: this.img_url},
  ];


  productDisplay: ProductDetail;

  panelOpenState = true;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(  ) {
  }



  getProductDisplay(productDisplay: ProductDetail){
    this.productDisplay = productDisplay;
    // console.log("productDisplay => ",productDisplay);
    
    // end a notification that productDisplay was gotten
    // in order to move out the displayDitailComponent called 
    // in  productDisplayComponent and finally clear the 
    // the former fields(displayDetail component).

    // First notify to ProductDisplay  TO 
    this.productDisplayAddedDoneEmmit.emit(true);
  }
  

}