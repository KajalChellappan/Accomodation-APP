import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccCardComponent } from './acc-card.component';

describe('AccCardComponent', () => {
  let component: AccCardComponent;
  let fixture: ComponentFixture<AccCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
