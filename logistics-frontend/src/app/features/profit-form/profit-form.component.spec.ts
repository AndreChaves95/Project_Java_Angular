import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ProfitFormComponent } from './profit-form.component';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';

describe('ProfitFormComponent', () => {
  let component: ProfitFormComponent;
  let fixture: ComponentFixture<ProfitFormComponent>;
  let profitService: jasmine.SpyObj<ProfitService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfitService', ['getProfitByShipmentId']);

    await TestBed.configureTestingModule({
      imports: [
        ProfitFormComponent,
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

    fixture = TestBed.createComponent(ProfitFormComponent);
    component = fixture.componentInstance;
    profitService = TestBed.inject(ProfitService) as jasmine.SpyObj<ProfitService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and calculate profit', () => {
    const mockProfit: ProfitDto = {
      shipmentId: 123,
      totalIncome: 1000,
      totalCost: 600,
      profitValue: 400
    };

    profitService.getProfitByShipmentId.and.returnValue(of(mockProfit));

    component.form.get('shipmentId')?.setValue(123);
    component.submit();

    expect(profitService.getProfitByShipmentId).toHaveBeenCalledWith(123);
    expect(component.profit).toEqual(mockProfit);
    expect(component.error).toBeUndefined();
  });

  it('should handle 404 error with specific message', () => {
    const error = { status: 404 };
    profitService.getProfitByShipmentId.and.returnValue(throwError(() => error));

    component.form.get('shipmentId')?.setValue(999);
    component.submit();

    expect(component.error).toBe('No shipment found with ID 999!');
    expect(component.profit).toBeUndefined();
  });
});
