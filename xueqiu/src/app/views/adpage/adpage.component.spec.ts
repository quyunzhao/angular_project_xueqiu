import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpageComponent } from './adpage.component';

describe('AdpageComponent', () => {
  let component: AdpageComponent;
  let fixture: ComponentFixture<AdpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
