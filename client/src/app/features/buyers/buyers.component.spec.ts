import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersComponent } from './buyers.component';

describe('BuyersComponent', () => {
  let component: BuyersComponent;
  let fixture: ComponentFixture<BuyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a userName 'John Doe'`, async(() => {
    fixture = TestBed.createComponent(BuyersComponent);
    component = fixture.debugElement.componentInstance; 
    expect(component.userName).toEqual('John Doe');
  }));
});
