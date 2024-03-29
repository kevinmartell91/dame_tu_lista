import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerStore } from 'src/app/core/buyer/services/buyer.store';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { getTotalCartPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { ORDER_CONFIG } from 'src/app/core/order/order.config';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { Order } from 'src/app/core/order/types/order';
import { TrackingOrder } from 'src/app/core/order/types/tracking-order';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import {
  TemporaryStorageFacet,
  TemporaryStorageService,
} from 'src/app/core/session-storage/services/temporary-storage.service';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { AddressOrder } from '../../core/order/types/address-order';
import { BuyerOrder } from '../../core/order/types/buyer-order';
import { PaymentOrder } from '../../core/order/types/payment-order';
import { ShippingOrder } from '../../core/order/types/shipping-order';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { RetailerStoreStore } from '../retailer-stores/services/retailer.store';
import { CashPaymentAmountModalComponent } from './components/cash-payment-amount-modal/cash-payment-amount-modal.component';
import { FillShippingAddressComponent } from './components/fill-shipping-address/fill-shipping-address.component';
import { PhoneNumberModalComponent } from './components/phone-number-modal/phone-number-modal.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { transformOrderCartProductToCartProduct } from './helpers/cart-products.helpers';
import {
  sendViaWhatsApp,
  transformInvoiceIntoRawTextBaseFormat,
  transformOrderToRawTextBaseFortmat,
  transformOrderToRawTextBaseFortmatForThermalPrinterOnlyProductList,
  transformOrderToRawTextBaseFortmatForThermalPrinterWithPrice,
} from './helpers/whatsapp.helpers';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.sass'],
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
  totalCartPriceStr: string = '0.00';

  private dialogRef: any;

  buyer: Buyer;

  // variable for paymet method coming from payment method modal
  paymentMethodOrder: string = '';
  phoneNumberOrder: string = '';
  // variable for addressOrde method coming from  Address modal
  addressOrder: AddressOrder;

  //variables for cashPaymentAmount
  cashPaymentAmount: number = 0;
  cashBackAmount: number = 0;

  isSetAddress: boolean = false;
  isSetPayMethod: boolean = false;

  button_message: string = '';
  isOrderPushed: boolean = false;

  currentUser: string = '';
  order_id: string = '';

  isDisable: boolean = false;

  subscribedParamRetailerStoreName: string;
  subscribeRetailerStore: Subscription;

  temporaryStorage: TemporaryStorageFacet;

  orderBD: Order = null;

  isUrlOrders: boolean;
  isUrlSaleQuote: boolean;

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
    const currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);
    if (currentUser) {
      this.currentUser = currentUser;
      // this.updateButtonMessage(
      //   STORE_CONFIG.messages_view.buttonMessage_SaleQuote
      // );
    }

    this.subscriptionRoute = this.route.paramMap.subscribe((params) => {
      this.subscribedParamRetailerStoreName = params.get('retailer_store_name');
      // this.retailerStoreStore.getRetailerByNameStore(this.subscribedParamRetailerStoreName);
      localStorage.setItem(
        'retailer_store_name',
        this.subscribedParamRetailerStoreName
      );

      this.order_id = params.get('order_id');
      if (this.order_id !== null)
        localStorage.setItem('current_order_id', this.order_id);
    });

    this.order_id = localStorage.getItem('current_order_id');
    console.log('this.route.paramMap.subscribe', this.order_id);

    this.init();
    this.initializeViewSettings();
    this.initCartOrderType();

    console.log('isOrderPushed:', this.isOrderPushed);
  }

  init(): void {
    if (this.order_id) {
      // confirm the order of he shopping cart (here the order can be edited
      // then i will turn from sales-quote to orde in the urlpath)
      this.updateButtonMessage(
        STORE_CONFIG.messages_view.buttonMessage_ConfimOrder
      );
      this.titleMessage = STORE_CONFIG.messages_view.saleQuoteView;
      this.order.initSaleQuoteOrderId(this.order_id).subscribe((res) => {
        this.orderBD = res.data;
        console.log('initSaleQuoteOrderId orderBD', this.orderBD);
      });
    } else {
      // generating the order by him or her self
      this.titleMessage = STORE_CONFIG.question_view_type.cartView;

      if (this.currentUser) {
        this.updateButtonMessage(
          STORE_CONFIG.messages_view.buttonMessage_SaleQuote
        );
      } else {
        this.updateButtonMessage(
          STORE_CONFIG.messages_view.buttonMessage_SendViaWhatsApp
        );
      }
    }

    this.subscribeRetailerStore = this.retailerStoreStore.products$.subscribe(
      (productsList) => {
        // console.log(
        //   'setting productsList in sessionStorage:',
        //   productsList.length
        // );
        // this.temporaryStorage.set(productsList);
      }
    );

    this.subscriptionCart = this.cartStore.shoppingCart$.subscribe((x) => {
      this.cartProducts = x.products;
      this.totalCartPrice = getTotalCartPrice(this.cartProducts);
      // formating to two decimals and as a string
      this.totalCartPriceStr = this.totalCartPrice.toFixed(2);
      console.log('totalCartPriceStr kevon', this.totalCartPriceStr);
      console.log('this.cartProducts', this.cartProducts);
    });

    this.subscriptionBuyer = this.authenticationStore.loginUser$.subscribe(
      (y) => {
        if (y !== null && y.login_type == 'buyer') {
          this.buyer = new Buyer().deserialize(y.entity);
        }
      }
    );
  }
  initCartOrderType() {
    //path: ':retailer_store_name/cotizacion/:order_id',
    this.isUrlSaleQuote = this.router.url.includes('cotizacion');
    this.isUrlOrders = this.router.url.includes('orders');

    // sales quote
    //

    if (this.isUrlSaleQuote) {
      console.log('isUrlSaleQuote', this.order_id);

      // console.log("Router.url =>",this.router.url, this.order_id);
      this.order.initSaleQuoteOrderId(this.order_id).subscribe((res) => {
        // console.log("orderDB type", res.data);
        if (res.data.orderType == 'sale_quote') {
          this.titleMessage = STORE_CONFIG.messages_view.saleQuoteView;
          this.cartProducts = [];
          // change HERE ORDER to CART PRODUCT
          this.cartProducts = transformOrderCartProductToCartProduct(
            res.data.cart
          );
          // populate cartProducts
          this.cartStore.setCart(this.cartProducts);
          // console.log("saleQuoteCartProduct => ", this.cartProducts);
          this.isDisable = false;

          this.orderBD = res.data;
          console.log(
            'AS a sale_quote => initSaleQuoteOrderId',
            res.data,
            this.orderBD
          );
        } else {
          let orderUrl = this.getUrlOrderPath(this.router.url);
          // redirect to order by id
          this.router.navigate([orderUrl]);
        }
      });
    }

    if (this.isUrlOrders) {
      localStorage.removeItem('current_order_id');

      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.placedOrderView,
        'navegation.placedOrderView'
      );

      this.order.initSaleQuoteOrderId(this.order_id).subscribe((res) => {
        this.titleMessage = STORE_CONFIG.messages_view.orderInProcessView;

        if (
          this.getLastStatus(this.orderBD.shipping.tracking.orderStatus) ===
          ORDER_CONFIG.orderStatus.packaged_by_retailer
        ) {
          console.log('packaged_by_retailer');
          this.updateButtonMessage(
            STORE_CONFIG.messages_view.buttonMessage_DispatchedOrder
          );
        } else {
          this.updateButtonMessage(
            STORE_CONFIG.messages_view.buttonMessage_ProcessingOrder
          );
        }
        this.cartProducts = [];
        this.cartProducts = transformOrderCartProductToCartProduct(
          res.data.cart
        );
        this.totalCartPriceStr = getTotalCartPrice(this.cartProducts).toFixed(
          2
        );
        this.isDisable = true;
        this.orderBD = res.data;
      });
    }
  }

  getLastStatus(status: any): string {
    let lastStatus = status[status.length - 1];
    return lastStatus[0];
  }

  ngOnDestroy(): void {
    this.subscriptionCart.unsubscribe();
    this.subscriptionBuyer.unsubscribe();
    this.subscriptionRoute.unsubscribe();
    this.subscribeRetailerStore.unsubscribe();
  }

  // *******************************************************
  // Cart methohds
  // *******************************************************

  private initializeViewSettings(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.cartView,
      'navegation.cartView'
    );

    this.maturityView = STORE_CONFIG.view_type.cartView;
  }

  onCartProducDeleted(cartProductDeleted: CartProduct): void {
    // set quantity to cero to be removed from cartProdcuts
    // a shortcut to romeve cartPrduct
    cartProductDeleted.quantity = 0;

    containtToppings(cartProductDeleted.categoryName)
      ? this.cartStore.updateCartWithToppings(cartProductDeleted)
      : this.cartStore.updateCart(cartProductDeleted);
  }

  onCartProductUpdate(cartProductUpdate: CartProduct): void {
    console.log('onCartProductUpdate', cartProductUpdate);
    this.cartProducts.filter((cp) => {
      if (cp._id == cartProductUpdate._id) {
        cp = cartProductUpdate;
      }
    });

    // if cartProduct quatity is 0,
    // then remove from cartProducts.
    // hadledby this updateCart method
    // this.cartStore.updateCart(cartProductUpdate);
    containtToppings(cartProductUpdate.categoryName)
      ? this.cartStore.updateCartWithToppings(cartProductUpdate)
      : this.cartStore.updateCart(cartProductUpdate);

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
      this.updateButtonMessage(
        STORE_CONFIG.messages_view.buttonMessage_SendSaleQuote
      );
    } else {
      if (!this.isSetAddress) {
        this.openAddAddressModal();
      }
    }
  }

  sendInvoiceToBuyer() {
    console.log('sendInvoiceToBuyer');

    // HERE - open the phone number modal
    this.openPhoneNumberModal();
    // this.openAddPayMethodModal();
  }

  openAddAddressModal(): void {
    this.dialogRef = this.matDialog.open(FillShippingAddressComponent, {
      width: '420px',
      data: {
        buyer: this.buyer,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.addressOrder = new AddressOrder().deserialize(result);
        // HERE - open the payment modal only
        // this.openPhoneNumberModal();
        this.openAddPayMethodModal();
        // => then in the openPhoneNumberModal open openAddPayMethodModal
        // this will help to remove an unecessary isFreeBill attribute passed as an input
      }
    });
  }

  openAddPayMethodModal(): void {
    this.dialogRef = this.matDialog.open(SelectPaymentMethodComponent, {
      width: '420px',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.paymentMethodOrder = result.paymentMethod;
        if (this.paymentMethodOrder === 'upon_delivery_cash') {
          this.openAddCashPaymentAmountModal();
        } else {
          this.openPhoneNumberModal();
        }
      }
    });
  }

  openAddCashPaymentAmountModal(): void {
    this.dialogRef = this.matDialog.open(CashPaymentAmountModalComponent, {
      width: '420px',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.cashPaymentAmount = result.cashAmount;
        this.openPhoneNumberModal();
      }
    });
  }

  openPhoneNumberModal(): void {
    console.log('opening openPhoneNumberModal', this.currentUser);

    this.dialogRef = this.matDialog.open(PhoneNumberModalComponent, {
      width: '420px',
      data: {
        isSalesQuote: this.currentUser !== '' ? true : false,
        isFreeBill: false,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result.phoneNumber !== undefined) {
        //  setting code area
        this.phoneNumberOrder = '+51' + result.phoneNumber;

        let order = null;
        if (this.currentUser) {
          this.order_id = localStorage.getItem('current_order_id');
          console.log('this.order_id =>>>>>>>', this.order_id);
          if (this.order_id !== null) {
            order = this.updateOrderFromShoppingCart(
              this.order_id,
              this.orderBD
            );
          } else {
            order = this.createInvoiceFromShoppingCart();
          }
        } else {
          if (this.order_id !== null) {
            order = this.updateOrderFromShoppingCart(
              this.order_id,
              this.orderBD
            );
          } else {
            order = this.createOrderFromShoppingCart();
          }
        }

        if (order != null) {
          console.log('Order placed Successfully', order);

          // console.log("createOrderFromShoppingCart in BD", order);
          // const orderRawText = this.transformOrderToRawText(order);
          // this.sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);
          this.isOrderPushed = true;

          this.updateButtonMessage(
            STORE_CONFIG.messages_view.buttonMessage_SendOrder
          );
        }
        // else {
        //   this.updatePlaceOrderMessage("Envie nuevamente su ordenr");

        // }
      }
    });
  }

  //generated_by_retailer
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
    let trackingOrder = new TrackingOrder([
      ORDER_CONFIG.orderStatus.generated_by_retailer,
      new Date(),
    ]);

    trackingOrder.driver_name = '';
    trackingOrder.trackingNumber = '';
    trackingOrder.estimatedDelivery =
      'Se entregará su delivery en las próximas horas. Gracias.';

    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = '';
    // shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;

    /**
     * Populating the payment from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    // paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = getTotalCartPrice(this.cartProducts);

    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];

    this.cartProducts.forEach((cp) => {
      cartProductOrder.push(new CartProductOrder().deserialize(cp));
    });

    // populate the order;
    order = new Order();

    order.retailer_id = localStorage.getItem('retailer_id');
    order.orderType = 'sale_quote';
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;

    // place order in DB
    this.orderStore.generateOrder(order).subscribe((x) => {
      if (x) {
        this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);

        console.log('createOrderFromShoppingCart in BD (callback as X)', x);

        // transform the order into raw text
        const invoiceRawText = transformInvoiceIntoRawTextBaseFormat(
          x.data as Order,
          this.currentUser
        );

        // and send it via whatapp
        // to the desired phone number

        // TO DO: with the order _id, it is posible to share the link of the order
        // TO DO:

        // if currentUser =>the seller can send invoice to customer phone number

        sendViaWhatsApp(invoiceRawText, order.shipping.buyer.phoneNumber);

        this.clearCart();
        this.removeTemporaryStorage();
        this.router.navigate([localStorage.getItem('retailer_store_name')]);
        // this.router.navigate(['gracias-por-tu-compra'], { relativeTo: this.route });
      }

      // this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
      // this.router.navigate([`/carrito-personal/gracias-por-tu-compra`]);
    });
    return order;
  }

  //generated_by_buyer
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
    let trackingOrder = new TrackingOrder([
      ORDER_CONFIG.orderStatus.generated_by_buyer,
      new Date(),
    ]);
    trackingOrder.orderStatus.push([
      ORDER_CONFIG.orderStatus.updated_by_buyer,
      new Date(),
    ]);
    trackingOrder.driver_name = '';
    trackingOrder.trackingNumber = '';
    trackingOrder.estimatedDelivery =
      'Se entregará su delivery en las próximas horas. Gracias.';

    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = '';
    shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;

    /**
     * Populating the payment from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = getTotalCartPrice(this.cartProducts);
    paymentMethodOrder.cashPaymentAmount = this.cashPaymentAmount;
    paymentMethodOrder.cashBackAmount =
      this.cashPaymentAmount - paymentMethodOrder.amount;

    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];

    this.cartProducts.forEach((cp) => {
      cartProductOrder.push(new CartProductOrder().deserialize(cp));
    });

    // populate the order;
    order = new Order();

    order.retailer_id = localStorage.getItem('retailer_id');
    order.orderType =
      this.addressOrder.details != 'pickup' ? 'delivery' : 'pickup';
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;

    console.log('MOCK ORDER => ', JSON.stringify(order));

    const mockOrder = {
      //   retailer_id: '60778625d9232c1ec44f5ec2',
      //   orderType: 'pickup',
      //   shipping: {
      //     buyer: { phoneNumber: '+51996821980' },
      //     deliveryNotes: '',
      //     address: { reference: '', details: 'pickup' },
      //     tracking: {
      //       orderStatus: [
      //         ['generated_by_buyer', '2021-08-04T19:30:32.055Z'],
      //         ['updated_by_buyer', '2021-08-04T19:30:32.055Z'],
      //       ],
      //       driver_name: '',
      //       trackingNumber: '',
      //       estimatedDelivery:
      //         'Se entregará su delivery en las próximas horas. Gracias.',
      //     },
      //   },
      //   payment: {
      //     method: 'fast_transfer',
      //     amount: 44,
      //     cashPaymentAmount: 0,
      //     cashBackAmount: -44,
      //   },
      //   cart: [
      //     {
      //       isCheckedDone: false,
      //       _id: '61097f32c0c0b5447aec19aa',
      //       categoryImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa',
      //       categoryName: 'Comida rápida',
      //       varietyImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe',
      //       varietyName: 'Hamburguesa clásica',
      //       currency: 'PEN',
      //       price: 7,
      //       isSmallSize: false,
      //       isMediumSize: false,
      //       isBigSize: false,
      //       isKilo: false,
      //       isUnit: true,
      //       isOrganic: false,
      //       isSeasonal: true,
      //       isMaturityDetails: true,
      //       maturityImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/5b48c774e6433dc03e2e332dedea37d7/a2a7cb09',
      //       maturityName: 'Wawito clasica  (tyu)',
      //       maturityInfo:
      //         'Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ',
      //       maturityEatIn: '0',
      //       maturityLastFor: '0',
      //       isInStock: true,
      //       quantity: 1,
      //       size: '',
      //       details: '',
      //       idAux: '61097f32c0c0b5447aec19aa_1628105115709',
      //       totalPrice: 7,
      //       totalAmount: 20.5,
      //       toppings: [
      //         {
      //           name: 'Tipo de pan',
      //           selected: 'No pan',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'N.P',
      //         },
      //         {
      //           name: 'Deseas adicionales',
      //           selected:
      //             'Filete de Pollo S/. 4.50,Hot-Dog (Otto Kunz) S/. 4.00,Porción de Papas S/. 5.00',
      //           isMultipleSelection: true,
      //           countSelected: 3,
      //           name_abbreviation: 'Hot-Dog (Otto Kunz),Porción de Papas',
      //         },
      //         {
      //           name: 'Tipo de papas',
      //           selected: 'Papas al hilo',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'P.H',
      //         },
      //         {
      //           name: 'Deseas ensalada',
      //           selected: 'No ensalada',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'S/ens',
      //         },
      //         {
      //           name: 'Tus cremas',
      //           selected: 'Mayonesa ,Ketchup ,Mostaza ,Salsa Golf ,Aceituna ',
      //           isMultipleSelection: true,
      //           countSelected: 5,
      //           name_abbreviation: 'K,Moz,Golf,Cei',
      //         },
      //       ],
      //     },
      //     {
      //       isCheckedDone: false,
      //       _id: '61097f32c0c0b5447aec19eb',
      //       categoryImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa',
      //       categoryName: 'Comida rápida',
      //       varietyImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe',
      //       varietyName: 'Hamburguesa especial',
      //       currency: 'PEN',
      //       price: 12,
      //       isSmallSize: false,
      //       isMediumSize: false,
      //       isBigSize: false,
      //       isKilo: false,
      //       isUnit: true,
      //       isOrganic: false,
      //       isSeasonal: true,
      //       isMaturityDetails: true,
      //       maturityImageUrl:
      //         'https://dl.airtable.com/.attachmentThumbnails/3df90315a2ddf0073570f2742949c043/adcad03a',
      //       maturityName: 'La poderosa  (werw)',
      //       maturityInfo:
      //         'Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ',
      //       maturityEatIn: '0',
      //       maturityLastFor: '0',
      //       isInStock: true,
      //       quantity: 1,
      //       size: '',
      //       details: '',
      //       idAux: '61097f32c0c0b5447aec19eb_1628105405994',
      //       totalPrice: 12,
      //       totalAmount: 23.5,
      //       toppings: [
      //         {
      //           name: 'Tipo de pan',
      //           selected: 'Pan Frances',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'F',
      //         },
      //         {
      //           name: 'Tipo de papas',
      //           selected: 'Papas Fritas',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'P.F',
      //         },
      //         {
      //           name: 'Deseas adicionales',
      //           selected:
      //             'Filete de Pollo S/. 4.50,Hot-Dog (Otto Kunz) S/. 4.00,Chorizo Parrillero S/. 3.00',
      //           isMultipleSelection: true,
      //           countSelected: 3,
      //           name_abbreviation: 'Hot-Dog (Otto Kunz),Chorizo Parrillero',
      //         },
      //         {
      //           name: 'Tus cremas',
      //           selected: 'Ketchup ,Mostaza ,Aceituna ',
      //           isMultipleSelection: true,
      //           countSelected: 3,
      //           name_abbreviation: 'K,Moz,Cei',
      //         },
      //         {
      //           name: 'Deseas ensalada',
      //           selected: 'Sí (solo lechuga)',
      //           isMultipleSelection: false,
      //           countSelected: 1,
      //           name_abbreviation: 'C/lechu',
      //         },
      //       ],
      //     },
      //   ],
    };

    // place order DB
    this.orderStore.generateOrder(order).subscribe((x) => {
      // this.orderStore.generateOrder(mockOrder as Order).subscribe((x) => {
      if (x) {
        this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);

        console.log('createOrderFromShoppingCart in BD (callback as X)', x);

        // transform the order into raw text
        const orderRawText = transformOrderToRawTextBaseFortmat(
          x.data as Order
          // order
        );

        if (containtToppings((x.data as Order).cart[0].categoryName)) {
          const orderThermalPrinterFormat =
            transformOrderToRawTextBaseFortmatForThermalPrinterWithPrice(
              x.data as Order
            );
        }
        // and send it via whatapp
        // to the desired phone number

        // TO DO: with the order _id, it is posible to share the link of the order
        // TO DO:

        // if currentUser =>the seller can send invoice to customer phone number

        if (this.currentUser) {
          sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);
        } else {
          // the app should not request phone number.
          // and it will send automatically to the seller phone number
          const retailer_phone_number = localStorage.getItem(
            'retailer_phone_number'
          );

          sendViaWhatsApp(orderRawText, '+51' + retailer_phone_number);
        }

        this.clearCart();
        this.removeTemporaryStorage();
        this.router.navigate(['gracias-por-tu-compra'], {
          relativeTo: this.route,
        });
      }

      // this.router.navigate(['/carrito-personal/gracias-por-tu-compra']);
      // this.router.navigate([`/carrito-personal/gracias-por-tu-compra`]);
    });
    return order;
  }

  //updated_by_buyer
  updateOrderFromShoppingCart(order_id: string, order: Order): Order {
    // let order = null;
    console.log('updateOrderFromShoppingCart', order);

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
    let trackingOrder = order.shipping.tracking;
    trackingOrder.orderStatus.push([
      ORDER_CONFIG.orderStatus.updated_by_buyer,
      new Date(),
    ]);
    trackingOrder.driver_name = '';
    trackingOrder.trackingNumber = '';
    trackingOrder.estimatedDelivery =
      'Se entregará su delivery en las próximas horas. Gracias.';

    /**
     * Populating the shippingOrder from this.buyer
     */
    let shippingOrder = new ShippingOrder();
    shippingOrder.buyer = buyerOrder;
    shippingOrder.deliveryNotes = '';
    shippingOrder.address = addressOrder;
    shippingOrder.tracking = trackingOrder;

    /**
     * Populating the payment from this.buyer
     */
    let paymentMethodOrder = new PaymentOrder();
    paymentMethodOrder.method = this.paymentMethodOrder;
    paymentMethodOrder.amount = getTotalCartPrice(this.cartProducts);
    paymentMethodOrder.cashPaymentAmount = this.cashPaymentAmount;
    paymentMethodOrder.cashBackAmount =
      this.cashPaymentAmount - paymentMethodOrder.amount;

    /**
     * Populating the cartProductOrder from this.cartProduct
     */
    let cartProductOrder: CartProductOrder[] = [];

    this.cartProducts.forEach((cp) => {
      cartProductOrder.push(new CartProductOrder().deserialize(cp));
    });

    // populate the order;
    // order = new Order();
    // order._id = order_id;
    order.retailer_id = localStorage.getItem('retailer_id');

    if (this.currentUser) {
      order.orderType = 'pickup';
    } else {
      order.orderType =
        this.addressOrder.details != 'pickup' ? 'delivery' : 'pickup';
    }
    order.shipping = shippingOrder;
    order.payment = paymentMethodOrder;
    order.cart = cartProductOrder;

    console.log('updateOrderFromShoppingCart IN:', order);

    // place order DB
    this.orderStore.updateOrder(order).subscribe((x) => {
      if (x) {
        this.currentUser = localStorage.getItem(LOGIN_CONFIG.loginUserStorage);

        console.log('createOrderFromShoppingCart in BD (callback as X)');

        // transform the order into raw text
        const orderRawText = transformOrderToRawTextBaseFortmat(order as Order);
        // and send it via whatapp
        // to the desired phone number

        // TO DO: with the order _id, it is posible to share the link of the order
        // TO DO:

        // if currentUser =>the seller can send invoice to customer phone number
        if (this.currentUser) {
          sendViaWhatsApp(orderRawText, order.shipping.buyer.phoneNumber);
        } else {
          // the app should not request phone number.
          // and it will send automatically to the seller phone number
          const retailer_phone_number = localStorage.getItem(
            'retailer_phone_number'
          );

          sendViaWhatsApp(orderRawText, '+51' + retailer_phone_number);
        }

        this.clearCart();
        this.removeTemporaryStorage();
        localStorage.removeItem('current_order_id');
        this.router.navigate(['gracias-por-tu-compra'], {
          relativeTo: this.route,
        });
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
    this.buyerStore
      .updateBuyerAddress(this.buyer._id, this.addressOrder)
      .subscribe((response) => {});
  }

  removeTemporaryStorage() {
    sessionStorage.clear();
    this.cartStore.setCart([]);
  }

  // *******************************************************
  // WhatsApp methohd
  // *******************************************************

  getUrlOrderPath(routerUrl: string) {
    let routerArray: string[] = routerUrl.split('/');

    return routerArray
      .map(function (ele) {
        if (ele === 'cotizacion') {
          ele = 'orders';
        }
        return ele;
      })
      .join('/');
  }

  printOnBluetoothThermalPrinter(): void {
    console.log('this.cartProducts KEVIN ', this.cartProducts);
    const cartOrders =
      transformOrderToRawTextBaseFortmatForThermalPrinterOnlyProductList(
        this.cartProducts
      );
    this.sendToBluetoothThermalPrinter(cartOrders);
  }

  sendToBluetoothThermalPrinter(prn: string): void {
    // LINK REFERENCE
    // https://rawbt.ru/start.html
    // Generating a receipt from javascript
    var S = '#Intent;scheme=rawbt;';
    var P = 'package=ru.a402d.rawbtprinter;end;';
    var textEncoded = encodeURI(prn);
    // this lime will print the order in the therma printer
    // if the RaxBT mobile app in installed and setup manually
    // if not it wil redirecto to the app in the play store(androide device
    window.location.href = 'intent:' + textEncoded + S + P;
  }
}
