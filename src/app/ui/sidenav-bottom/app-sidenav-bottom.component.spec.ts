import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidenavBottomComponent } from './app-sidenav-bottom.component';

describe('AppSidenavBottomComponent', () => {
  let component: AppSidenavBottomComponent;
  let fixture: ComponentFixture<AppSidenavBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSidenavBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSidenavBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
