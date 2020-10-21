import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { ORDER_CONFIG } from 'src/app/core/order/order.config';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { Order } from 'src/app/core/order/types/order';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { TemporaryStorageFacet, TemporaryStorageService } from 'src/app/core/session-storage/services/temporary-storage.service';
import { OrderDetailModalComponent } from "../order-detail-modal/order-detail-modal.component";
import { OrderPaymentModalComponent } from '../order-payment-modal/order-payment-modal.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnDestroy {
   
  step = -1;
  
  authenticationSubscription: Subscription;
  orderSubscription: Subscription;

  isMobileView: boolean;
  isOrderCompleted: boolean = false;

  retailer: Retailer;
  retailer_id: string;

  temporaryStorage: TemporaryStorageFacet;

  dialogRef: any;

  constructor(
    public orderStore: OrderStore,
    private temporaryStorageService: TemporaryStorageService,
    private matDialog: MatDialog,
    private snackBarService: MatSnackBar
  ) {

    this.temporaryStorage = this.temporaryStorageService.forKey("orders_by_retailer");

    let dataStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
    this.retailer_id = dataStorage.entity._id;

;    this.orderSubscription = this.orderStore.orderListByRetailerId$.subscribe( 
      y => {
        this.saveToTemporaryStorage(y);
      }
    )

    this.init();

   }

  init(): void {

    this.restoreFromTemporaryStorage();
    this.orderStore.initOrderByRetailerId(this.retailer_id);
    this.isMobileView = true;

  }

  ngOnDestroy() {

    this.orderSubscription.unsubscribe();

  }

  
  onIsProductOrderCompleted( buttonIndex: string,  data: any): void{
    
    let orders = this.orderStore.state.orderListByRetailerId;

    orders.forEach(order => {
      if( data.order_id == order._id) {
        order.cart.filter( productOrder => {
          if( productOrder._id == data.cartProductOrder_id ) {
            productOrder.isCheckedDone = !productOrder.isCheckedDone;
          }
         
          //looping again looking if the priducts are checkDone 
          let isAllCartProductsChecked = order.cart.every( p => p.isCheckedDone);
          
          let button = document.getElementById(buttonIndex);
          
          if(isAllCartProductsChecked){
            //enable the buttion
            button.removeAttribute('disabled');
          } else {
            //disabeling the buttion for the respective order
            button.setAttribute('disabled','disabled');

          }
          

        })
      }
      //set new orderState
      this.setNextOrderState(orders);

    });
  }


  setOrderPackagedStatusCompleted(order: Order): void {

    this.setNewOrderStatus(ORDER_CONFIG.orderStatus.packaged_by_retailer, order);

    // put not patch =>time issues, It shoud be patch
    this.orderStore.updateOrder(order).subscribe(
      res => {
        this.openSnackBar("Terminaste una órden más! 👏👏","cerrar");
        this.step = -1;
        }
      )

  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 3000,
    });

  }
  
  setStep(index: number, order: Order) {

    this.step = index;
    this.setNewOrderStatus(ORDER_CONFIG.orderStatus.seen_by_retailer, order);
    // put not patch =>time issues, It shoud be patch
    this.orderStore.updateOrder(order).subscribe(
      res => {
      }
    )

  }
  
  nextStep() {

    this.step++;

  }
  
  prevStep() {

    this.step--;

  }
  
  setNewOrderStatus(newOrderStatus: string, order: Order): void {
    
    let orderUpdate = order.updateOrderStatus(newOrderStatus, order);
    
    //set new orderState
    let orders = this.orderStore.state.orderListByRetailerId;
    orders.forEach(ele => {
      if( ele._id == orderUpdate._id ) {
        ele = orderUpdate;
      }
    });
    
    this.setNextOrderState(orders);
    
  }
  
  setNextOrderState(orders: Order[]): void {

    this.orderStore.setNewOrderState(orders);

  }
  
  public async restoreFromTemporaryStorage(): Promise<void> {

    let cachedData = await this.temporaryStorage.get<any[]>();

    let orders: Order[] = [];

    if ( cachedData ) { 

      cachedData.forEach(elem => {
        orders.push(new Order().deserialize(elem));
      });
    }   
    
    // update cartStore with date from temporary storage
    this.orderStore.setNewOrderState(orders);

 
  }


  saveToTemporaryStorage(orders: Order[]): void {

    this.temporaryStorage.set(orders);
  }

  getLastStatus(status: any): string {
    let lastStatus =  status[status.length -1];
    return lastStatus[0];
  }

  openWhatsApp(order: Order): void {
    let message = "Tu orden ya está en camino.";
    if( order.orderType == ' pickup'){
      message = "Ya pudes recoger tu orden, está Lista. Te esperamos.";
    }
    let link =`//api.whatsapp.com/send?phone=${order.shipping.buyer.phoneNumber}&text=${message}`;
    window.location.href=link;
  }
  
  openOderDetailModal(order: Order): void {
    
    this.dialogRef = this.matDialog.open(OrderDetailModalComponent, {
      width: '320px',
      data: {
        order: order
      }
    });
    
  }

  openPaymentDetailModal(order: Order): void {

    this.dialogRef = this.matDialog.open(OrderPaymentModalComponent, {
      width: '320px',
      data: {
        order: order
      }
    });
    
  }

  getOrderGeneratedDate(order: Order): string {
    let date = String (new Date(order.shipping.tracking.orderStatus[0][1]));
    let arrDate = date.split(" ");

    return arrDate[2] + " - " + arrDate[1] + " - " + arrDate[3];
  }

}
