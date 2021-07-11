import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteRetailersComponent } from './favorite-retailers.component';

describe('FavoriteRetailersComponent', () => {
  let component: FavoriteRetailersComponent;
  let fixture: ComponentFixture<FavoriteRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteRetailersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
