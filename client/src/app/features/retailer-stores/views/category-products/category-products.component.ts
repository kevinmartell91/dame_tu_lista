import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.sass']
})
export class CategoryProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public categoryView: string;
  public question: string;

  constructor() { }

  ngOnInit(): void {
    this.categoryView = STORE_CONFIG.view_type.categoryView;
    this.question = STORE_CONFIG.question_view_type.categoryView;
  }

}
