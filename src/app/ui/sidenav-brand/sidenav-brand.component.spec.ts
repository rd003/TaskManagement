import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavBrandComponent } from './sidenav-brand.component';

describe('SidenavBrandComponent', () => {
  let component: SidenavBrandComponent;
  let fixture: ComponentFixture<SidenavBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
