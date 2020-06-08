import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.sass']
})
export class VarietyProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public seasonalView: string;
  public question: string;

  constructor() { }

  ngOnInit(): void {
    this.seasonalView = STORE_CONFIG.view_type.seasonalView;
    this.question = STORE_CONFIG.question_view_type.seasonalView;
  }

}
