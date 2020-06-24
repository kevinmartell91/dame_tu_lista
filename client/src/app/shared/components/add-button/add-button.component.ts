import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

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
  
  constructor() { 
    this.setbuttonTypeToRender(this.isCartProductButtonType);
  }
  ngOnInit():void  {

    this.count = this.quantity;
    
    if(this.count == 0)
      this.quantityUpdate('+');

  }

  setbuttonTypeToRender(isCartProductButtonType: boolean): void {

    if( isCartProductButtonType ) {

      this.isCartProductButtonType = true;

    } else {
      
      this.isCartProductButtonType = false;
    }
        
  }

  quantityUpdate(operator:string){
    if(operator === "+") {
      this.count++;
    } else { // discount quantity
      if(this.count > 0 ){
        this.count--;
      } else {
        // disable button 
        // or show a wasebasket
      }
    }
    console.log("this.quantityUpdated.emit(this.count)");
    this.quantityUpdated.emit(this.count)
  }

  kiloOrUnitUpdate(mass: string) {
    this.updateKiliOrUnitSelection(mass);
    this.kiloOrUnitUpdated.emit(mass);
  }
  
  

  async sizeUpdate (size: string) {
    this.updateSizesSelection(size);
    // await this.delay(1000);
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
