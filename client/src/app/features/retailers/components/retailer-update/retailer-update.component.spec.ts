import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerUpdateComponent } from './retailer-update.component';

describe('RetailerUpdateComponent', () => {
  let component: RetailerUpdateComponent;
  let fixture: ComponentFixture<RetailerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
