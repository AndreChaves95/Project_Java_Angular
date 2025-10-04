import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfitDto} from "../models/profit.model";
import {ProfitInputDto} from "../models/profit-input.model";

@Injectable({
  providedIn: 'root'
})
export class ProfitService {

  private baseUrl = 'http://localhost:8080/api/profits';

  constructor(private http: HttpClient) {}

  // GET /api/profits/{shipmentId}
  getProfitByShipmentId(id: number): Observable<ProfitDto> {
    return this.http.get<ProfitDto>(`${this.baseUrl}/${id}`);
  }

  // GET /api/profits/all
  getTotalProfits(): Observable<ProfitDto> {
    return this.http.get<ProfitDto>(`${this.baseUrl}/all`);
  }

  calculateProfit(input: ProfitInputDto) {
    return this.http.post<ProfitDto>(`${this.baseUrl}/calculate`, input);
  }
}
