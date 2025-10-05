import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProfitService } from './profit.service';
import { ProfitDto } from '../models/profit.model';
import { ProfitInputDto } from '../models/profit-input.model';

describe('ProfitService', () => {
  let service: ProfitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfitService,
        provideHttpClient(), // Nova API
        provideHttpClientTesting() // Nova API em vez de HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProfitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get profit by shipment id', () => {
    const mockProfit: ProfitDto = {
      shipmentId: 123,
      totalIncome: 1000,
      totalCost: 600,
      profitValue: 400
    };

    service.getProfitByShipmentId(123).subscribe(profit => {
      expect(profit).toEqual(mockProfit);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/profits/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfit);
  });

  it('should call get total profits', () => {
    const mockTotal: ProfitDto = {
      shipmentId: 0,
      totalIncome: 5000,
      totalCost: 3000,
      profitValue: 2000
    };

    service.getTotalProfits().subscribe(total => {
      expect(total).toEqual(mockTotal);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/profits/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockTotal);
  });

  it('should call calculate profit', () => {
    const input: ProfitInputDto = {
      shipmentId: 123,
      income: 1000,
      cost: 500,
      additionalCost: 100
    };

    const mockResult: ProfitDto = {
      shipmentId: 123,
      totalIncome: 1000,
      totalCost: 600,
      profitValue: 400
    };

    service.calculateProfit(input).subscribe(result => {
      expect(result).toEqual(mockResult);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/profits/calculate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(input);
    req.flush(mockResult);
  });
});
