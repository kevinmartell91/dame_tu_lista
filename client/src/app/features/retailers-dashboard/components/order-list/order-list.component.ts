import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Order } from 'src/app/core/order/types/order';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';
import { Subscription } from 'rxjs';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { ORDER_CONFIG } from 'src/app/core/order/order.config';
import { TemporaryStorageService, TemporaryStorageFacet } from 'src/app/core/session-storage/services/temporary-storage.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnDestroy {
   
  step = 0;
  
  authenticationSubscription: Subscription;
  orderSubscription: Subscription;

  isMobileView: boolean;
  isOrderCompleted: boolean = false;

  retailer: Retailer;

  temporaryStorage: TemporaryStorageFacet;

  constructor(
    public orderStore: OrderStore,
    private authenticationStore: AuthenticationStore,
    private temporaryStorageService: TemporaryStorageService
  ) {

    this.temporaryStorage = this.temporaryStorageService.forKey("orders_by_retailer");


    this.authenticationSubscription = this.authenticationStore.loginUser$.subscribe(
      x => {
        this.retailer = new Retailer().deserialize(x.entity);
        console.log("authenticationSubscription", this.retailer._id);
      }
    )

    this.orderSubscription = this.orderStore.orderListByRetailerId$.subscribe( 
      y => {
        this.saveToTemporaryStorage(y);
      }
    )


    this.init();

   }

  init(): void {

    this.restoreFromTemporaryStorage();
    this.orderStore.initOrderByRetailerId(this.retailer._id);
    this.isMobileView = true;

  }

  ngOnDestroy() {

    this.authenticationSubscription.unsubscribe();

  }

  
  onIsProductOrderCompleted( buttonIndex: string,  data: any): void{
    
    let orders = this.orderStore.state.orderListByRetailerId;

    orders.forEach(order => {
      if( data.order_id == order._id) {
        console.log("LISTENING => this.isOrderCompleted", data.order_id, order._id);
        order.cart.filter( productOrder => {
          if( productOrder._id == data.cartProductOrder_id ) {
            productOrder.isCheckedDone = !productOrder.isCheckedDone;
            console.log("Mached checked DONE => ", productOrder.isCheckedDone);
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
          
          console.log("this.isOrderCompleted",this.isOrderCompleted);

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
      res => {console.log(res)}
    )

  }

  
  
  setStep(index: number, order: Order) {

    this.step = index;
    this.setNewOrderStatus(ORDER_CONFIG.orderStatus.seen_by_retailer, order);

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

    // remove data from temporary storage
    // this.temporaryStorage.remove();
 
  }


  saveToTemporaryStorage(orders: Order[]): void {
    console.log("saveToTemporaryStorage");

    this.temporaryStorage.set(orders);
  }

  getLastStatus(status: any): string {
    let lastStatus =  status[status.length -1];
    return lastStatus[0];
  }

  openWhatsApp(order: Order): void {
    let message = "Tu orden ta esta en camino";
    let link =`//api.whatsapp.com/send?phone=${order.shipping.buyer.phoneNumber}&text=${message}`;
    console.log("CLICKEDDDDD");
    window.location.href=link;
  }  
}
