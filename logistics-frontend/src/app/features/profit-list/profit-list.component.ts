import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profit-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
  ],
  templateUrl: './profit-list.component.html'
})
export class ProfitListComponent implements OnInit {
  total?: ProfitDto;
  error?: string;

  constructor(private service: ProfitService) {}

  ngOnInit(): void {
    this.service.getTotalProfits().subscribe({
      next: (dto) => { this.total = dto; },
      error: (err) => { this.error = err?.error || err?.message; }
    });
  }
}
