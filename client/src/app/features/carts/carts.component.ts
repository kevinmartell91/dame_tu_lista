import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Subscription } from 'rxjs';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { calculateCartTotalPrice } from 'src/app/core/cart/helpers/cart-helper';
import { MatDialog } from '@angular/material/dialog';
import { FillShippingAddressComponent } from './components/fill-shipping-address/fill-shipping-address.component';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { Order } from 'src/app/core/order/types/order';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { BuyerOrder } from "../../core/order/types/buyer-order";
import { PaymentOrder } from "../../core/order/types/payment-order";
import { ShippingOrder } from "../../core/order/types/shipping-order";
import { AddressOrder } from "../../core/order/types/address-order";
import { TrackingOrder } from 'src/app/core/order/types/tracking-order';
import { BuyerStore } from 'src/app/core/buyer/services/buyer.store';
import { Router } from '@angular/router';
import { CartProductDetailModalComponent  } from "./components/cart-product-detail-modal/cart-product-detail-modal.component";
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.sass']
})
export class CartsComponent implements OnDestroy {

  cartProducts: CartProduct[] = null ;
  favoriteRetilerSelected: Retailer;

  subscriptionCart: Subscription;
  subscriptionBuyer: Subscription;
  subscriptionFavoriteRetailerSelected: Subscription;

  maturityView: string;
  question: string;

  totalCartPrice: number = 0;
  totalCartPriceStr: string = "0.00";



  private dialogRef: any;

  buyer: Buyer;
  
  // variable for paymet method coming from payment method modal
  paymentMethodOrder: string = "";
  phoneNumberOrder: string = "";
  // variable for addressOrde method coming from  Address modal
  addressOrder: AddressOrder;

  isSetAddress: boolean = false;
  isSetPayMethod: boolean = false;

  place_order_message: string = "Ordenar";


  constructor(
    private buyerNavegationStore: BuyerNavegationStore,
    private cartStore: CartStore,
    private buyerStore: BuyerStore,
    private authenticationStore: AuthenticationStore,
    private orderStore: OrderStore,
    private matDialog: MatDialog,
    private router: Router
  ) { 

    this.init();
    this.initializeViewSettings();
    
  }
  
  init(): void {

    this.subscriptionCart = this.cartStore.shoppingCart$.subscribe(
      x => {
        this.cartProducts = x.products;
        // console.log("listening shoppingCart changes poloooo", this.cartProducts);
        this.totalCartPrice = calculateCartTotalPrice(this.cartProducts);
        // formating to two decimals and as a string
        this.totalCartPriceStr = this.totalCartPrice.toFixed(2);
      }
    )

    this.subscriptionFavoriteRetailerSelected = this.cartStore.favoriteRetailerSelected$.subscribe(
      x => {
        this.favoriteRetilerSelected = x;
        // console.log("listening favoriteRetilerSelected changes poloooo",this.favoriteRetilerSelected);
      }
    )


    this.subscriptionBuyer = this.authenticationStore.loginUser$.subscribe(
      y => {
         if( y.login_type == 'buyer') {
           this.buyer = new Buyer().deserialize(y.entity);
         }
      }
    )

    
  }

  ngOnDestroy(): void {

    this.subscriptionCart.unsubscribe();
    this.subscriptionBuyer.unsubscribe();

  }

  private initializeViewSettings(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.cartView
    );
    
    this.maturityView = STORE_CONFIG.view_type.cartView;
    this.question = STORE_CONFIG.question_view_type.cartView;

  }

  onCartProducDeleted(carProductDeleted: CartProduct):void {
    
    // set quantity to cero to be removed from cartProdcuts
    // a shortcut to romeve cartPrduct
    carProductDeleted.quantity = 0;
    this.cartStore.updateCart(carProductDeleted);
  }

  onCartProductUpdate(cartProductUpdate: CartProduct): void {

 
    this.cartProducts.filter( cp => {
      if(cp._id == cartProductUpdate._id) {
        cp = cartProductUpdate;
      }
    });

    // if cartProduct quatity is 0, 
    // then remove from cartProducts.
    // hadledby this updateCart method
    this.cartStore.updateCart(cartProductUpdate);

    // then update shopping-cart-total price, this is
    // done by the subscriber on the constructor of 
    // this file, then the subscriber in app.component.ts
    // will save in sessionStorage thanks to 
    // saveToTemporaryStorage. This method is called
    // when cartProducts is grather than 0, whic is the
    // case. So this will do the job. Update the 
    // shopping-cart total price and save in SessionStorage.

}

  submitOrder(): void {

    if( ! this.isSetAddress ) {
      this.openAddAddressModal();
    }
  }


  
  openAddAddressModal():void {
    this.dialogRef = this.matDialog.open(FillShippingAddressComponent, {
      width: '420px',
      data: {
        buyer: this.buyer
      }
    });

    this.dialogRef.afterClosed().subscribe( result => {

      if(result != undefined){
        
        this.addressOrder = new AddressOrder().deserialize(result);
        // console.log("Address KEVIN from Modal", this.addressOrder);
        this.openAddPayMethodModal();
      }

    });
  }


  openAddPayMethodModal():void {
    this.dialogRef = this.matDialog.open(SelectPaymentMethodComponent, {
      width: '420px'
    });

    this.dialogRef.afterClosed().subscribe( result => {
      
      if(result != undefined) {

        // console.log("pay method from Modal", result);
        this.paymentMethodOrder = result.paymentMethod;
        //setting code area
        this.phoneNumberOrder = "+51" + result.phoneNumber;
  
        // this.updatePlaceOrderMessage("Ahora ya puede ordenar");
        
        // show another view to say thanks for ordering
        // then catch this as a convetion in google analytics
        this.createOrderFromShoppingCart();
        
        // console.log("this.buyer updated", this.buyer);
  
        // this.updatePlaceOrderMessage("Su orden ya fue enviada");        
      }
    });
  }


  createOrderFromShoppingCart():void {

    /**
     * Populating the buyerOrder from this.buyer
     */
    let buyerOrder = new BuyerOrder();
    buyerOrder._id = this.buyer._id;
    buyerOrder.name = this.buyer.name;
    buyerOrder.email = this.buyer.email;
    buyerOrder.phoneNumber = this.phoneNumberOrder; 
    
    
    /**
     * Populating the addressOrder from this.buyer.address
     */
    let addressOrder = this.addressOrder;
    
    /**
     * Populating the trackingOrder
     */
    let trackingOrder =  new TrackingOrder();
    // trackingOrder.orderStatus.push(["generated_by_buyer", new Date()]);
    trackingOrder.driver_name= "";
    trackingOrder.trackingNumber = "";
    trackingOrder.estimatedDelivery= "Se entregará su delivery en las próximas tres horas. Gracias.";
    
    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = "";
    shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;
    
    
    /**
     * Populating the shippingOrder from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = calculateCartTotalPrice(this.cartProducts);
    
    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];
    this.cartProducts.forEach(cp => {
      cartProductOrder.push( new CartProductOrder().deserialize(cp));
    });
    
    // populate the order;
    let order = new Order();

    order.retailer_id = this.favoriteRetilerSelected._id;
    order.orderType = this.addressOrder.details != 'pickup' ? "delivery" : "pickup" ;
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;


    // console.log("genereteOrder ", typeof(order), JSON.stringify(order) );

    // place order DB
    this.orderStore.genereteOrder(order).subscribe( x => {
      this.clearCart();
      this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
    });

  }

  clearCart():void {
    this.cartStore.state.shoppingCart.products = [];
    let cartProductsEmpty = this.cartStore.state.shoppingCart.products;
    // console.log("cartProductsEmpty",cartProductsEmpty);
    this.cartStore.setCart(cartProductsEmpty);
  }

  updatePlaceOrderMessage(message: string): void {
    this.place_order_message = message;
  }

  saveAddressInBuyerAccount():void {

    this.buyerStore.updateBuyerAddress(this.buyer._id, this.addressOrder).subscribe(
      response => {
        // console.log("Se guardó su direccion como frecuente.");        
      }
    )    
  }


}
