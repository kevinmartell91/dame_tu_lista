import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerStoresComponent } from './retailer-stores.component';

describe('RetailerStoresComponent', () => {
  let component: RetailerStoresComponent;
  let fixture: ComponentFixture<RetailerStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should have a userName 'John Doe'`, async(() => {
    fixture = TestBed.createComponent(RetailerStoresComponent);
    component = fixture.debugElement.componentInstance; 
    expect(component.userName).toEqual('John Doe');
  }));
});
