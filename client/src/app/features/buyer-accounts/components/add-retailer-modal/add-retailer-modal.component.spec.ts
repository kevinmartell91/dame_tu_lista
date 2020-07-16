import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetailerModalComponent } from './add-retailer-modal.component';

describe('AddRetailerModalComponent', () => {
  let component: AddRetailerModalComponent;
  let fixture: ComponentFixture<AddRetailerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRetailerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetailerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
