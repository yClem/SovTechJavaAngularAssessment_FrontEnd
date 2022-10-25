import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRestComponent } from './dashboard-rest.component';

describe('DashboardRestComponent', () => {
  let component: DashboardRestComponent;
  let fixture: ComponentFixture<DashboardRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
