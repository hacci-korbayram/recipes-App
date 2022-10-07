import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDashboardComponent } from './recipe-dashboard.component';

describe('RecipeDashboardComponent', () => {
  let component: RecipeDashboardComponent;
  let fixture: ComponentFixture<RecipeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
