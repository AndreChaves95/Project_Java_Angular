import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ProfitListComponent } from './profit-list.component';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';

describe('ProfitListComponent', () => {
  let component: ProfitListComponent;
  let fixture: ComponentFixture<ProfitListComponent>;
  let profitService: jasmine.SpyObj<ProfitService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfitService', ['getTotalProfits']);

    await TestBed.configureTestingModule({
      imports: [
        ProfitListComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ProfitService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitListComponent);
    component = fixture.componentInstance;
    profitService = TestBed.inject(ProfitService) as jasmine.SpyObj<ProfitService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load total profits on init', () => {
    const mockTotal: ProfitDto = {
      shipmentId: 0,
      totalIncome: 5000,
      totalCost: 3000,
      profitValue: 2000
    };

    profitService.getTotalProfits.and.returnValue(of(mockTotal));

    component.ngOnInit();

    expect(profitService.getTotalProfits).toHaveBeenCalled();
    expect(component.total).toEqual(mockTotal);
    expect(component.error).toBeUndefined();
  });

  it('should handle service error with fallback message', () => {
    const error = {};
    profitService.getTotalProfits.and.returnValue(throwError(() => error));

    component.ngOnInit();

    expect(component.error).toBe('Failed to load profits of all shipments');
    expect(component.total).toBeUndefined();
  });

  it('should call getTotalProfits on component initialization', () => {
    profitService.getTotalProfits.and.returnValue(of({
      shipmentId: 0,
      totalIncome: 1000,
      totalCost: 600,
      profitValue: 400
    }));

    fixture.detectChanges(); // This triggers ngOnInit

    expect(profitService.getTotalProfits).toHaveBeenCalledTimes(1);
  });
});
