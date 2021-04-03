import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.sass'],
})
export class CheckoutButtonComponent implements OnInit {
  @Input() numProducts: string;
  @Input() totalPrice: string;
  @Output() clickedButton = new EventEmitter<boolean>();

  isVisibleButton$: Subject<boolean> = new BehaviorSubject(false);

  constructor() {}

  ngOnInit(): void {}

  onClicked() {
    console.log('CLICKED EMIT then');
    this.clickedButton.emit(true);
  }
}
