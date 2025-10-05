import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfitService } from '../../services/profit.service';
import { ProfitDto } from '../../models/profit.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { ProfitInputDto } from "../../models/profit-input.model";

@Component({
  selector: 'app-profit-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatTableModule,
    MatDivider,
    MatLabel
  ],
  templateUrl: './profit-calculator.component.html'
})
export class ProfitCalculatorComponent {
  form = this.formBuilder.group({
    shipmentId: ['', [Validators.required]],
    income: [0, [Validators.required, Validators.min(0)]],
    cost: [0, [Validators.required, Validators.min(0)]],
    additionalCost: [0, [Validators.required, Validators.min(0)]]
  });

  results: ProfitDto[] = [];
  error?: string;
  displayedColumns = ['shipmentId', 'totalIncome', 'totalCost', 'profitValue'];

  constructor(
    private formBuilder: FormBuilder,
    private profitService: ProfitService,
    private cdr: ChangeDetectorRef
  ) {}

  calculate() {
    if (this.form.invalid) return;

    this.error = undefined;
    const formValue = this.form.value;

    // Validate that all required values are present
    if (!formValue.shipmentId || formValue.income == 0 || formValue.cost == 0) {
      this.error = 'Please, insert all required values.';
      return;
    }

    const input: ProfitInputDto = {
      shipmentId: parseInt(formValue.shipmentId as string),
      income: Number(formValue.income),
      cost: Number(formValue.cost),
      additionalCost: Number(formValue.additionalCost)
    };

    this.profitService.calculateProfit(input).subscribe({
      next: (dto) => {
        // Always create a new array to ensure change detection
        const existingIndex = this.results.findIndex(r => r.shipmentId === dto.shipmentId);
        if (existingIndex >= 0) {
          // Update existing result
          const newResults = [...this.results];
          newResults[existingIndex] = dto;
          this.results = newResults;
        } else {
          // Add new input to the top of the list
          this.results = [dto, ...this.results];
        }
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err?.error?.message;
        this.cdr.detectChanges();
      }
    });
  }

  canCalculate(): boolean {
    const shipmentId = this.form.get('shipmentId')!;
    const income = this.form.get('income')!;
    const cost = this.form.get('cost')!;
    const additionalCost = this.form.get('additionalCost')!;
    return shipmentId.valid && income.valid && cost.valid && additionalCost.valid;
  }
}
