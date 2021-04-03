import { Component, OnInit } from '@angular/core';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
})
export class HomepageComponent implements OnInit {
  constructor(public buyerNavegationStore: BuyerNavegationStore) {}

  ngOnInit(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.homepageView,
      'navegation.homepageView'
    );
  }
}
