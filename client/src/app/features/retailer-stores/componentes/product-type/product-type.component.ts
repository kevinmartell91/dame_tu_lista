import { Component, OnInit, Input } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/retailer/types/product';
import { RetailerStoreStore } from '../../services/retailer.store';


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.sass']
})
export class ProductTypeComponent implements OnInit {

  @Input() productTypes: string[];
  // control = new FormControl();

  filteredProductTypeList$: Observable<Product[]>;
  filteredProductTypeList: Product[];
  filteredProductListLength: number;


  
  constructor(
    public retailerStoreStore: RetailerStoreStore
  ) { }

  ngOnInit(): void {
    // this.filteredProductsList$ = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }

  filterProductType($event) : Product[] {
    // this.filteredProductTypeList$ = Observable.of(this.productTypes.map(type => this._filter(type)));
    console.log("TYPE SELECTED $event : ", $event.tab.textLabel);
    const producTypeSelected = $event.tab.textLabel;
    this.filteredProductTypeList = this.retailerStoreStore.state.productsList.products.filter(
      prod => this._normalizeValue(prod.categoryName).includes(this._normalizeValue(producTypeSelected)));
    console.log("list", this.filteredProductTypeList);
    return null;
  }


  // private _filter(value: string): Product[] {
  //   const filterValue = this._normalizeValue(value);
  //   let res = this.retailerStoreStore.state.productsList.products.filter(prod => this._normalizeValue(prod.categoryName).includes(filterValue));
  //   this.filteredProductListLength = res.length;
  //   return res ;
  // }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
