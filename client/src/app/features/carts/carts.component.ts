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
import { APP_CONFIG } from 'src/app/app.config';
import { environment } from '../../../environments/environment';
import { TemporaryStorageService, TemporaryStorageFacet } from 'src/app/core/session-storage/services/temporary-storage.service';

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
  subscriptionRoute: Subscription;

  maturityView: string;
  titleMessage: string;

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

  button_message: string = "";
  isOrderPushed: boolean = false;

  currentUser: string = "";
  order_id: string = "";

  isDisable: boolean = false;

  subscribedParamRetailerStoreName: string;
  subscribeRetailerStore: Subscription;

  temporaryStorage: TemporaryStorageFacet;



  constructor(
    private buyerNavegationStore: BuyerNavegationStore,
    private cartStore: CartStore,
    private order: OrderStore,
    private buyerStore: BuyerStore,
    private authenticationStore: AuthenticationStore,
    private orderStore: OrderStore,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private temporaryStorageService: TemporaryStorageService,
    private retailerStoreStore: RetailerStoreStore
  ) {



    this.temporaryStorage = this.temporaryStorageService.forKey("product_list");
    
    
    const currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
    if (currentUser) {
      this.currentUser = currentUser;
      
    }
    
    
    this.subscriptionRoute = this.route.paramMap.subscribe(params => {
      this.subscribedParamRetailerStoreName = params.get("retailer_store_name");
      this.retailerStoreStore.getRetailerByNameStore(this.subscribedParamRetailerStoreName);
      localStorage.setItem("retailer_store_name", this.subscribedParamRetailerStoreName)

      this.order_id = params.get("order_id");
      if (this.order_id !== null)
        localStorage.setItem("current_order_id",this.order_id);
    })

    this.order_id = localStorage.getItem("current_order_id");

    this.init();
    this.initializeViewSettings();
    this.initCartOrderType();

    console.log("isOrderPushed:", this.isOrderPushed);

  }


  init(): void {

    if(this.order_id){
      // confirm and order the the shopping cart
      this.updateButtonMessage(STORE_CONFIG.messages_view.buttonMessage_ConfimOrder);
    } else {
      // generating the order by him or her self
      this.updateButtonMessage(STORE_CONFIG.messages_view.buttonMessage_SendViaWhatsApp);
    }

  
    this.subscribeRetailerStore = this.retailerStoreStore.products$.subscribe(
      productsList => {
        this.temporaryStorage.set(productsList);
      }
    )


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
  initCartOrderType() {
    //path: ':retailer_store_name/cotizacion/:order_id',
    const isUrlSaleQuote = this.router.url.includes("cotizacion");
    const isUrlOrders = this.router.url.includes("orders");


    // sales quote
    // 

    if (isUrlSaleQuote) {

      // console.log("Router.url =>",this.router.url, this.order_id);
      this.order.initSaleQuoteOrderId(this.order_id).subscribe(res => {
        // console.log("orderDB type", res.data);
        if (res.data.orderType == "sale_quote") {
          this.titleMessage = STORE_CONFIG.messages_view.saleQuoteView;
          this.cartProducts = [];
          // change HERE ORDER to CART PRODUCT
          this.cartProducts = this.transformOrderCartProductToCartProduct(res.data.cart);
          // populate cartProducts
          this.cartStore.setCart(this.cartProducts);
          // console.log("saleQuoteCartProduct => ", this.cartProducts);
          this.isDisable = false;

        } else {
          let orderUrl = this.getUrlOrderPath(this.router.url);
          // redirect to order by id
          this.router.navigate([orderUrl]);
        }
      })
    }

    if (isUrlOrders) {

      localStorage.removeItem("current_order_id");


      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.placedOrderView
      );

      this.order.initSaleQuoteOrderId(this.order_id).subscribe(res => {
        this.titleMessage = STORE_CONFIG.messages_view.orderInProcessView;
        this.updateButtonMessage(STORE_CONFIG.messages_view.buttonMessage_OrderProcess);
        this.cartProducts = [];
        this.cartProducts = this.transformOrderCartProductToCartProduct(res.data.cart);
        // this.cartStore.setCart(this.cartProducts);
        this.totalCartPriceStr = calculateCartTotalPrice(this.cartProducts).toString();
        this.isDisable = true;
      })

      console.log("isUrlOrders", isUrlOrders);

    }
  }


  ngOnDestroy(): void {

    this.subscriptionCart.unsubscribe();
    this.subscriptionBuyer.unsubscribe();
    this.subscriptionRoute.unsubscribe();
    // this.subscribeStoreName.unsubscribe();
    this.subscribeRetailerStore.unsubscribe();

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
    this.titleMessage = STORE_CONFIG.question_view_type.cartView;

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

    if (this.currentUser) {
      let order = this.createOrderFromShoppingCart();
      this.updateButtonMessage(STORE_CONFIG.messages_view.buttonMessage_SendSaleQuote);

    } else {

      if (!this.isSetAddress) {
        this.openAddAddressModal();
      }

    }

  }

  sendInvoiceToBuyer() {
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

        // let order = null;
        // if (this.currentUser) {
        //   order = this.createInvoiceFromShoppingCart();
        // } else if (this.order_id !== "") {
        //   order = this.updateOrderFromShoppingCart(this.order_id);
        //   console.log("order = this.updateOrderFromShoppingCart(this.order_id);", this.order_id);
        // } else {
        //   order = this.createOrderFromShoppingCart();
        // }


        let order = null;
        if(this.currentUser){
          this.order_id = localStorage.getItem("current_order_id");
          console.log("this.order_id =>>>>>>>",this.order_id);
          if(this.order_id !== null){
            order = this.updateOrderFromShoppingCart(this.order_id);
          } else {
            order = this.createInvoiceFromShoppingCart();
          }
        } else {
          if(this.order_id !== null){
            order = this.updateOrderFromShoppingCart(this.order_id);
          } else {
            order = this.createOrderFromShoppingCart();
          }
        }

        if (order != null) {

          console.log("Order placed Successfuly");


          // console.log("createOrderFromShoppingCart in BD", order);
          // const orderRawText = this.transformOrderToRawText(order);
          // this.sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);
          this.isOrderPushed = true;

          this.updateButtonMessage(STORE_CONFIG.messages_view.buttonMessage_SendOrder);
        }
        // else {
        //   this.updatePlaceOrderMessage("Envie nuevamente su ordenr");        

        // }

      }
    });
  }

  createInvoiceFromShoppingCart(): Order {

    console.log("createInvoiceFromShoppingCart");
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
    trackingOrder.orderStatus.push(["generated_by_retailer", new Date()]);
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
    order.orderType = "sale_quote";
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
          const invoiceRawText = this.transformInvoiceIntoRawText(x.data as Order);
          // and send it via whatapp
          // to the desired phone number


          // TO DO: with the order _id, it is posible to share the link of the order
          // TO DO:

          // if currentUser =>the seller can send invoice to customer phone number


          this.sendViaWhatsApp(invoiceRawText, order.shipping.buyer.phoneNumber);


          this.clearCart();
          this.removeTemporaryStorage();
          this.router.navigate([localStorage.getItem("retailer_store_name")]);
          // this.router.navigate(['gracias-por-tu-compra'], { relativeTo: this.route });
        }

        // this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
        // this.router.navigate([`/carrito-personal/gracias-por-tu-compra`]);
      });
    return order;

  }

  createOrderFromShoppingCart(): Order {

    console.log("createOrderFromShoppingCart");
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
    trackingOrder.orderStatus.push(["generated_by_buyer", new Date()]);
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
          const orderRawText = this.transformOrderToRawText(x.data as Order);
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

  updateOrderFromShoppingCart(order_id: string): Order {

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
    trackingOrder.orderStatus.push(["generated_by_buyer", new Date()]);
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
    order._id = order_id;
    order.retailer_id = localStorage.getItem("retailer_id");
    
    if(this.currentUser){
      order.orderType = "pickup";
    } else {
      order.orderType = this.addressOrder.details != 'pickup' ? "delivery" : "pickup";
    }
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;

    console.log("updateOrderFromShoppingCart IN:",order._id);

    // place order DB
    this.orderStore.updateOrder(order).subscribe(
      x => {

        if (x) {

          this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);


          console.log("createOrderFromShoppingCart in BD (callback as X)", );

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
          localStorage.removeItem("current_order_id");
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

  updateButtonMessage(message: string): void {
    this.button_message = message;
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
    if(environment.production)
      window.location.href = link;
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
          paymentType = "*Efectivo/contra entrega* 🤝💵";
          break;
      }

      orderRawTxt += `Pago : ${paymentType}` + breakLine;

      orderRawTxt += breakLine;

      let orderType =
        order.orderType === "delivery" ?
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


      orderRawTxt += "Si desea puede ver su orden ingresando al siguiente link: ";
      orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem("retailer_store_name")}/orders/${order._id}`
      orderRawTxt += breakLine;

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

      orderRawTxt += "Si desea puede editar la cotización ingresando al siguiente link: ";
      orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem("retailer_store_name")}/cotizacion/${order._id}`
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

  transformOrderCartProductToCartProduct(products: CartProductOrder[]): CartProduct[] {

    let saleQuoteCartProducts: CartProduct[] = [];

    products.forEach(product => {
      saleQuoteCartProducts.push(new CartProduct().deserialize(product));
    });
    console.log("transformOrderCartProductToCartProduct res=> ", saleQuoteCartProducts);

    return saleQuoteCartProducts;
  }


  getUrlOrderPath(routerUrl: string) {

    let routerArray: string[] = routerUrl.split("/");

    return routerArray.map(function (ele) {
      if (ele === "cotizacion") {
        ele = "orders";
      }
      return ele;
    }).join(("/"));
  }




}
