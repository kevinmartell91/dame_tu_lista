import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailComponent } from './display-detail.component';

describe('DisplayDetailComponent', () => {
  let component: DisplayDetailComponent;
  let fixture: ComponentFixture<DisplayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
