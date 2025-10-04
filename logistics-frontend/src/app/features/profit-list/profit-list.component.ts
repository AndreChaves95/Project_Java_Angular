import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';
import { MatCard } from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-profit-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
  ],
  templateUrl: './profit-list.component.html'
})
export class ProfitListComponent implements OnInit {
  total?: ProfitDto;
  error?: string;
  displayedColumns = ['totalIncome', 'totalCost', 'profitValue'];

  constructor(private service: ProfitService) {}

  ngOnInit(): void {
    this.service.getTotalProfits().subscribe({
      next: (dto) => { this.total = dto; },
      error: (err) => { this.error = err?.error || err?.message || 'Failed to load profits of all shipments'; }
    });
  }
}
