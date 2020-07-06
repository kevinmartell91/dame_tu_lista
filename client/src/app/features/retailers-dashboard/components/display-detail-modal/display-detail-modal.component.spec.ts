import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailModalComponent } from './display-detail-modal.component';

describe('DisplayDetailModalComponent', () => {
  let component: DisplayDetailModalComponent;
  let fixture: ComponentFixture<DisplayDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
