import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraphqlComponent } from './dashboard-graphql.component';

describe('DashboardGraphqlComponent', () => {
  let component: DashboardGraphqlComponent;
  let fixture: ComponentFixture<DashboardGraphqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGraphqlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
