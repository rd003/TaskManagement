import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageHeadingComponent } from './content-page-heading.component';

describe('ContentPageHeadingComponent', () => {
  let component: ContentPageHeadingComponent;
  let fixture: ComponentFixture<ContentPageHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPageHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPageHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
