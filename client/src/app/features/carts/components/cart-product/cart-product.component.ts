import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { CartStore } from 'src/app/core/cart/services/cart.store';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass']
})
export class CartProductComponent implements OnInit {


  @Input() cartProduct: CartProduct;

  // constructor() { let cp = {
  //     categoryImageUrl: "../../../../../../assets/category-images/banana_seda.png",
  //     categoryName: "Platano",
  //     currency: "PEN",
  //     details: "",
  //     isBigSize: true,
  //     isInStock: true,
  //     isKilo: true,
  //     isMaturityDetails: true,
  //     isMediumSize: true,
  //     isOrganic: true,
  //     isSeasonal: true,
  //     isSmallSize: true,
  //     isUnit: true,
  //     maturityEatIn: "6 días",
  //     maturityImageUrl: "../../../../../../assets/maturity-images/banana_semi_inmature.png",
  //     maturityInfo: "../../../../../../assets/icons/icons8-información.svg",
  //     maturityLastFor: "+7 dias",
  //     maturityName: "Semi maduro",
  //     price: 2.6,
  //     quantity: 1,
  //     size: "",
  //     totalPrice: 2.6,
  //     varietyImageUrl: "../../../../../../assets/category-images/banana_seda.png",
  //     varietyName: "Seda",
  //     _id: "5ee7cd0f5c1a82faf689d6c6"
  //   };

  //   this.cartProduct = new CartProduct().deserialize(cp);
  
  // }

  ngOnInit(): void {
     
    
  }

}
