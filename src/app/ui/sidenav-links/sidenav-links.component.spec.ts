import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLinksComponent } from './sidenav-links.component';

describe('SidenavLinksComponent', () => {
  let component: SidenavLinksComponent;
  let fixture: ComponentFixture<SidenavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
