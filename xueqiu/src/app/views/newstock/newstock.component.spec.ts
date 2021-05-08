import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstockComponent } from './newstock.component';

describe('NewstockComponent', () => {
  let component: NewstockComponent;
  let fixture: ComponentFixture<NewstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
