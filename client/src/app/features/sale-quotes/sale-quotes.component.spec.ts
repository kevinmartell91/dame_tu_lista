import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleQuotesComponent } from './sale-quotes.component';

describe('SaleQuotesComponent', () => {
  let component: SaleQuotesComponent;
  let fixture: ComponentFixture<SaleQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
