import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.sass']
})
export class BuyersComponent implements OnInit {

  userName: string = 'John Doe';

  constructor() { }

  ngOnInit(): void {
  }

}
