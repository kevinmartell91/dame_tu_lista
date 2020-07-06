import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersDashboardComponent } from './retailers-dashboard.component';

describe('RetailersDashboardComponent', () => {
  let component: RetailersDashboardComponent;
  let fixture: ComponentFixture<RetailersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
