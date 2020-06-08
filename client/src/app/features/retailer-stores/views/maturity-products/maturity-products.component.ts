import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass']
})
export class MaturityProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public maturityView: string;
  public question: string;

  constructor() { }

  ngOnInit(): void {
    this.maturityView = STORE_CONFIG.view_type.maturityView;
    this.question = STORE_CONFIG.question_view_type.maturityView;
  }
}
