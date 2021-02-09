import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFreeBillComponent } from './send-free-bill.component';

describe('SendFreeBillComponent', () => {
  let component: SendFreeBillComponent;
  let fixture: ComponentFixture<SendFreeBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFreeBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFreeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
