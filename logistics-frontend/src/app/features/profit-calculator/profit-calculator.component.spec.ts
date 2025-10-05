import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ProfitCalculatorComponent } from './profit-calculator.component';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';

describe('ProfitCalculatorComponent', () => {
  let component: ProfitCalculatorComponent;
  let fixture: ComponentFixture<ProfitCalculatorComponent>;
  let profitService: jasmine.SpyObj<ProfitService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfitService', ['calculateProfit']);

    await TestBed.configureTestingModule({
      imports: [
        ProfitCalculatorComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ProfitService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitCalculatorComponent);
    component = fixture.componentInstance;
    profitService = TestBed.inject(ProfitService) as jasmine.SpyObj<ProfitService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service when calculate is called with valid form', () => {
    const mockResult: ProfitDto = {
      shipmentId: 123,
      totalIncome: 100,
      totalCost: 60,
      profitValue: 40
    };

    profitService.calculateProfit.and.returnValue(of(mockResult));

    component.form.patchValue({
      shipmentId: '123',
      income: 100,
      cost: 50,
      additionalCost: 10
    });

    component.calculate();

    expect(profitService.calculateProfit).toHaveBeenCalled();
    expect(component.results).toContain(mockResult);
  });

  it('should handle service error', () => {
    const errorMessage = 'Service error';
    profitService.calculateProfit.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.form.patchValue({
      shipmentId: 'error',
      income: 100,
      cost: 50,
      additionalCost: 10
    });

    component.calculate();

    expect(component.error).toBe(errorMessage);
  });
});
