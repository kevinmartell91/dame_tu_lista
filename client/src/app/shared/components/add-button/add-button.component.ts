import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Product } from 'src/app/core/retailer/types/product';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.sass']
})
export class AddButtonComponent implements OnInit {

  @Output() quantityUpdated = new EventEmitter <number>();
  @Output() sizeUpdated = new EventEmitter<string>();
  @Output() kiloOrUnitUpdated =  new EventEmitter<string>();

  @Input() isKiloUnitAvailable: boolean;
  @Input() isSizeAvailable: boolean;
  @Input() quantity: number;
  @Input() size: string;
  @Input() isCartProductButtonType: boolean = false;
  @Input() product: any;
  // valiable that let the app know how increment 
  // by kilograms or units
  @Input() isKilo: boolean;


  // hadles the increased or decreased quantity
  // which then is passed to its parent.
  // simutaneously is updated by @Input quantity
  // when this component is opened.
  count: number;
  
  // variable for updating visual selection 
  // on quantity options 
  isClickedKg: boolean = false;
  isClickedUni: boolean = false;
  isClickedSmall: boolean = false;
  isClickedMedium: boolean = false;
  isClickedBig: boolean = false;

  // increment each 0.25 kg
  surgeQuantity: number;

  countStr: string = "";

  
  constructor() { 
  }
  ngOnInit():void  {

    this.setbuttonTypeToRender(this.isCartProductButtonType);

    this.setSurgeQuantity();

    this.count = this.quantity;
    
    this.convertQuantiyToString();

    
    if(this.count == 0)
      this.quantityUpdate('+');

  }

  setSurgeQuantity():void {
    // choosing the sugerUni
    if( this.isKilo) {
      this.surgeQuantity = 0.25;
    } else { // units
      if( this.product.categoryName == 'Plátano'){
        this.surgeQuantity = 5;
      } else {  //other fruit by unit
        this.surgeQuantity = 1;
      }
    }
    console.log("setSurgeQuantity", this.isKilo, this.surgeQuantity);
  }
  setbuttonTypeToRender(isCartProductButtonType: boolean): void {

    if( isCartProductButtonType ) {

      this.isCartProductButtonType = true;

    } else {
      
      this.isCartProductButtonType = false;
    }
        
  }

  async quantityUpdate(operator:string){
    if(operator === "+") {
      this.count += this.surgeQuantity;
    } else { // discount quantity
      if(this.count > 0 ){
        this.count -= this.surgeQuantity;
      } else {
        // disable button 
        // or show a wasebasket
      }
    }

    this.convertQuantiyToString();
    // await this.delay(1500);
    
    console.log("this.quantityUpdated.emit(this.count)");
    this.quantityUpdated.emit(this.count)
  }
  
  convertQuantiyToString(): void {
        // here I can set how to increment or decrement quantity
    // depending on MANO, (UNITS || KG)
    if(this.isKilo) { 
      this.countStr = this.count.toFixed(2) + " kg.";
    } else {
      this.countStr = this.count.toString() + " Uni.";
    }
  }


  kiloOrUnitUpdate(mass: string) {
    this.updateKiliOrUnitSelection(mass);
    this.kiloOrUnitUpdated.emit(mass);
  }
  
  

  async sizeUpdate (size: string) {
    this.updateSizesSelection(size);
    // await this.delay(1500);
    this.sizeUpdated.emit(size);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve,ms));
  }

  updateSizesSelection(size: string) : void{
    switch (size) {
      case "S":
        this.isClickedSmall = true;
        this.isClickedMedium = false;
        this.isClickedBig = false;
        break;
    
      case "M":
        this.isClickedSmall = false;
        this.isClickedMedium = true;
        this.isClickedBig = false;
        
        break;
    
      default:
        this.isClickedSmall = false;
        this.isClickedMedium = false;
        this.isClickedBig = true;
        
        break;
    }
  }

  updateKiliOrUnitSelection(mass: string) : void{
    if(mass === "K") {
      this.isClickedKg = true;
      this.isClickedUni = false;
    } else {
      this.isClickedUni = true;
      this.isClickedKg = false;
    }
  }

 
}
