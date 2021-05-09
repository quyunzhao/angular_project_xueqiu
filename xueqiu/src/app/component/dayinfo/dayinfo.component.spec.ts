import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayinfoComponent } from './dayinfo.component';

describe('DayinfoComponent', () => {
  let component: DayinfoComponent;
  let fixture: ComponentFixture<DayinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
