import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLinksListComponent } from './sidenav-links-list.component';

describe('SidenavLinksListComponent', () => {
  let component: SidenavLinksListComponent;
  let fixture: ComponentFixture<SidenavLinksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavLinksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLinksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
