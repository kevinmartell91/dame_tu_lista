import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerStore } from 'src/app/core/buyer/services/buyer.store';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { calculateCartTotalPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { Order } from 'src/app/core/order/types/order';
import { TrackingOrder } from 'src/app/core/order/types/tracking-order';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { AddressOrder } from "../../core/order/types/address-order";
import { BuyerOrder } from "../../core/order/types/buyer-order";
import { PaymentOrder } from "../../core/order/types/payment-order";
import { ShippingOrder } from "../../core/order/types/shipping-order";
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { FillShippingAddressComponent } from './components/fill-shipping-address/fill-shipping-address.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { RetailerStoreStore } from '../retailer-stores/services/retailer.store';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.sass']
})
export class CartsComponent implements OnDestroy {

  cartProducts: CartProduct[] = null;
  retailerStore: Retailer;

  subscriptionCart: Subscription;
  subscriptionBuyer: Subscription;

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

  place_order_message: string = "Enviar por WhatsApp";
  isOrderPushed: boolean = false;

  currentUser: string = "";


  constructor(
    private buyerNavegationStore: BuyerNavegationStore,
    private cartStore: CartStore,
    private buyerStore: BuyerStore,
    private authenticationStore: AuthenticationStore,
    private orderStore: OrderStore,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {

    const currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
    if (currentUser) {
      this.currentUser = currentUser;

    }

    this.init();
    this.initializeViewSettings();

    console.log("isOrderPushed:", this.isOrderPushed);

  }


  init(): void {

    this.subscriptionCart = this.cartStore.shoppingCart$.subscribe(
      x => {
        this.cartProducts = x.products;
        console.log("this.cartProducts ", this.cartProducts);

        this.totalCartPrice = calculateCartTotalPrice(this.cartProducts);
        // formating to two decimals and as a string
        this.totalCartPriceStr = this.totalCartPrice.toFixed(2);
      }
    )


    this.subscriptionBuyer = this.authenticationStore.loginUser$.subscribe(
      y => {
        if (y !== null && y.login_type == 'buyer') {
          this.buyer = new Buyer().deserialize(y.entity);
        }
      }
    )



  }

  ngOnDestroy(): void {

    this.subscriptionCart.unsubscribe();
    this.subscriptionBuyer.unsubscribe();

  }

  // *******************************************************
  // Cart methohds
  // *******************************************************

  private initializeViewSettings(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.cartView
    );

    this.maturityView = STORE_CONFIG.view_type.cartView;
    this.question = STORE_CONFIG.question_view_type.cartView;

  }

  onCartProducDeleted(carProductDeleted: CartProduct): void {

    // set quantity to cero to be removed from cartProdcuts
    // a shortcut to romeve cartPrduct
    carProductDeleted.quantity = 0;
    this.cartStore.updateCart(carProductDeleted);
  }

  onCartProductUpdate(cartProductUpdate: CartProduct): void {


    this.cartProducts.filter(cp => {
      if (cp._id == cartProductUpdate._id) {
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

    if (!this.isSetAddress) {
      this.openAddAddressModal();
    }
  }

  // completeOrderDetails works only for buyer pipe line
  completeOrderDetails(): void {

    if(this.currentUser){
      let order = this.createOrderFromShoppingCart();
      this.updatePlaceOrderMessage("Cotización enviada");

    }else {
      
          if (!this.isSetAddress) {
            this.openAddAddressModal();
          }

    }

  }

  sendInvoiceToBuyer(){
    console.log("sendInvoiceToBuyer");
    this.openAddPayMethodModal();
  }

  openAddAddressModal(): void {
    this.dialogRef = this.matDialog.open(FillShippingAddressComponent, {
      width: '420px',
      data: {
        buyer: this.buyer
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {

        this.addressOrder = new AddressOrder().deserialize(result);
        this.openAddPayMethodModal();
      }

    });
  }

  openAddPayMethodModal(): void {
    this.dialogRef = this.matDialog.open(SelectPaymentMethodComponent, {
      width: '420px'
    });

    this.dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {

        this.paymentMethodOrder = result.paymentMethod;
        //setting code area
        this.phoneNumberOrder = "+51" + result.phoneNumber;

        // this.updatePlaceOrderMessage("Ahora ya puede ordenar");

        // show another view to say thanks for ordering
        // then catch this as a convetion in google analytics

        let order = null;
        if(this.currentUser){
          order = this.createInvoiceFromShoppingCart();
        }
        else {
          order = this.createOrderFromShoppingCart();
        }

        if (order != null) {

          console.log("Order placed Successfuly");


          // console.log("createOrderFromShoppingCart in BD", order);
          // const orderRawText = this.transformOrderToRawText(order);
          // this.sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);
          this.isOrderPushed = true;

          this.updatePlaceOrderMessage("Su orden ya fue enviada");
        }
        // else {
        //   this.updatePlaceOrderMessage("Envie nuevamente su ordenr");        

        // }

      }
    });
  }

  createInvoiceFromShoppingCart(): Order {


    let order = null;

    /**
     * Populating the buyerOrder from this.buyer
     */
    let buyerOrder = new BuyerOrder();
    // buyerOrder._id = this.buyer._id;
    // buyerOrder.name = this.buyer.name;
    // buyerOrder.email = this.buyer.email;
    buyerOrder.phoneNumber = this.phoneNumberOrder;


    /**
     * Populating the addressOrder from this.buyer.address
     */
    // let addressOrder = this.addressOrder;

    /**
     * Populating the trackingOrder
     */
    let trackingOrder = new TrackingOrder();
    // trackingOrder.orderStatus.push(["generated_by_buyer", new Date()]);
    trackingOrder.driver_name = "";
    trackingOrder.trackingNumber = "";
    trackingOrder.estimatedDelivery = "Se entregará su delivery en las próximas horas. Gracias.";

    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = "";
    // shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;


    /**
     * Populating the payment from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    // paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = calculateCartTotalPrice(this.cartProducts);

    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];

    this.cartProducts.forEach(cp => {
      cartProductOrder.push(new CartProductOrder().deserialize(cp));
    });

    // populate the order;
    order = new Order();

    order.retailer_id = localStorage.getItem("retailer_id");
    // order.orderType = this.addressOrder.details != 'pickup' ? "delivery" : "pickup";
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;


    // place order in DB
    this.orderStore.genereteOrder(order).subscribe(
      x => {

        if (x) {

          this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);


          console.log("createOrderFromShoppingCart in BD (callback as X)", x);

          // transform the order into raw text 
          const invoiceRawText = this.transformInvoiceIntoRawText(order);
          // and send it via whatapp
          // to the desired phone number


          // TO DO: with the order _id, it is posible to share the link of the order
          // TO DO:

          // if currentUser =>the seller can send invoice to customer phone number
    

          this.sendViaWhatsApp(invoiceRawText, order.shipping.buyer.phoneNumber);


          this.clearCart();
          this.removeTemporaryStorage();
          // this.router.navigate(['gracias-por-tu-compra'], { relativeTo: this.route });
        }

        // this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
        // this.router.navigate([`/carrito-personal/gracias-por-tu-compra`]);
      });
    return order;

  }
  
  createOrderFromShoppingCart(): Order {


    let order = null;

    /**
     * Populating the buyerOrder from this.buyer
     */
    let buyerOrder = new BuyerOrder();
    // buyerOrder._id = this.buyer._id;
    // buyerOrder.name = this.buyer.name;
    // buyerOrder.email = this.buyer.email;
    buyerOrder.phoneNumber = this.phoneNumberOrder;


    /**
     * Populating the addressOrder from this.buyer.address
     */
    let addressOrder = this.addressOrder;

    /**
     * Populating the trackingOrder
     */
    let trackingOrder = new TrackingOrder();
    // trackingOrder.orderStatus.push(["generated_by_buyer", new Date()]);
    trackingOrder.driver_name = "";
    trackingOrder.trackingNumber = "";
    trackingOrder.estimatedDelivery = "Se entregará su delivery en las próximas horas. Gracias.";

    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = "";
    shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;


    /**
     * Populating the payment from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = calculateCartTotalPrice(this.cartProducts);

    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];

    this.cartProducts.forEach(cp => {
      cartProductOrder.push(new CartProductOrder().deserialize(cp));
    });

    // populate the order;
    order = new Order();

    order.retailer_id = localStorage.getItem("retailer_id");
    order.orderType = this.addressOrder.details != 'pickup' ? "delivery" : "pickup";
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;


    // place order DB
    this.orderStore.genereteOrder(order).subscribe(
      x => {

        if (x) {

          this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);


          console.log("createOrderFromShoppingCart in BD (callback as X)", x);

          // transform the order into raw text 
          const orderRawText = this.transformOrderToRawText(order);
          // and send it via whatapp
          // to the desired phone number


          // TO DO: with the order _id, it is posible to share the link of the order
          // TO DO:

          // if currentUser =>the seller can send invoice to customer phone number
          if (this.currentUser) {
            this.sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);

          } else {

            // the app should not request phone number.
            // and it will send automatically to the seller phone number
            const retailer_phone_number = localStorage.getItem("retailer_phone_number");

            this.sendViaWhatsApp(orderRawText, "+51" + retailer_phone_number);

          }

          this.clearCart();
          this.removeTemporaryStorage();
          this.router.navigate(['gracias-por-tu-compra'], { relativeTo: this.route });
        }

        // this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
        // this.router.navigate([`/carrito-personal/gracias-por-tu-compra`]);
      });
    return order;

  }
  
  

  clearCart(): void {
    this.cartStore.state.shoppingCart.products = [];
    let cartProductsEmpty = this.cartStore.state.shoppingCart.products;
    this.cartStore.setCart(cartProductsEmpty);
  }

  updatePlaceOrderMessage(message: string): void {
    this.place_order_message = message;
  }

  saveAddressInBuyerAccount(): void {

    this.buyerStore.updateBuyerAddress(this.buyer._id, this.addressOrder).subscribe(
      response => {
      }
    )
  }

  removeTemporaryStorage() {
    sessionStorage.clear();
    this.cartStore.setCart([]);
  }

  // *******************************************************
  // WhatsApp methohd
  // *******************************************************

  sendViaWhatsApp(textMessageOrder: string, phoneNumber: string): void {

    // find out how to paste it automatically in
    // whatsapp
    // const storePhoneNumber: string = "+51996821980";
    console.log("WHATASPP:", phoneNumber);
    let link = `//api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI(textMessageOrder)}`;
    // window.location.href = link;
  }

  // *******************************************************
  // WhatsApp helper methohds
  // *******************************************************

  // this transform-order-to-raw-text method should know to who 
  // the order is to: 
  // (1) from C2B => placing an order directly
  // (2) from B2C => assiting a customer with his/her order
  //                 and then send an invoice 
  transformOrderToRawText(order: Order): string {

    const tab: string = String.fromCodePoint(parseInt("9", 16));
    const breakLine: string = "\n";
    let orderRawTxt: string = "";
    let title: string = "";
    let subTitle: string = "";
    let totalPrice: string = "";

    title = "🏁         *  Nueva orden entrante  *        🏁" + breakLine;
    subTitle = "📥 *Pedido* :" + breakLine;
    totalPrice = `Total a cobrar : *S/. ${order.payment.amount.toFixed(2)}* 🤑` + breakLine;

    if (order != null) {

      // parse order data in Tab separated text
      console.log("order.cart", order);

      orderRawTxt += breakLine;
      orderRawTxt += breakLine;
      orderRawTxt += title;
      orderRawTxt += "🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️" + breakLine;
      // orderRawTxt += "🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️" + breakLine;
      orderRawTxt += breakLine;

      orderRawTxt += subTitle;
      orderRawTxt += "⚖️Cant." + tab + tab + tab + "📌Productos " + tab + tab + tab + " 💰Precio" + breakLine;
      orderRawTxt += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + breakLine;

      order.cart.forEach(product => {

        orderRawTxt += breakLine +

          " " + product.quantity.toFixed(2) + tab +

          this.formatQuantityWeightType(
            product.isKilo
          ) + tab +

          // product.categoryName + " " + product.varietyName;
          this.formatProductNameTo20Characters(
            product.categoryName +
            " " +
            product.varietyName
          ) + tab + tab +

          "S/." + product.totalPrice.toFixed(2)
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

      
      
     

        let paymentType;

        switch (order.payment.method) {
          case "pos_method_area":
            paymentType = "*POS/contra entrega* 🤝💳";
            break;
          case "bank_deposit":
            paymentType = "*Deposito bancario* 🏦";
            break;

          default:
            paymentType = "*Efectivo/contra entrega* 🤝💵"
            break;

        orderRawTxt += `Pago : ${paymentType}` + breakLine;

        orderRawTxt += breakLine;

        let orderType =
          order.orderType == "delivery" ?
            "Delivery 🛵." : "Recogo en tienda 🏪.";

        orderRawTxt += `Tipo de entrega : *${orderType}*` + breakLine;



        if (order.orderType == "delivery") {

          orderRawTxt += breakLine;
          orderRawTxt += `📍 *Entrega en* :` + breakLine;
          orderRawTxt += "~~~~~~~~~~~~~~~~~~~" + breakLine;

          orderRawTxt += `*Dirección* : ${order.shipping.address.streetName} ${order.shipping.address.streetNumber}` + breakLine;

          if (order.shipping.address.apartmentNumber) {
            orderRawTxt += `*Departamento* : ${order.shipping.address.apartmentNumber}` + breakLine;
          }

          orderRawTxt += `${order.shipping.address.district}.` + breakLine;

          if (order.shipping.address.reference) {
            orderRawTxt += `*Referencia* : ${order.shipping.address.reference}` + breakLine;
          }

          if (order.shipping.address.details) {
            orderRawTxt += `*Detalles adicionales* : ${order.shipping.address.details}` + breakLine;
          }
        }
      }


      orderRawTxt += breakLine;
      orderRawTxt += "       *Hecho con mucho ❤️ en 🇵🇪*       " + breakLine;
      orderRawTxt += "🥑🌿🍇🍓🍈🍒🍑🥭🥑🌿🌱🌴" + breakLine;

      // this.cartProducts.forEach(product => {
      //   orderRawTxt += breakLine + 
      //     this.formatProductNameTo20Characters(
      //       product.categoryName + 
      //       " " +
      //       product.varietyName
      //     ) + tab + tab +
      //     this.formatQuantityWeightType(
      //       product.isKilo
      //     ) + tab + tab +
      //     this.formatQuantityToFractionsOrUnits(
      //       product.quantity, product.isKilo
      //     ) + tab + tab + 
      //     product.totalPrice.toFixed(2);
      // })

      this.copyText(orderRawTxt);
      console.log(orderRawTxt)
      // copy text in the clipboard
    }

    return orderRawTxt;
  }

  transformInvoiceIntoRawText(order: Order): string {

    const tab: string = String.fromCodePoint(parseInt("9", 16));
    const breakLine: string = "\n";
    let orderRawTxt: string = "";
    let title: string = "";
    let subTitle: string = "";
    let totalPrice: string = "";

    if (this.currentUser) {
      title = "🏁           *     Cotización     *          🏁" + breakLine;
      subTitle = "🛒 *Lista de productos* :" + breakLine;
      totalPrice = `Total de la cotización : *S/. ${order.payment.amount.toFixed(2)}* 🤑` + breakLine;
    } 

    if (order != null) {

      // parse order data in Tab separated text
      console.log("order.cart", order);

      orderRawTxt += breakLine;
      orderRawTxt += breakLine;
      orderRawTxt += title;
      orderRawTxt += "🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️" + breakLine;
      // orderRawTxt += "🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️" + breakLine;
      orderRawTxt += breakLine;

      orderRawTxt += subTitle;
      orderRawTxt += "⚖️Cant." + tab + tab + tab + "📌Productos " + tab + tab + tab + " 💰Precio" + breakLine;
      orderRawTxt += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + breakLine;

      order.cart.forEach(product => {

        orderRawTxt += breakLine +

          " " + product.quantity.toFixed(2) + tab +

          this.formatQuantityWeightType(
            product.isKilo
          ) + tab +

          // product.categoryName + " " + product.varietyName;
          this.formatProductNameTo20Characters(
            product.categoryName +
            " " +
            product.varietyName
          ) + tab + tab +

          "S/." + product.totalPrice.toFixed(2)
      })

      orderRawTxt += breakLine;
      orderRawTxt += breakLine;
      // [7:29 PM, 9/25/2020] Kevin Martell: 💰💳💸💵⚖️📥📤🛒📝✅💲✔️🟡🟢🔵🟣⚫⚪🟤🏁🏁🇵🇪🛵🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🌿🌱🌴🐓👍🤠🤝🙏👏
      // [7:30 PM, 9/25/2020] Kevin Martell: 📦✏️📝📌🛒
      orderRawTxt += "📝 *Detalles cotizacion* :" + breakLine;
      orderRawTxt += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + breakLine;

      orderRawTxt += breakLine;

      orderRawTxt += totalPrice;

      orderRawTxt += breakLine;

      

      orderRawTxt += breakLine;
      orderRawTxt += "       *Hecho con mucho ❤️ en 🇵🇪*       " + breakLine;
      orderRawTxt += "🥑🌿🍇🍓🍈🍒🍑🥭🥑🌿🌱🌴" + breakLine;

      this.copyText(orderRawTxt);
      console.log(orderRawTxt)
      // copy text in the clipboard
    }

    return orderRawTxt;
  }

  /* To copy any Text */
  copyText(val: string): void {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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

  formatQuantityToFractionsOrUnits(quant: number, isKilo: boolean): string {
    if (quant == 0) return "";

    // formating quantity for kilos
    if (quant < 1 && isKilo) {

      return this.turnIntoFraction(quant);

    } if (quant > 1 && isKilo) {

      //more than 1 kilo
      const units = quant.toString().split(".", 1);
      console.log("UNITS split :", units);
      return units.toString() + "," + this.turnIntoFraction(quant - (+units));

    }
    // formation for units
    return quant.toString();
  }

  turnIntoFraction(quant: number): string {
    if (quant == 0) return "";

    switch (quant) {
      case 0.25:
        return "1/4";
        break;
      case 0.50:
        return "1/2";
        break;
      default:
        return "3/4";
        break;
    }
  }

  formatQuantityWeightType(isKilo: boolean): string {
    if (isKilo === undefined) return;
    return isKilo ? " Kg -" : "Uni -";
  }

  getEmptyStr(num: number): string {
    let emptyStr = "";
    for (let i = 0; i < num; i++) {
      emptyStr += " .";
    }
    return emptyStr;
  }





}
