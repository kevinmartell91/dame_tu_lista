import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerAccountsComponent } from './buyer-accounts.component';

describe('BuyerAccountsComponent', () => {
  let component: BuyerAccountsComponent;
  let fixture: ComponentFixture<BuyerAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerAccountsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
