import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitCalculatorComponent } from './profit-calculator.component';

describe('ProfitCalculatorComponent', () => {
  let component: ProfitCalculatorComponent;
  let fixture: ComponentFixture<ProfitCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
