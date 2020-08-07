import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ProductDetail } from '../../types/product-detail';
import { DisplayDetailComponent } from "../display-detail/display-detail.component";

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass'],
  animations: [
    trigger('slideInOutDetails', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', animate(1000, style({opacity: 0}))),
      transition('out => in', animate(1000, style({opacity: 1})))
    ]),
    trigger('slideInOut_IsKilograsmOrUnits', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-1010%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOut_quantity', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-1010%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOutGraphis', [
      state('in', style({
        transform: 'translate3d(0, 35%, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      // state('in_graph_video', style({
      //   transform: 'translate3d(0, 0, 0)'
      // })),
      // state('out_graph_video', style({
      //   transform: 'translate3d(0, 0, 0)'
      // })),
      // transition('in_graph_video => out_graph_video', animate('400ms ease-in-out')),
      // transition('out_graph_video => in_graph_video', animate('400ms ease-in-out')),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ProductDisplayComponent {

  @Input() product_name :string;
  @Input() url_img: string;
  // @Input() quantity: number;
  // @Input() type_quantity: string;
  // @Input() size: string;
  // @Input() last_for: string;


  productDetail: ProductDetail;

  //////  Child parent comunication implementation //////
  receivedDisplayDetail: ProductDetail;
  @Output() productDisplayEmmit = new EventEmitter<ProductDetail>();
 // ///////////////////////////////////////////////////////
  private dialogRef : any;

  kilogramsOrUnits_animation:string = 'out';
  quantity_animation:string = 'out';
  graphState:string = 'out';

  constructor(private matDialog: MatDialog ) { 
    
  }

  openDisplayDetail():void {
    this.dialogRef = this.matDialog.open(DisplayDetailComponent, {
      width: '320px',
      // height:'500px',
      data: {
        name: this.product_name, 
        
      }
    });

    this.dialogRef.afterClosed().subscribe( result => {
      this.productDetail = result;
      console.log("ProductDetail KEVIN from Modal", this.productDetail);
    });
  }

  toggleIsKiligramsOrUnits() {

    this.kilogramsOrUnits_animation = this.kilogramsOrUnits_animation === 'out' ? 'in' : 'out';
    this.quantity_animation = this.quantity_animation === 'out' ? 'in' : 'out';


    this.openDisplayDetail();
  }




  //////  Child parent comunication implementation //////
  getDisplayDetail(displayDetail: ProductDetail){
    // console.log("displayDetaill => ",displayDetail);
    this.receivedDisplayDetail = displayDetail;
    this.productDisplayEmmit.emit(this.receivedDisplayDetail);
  }
}
