import { Component } from '@angular/core';
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
  form = this.fb.group({
    shipmentId: ['', [Validators.required]],
    income: [0, [Validators.required, Validators.min(0)]],
    cost: [0, [Validators.required, Validators.min(0)]],
    additionalCost: [0, [Validators.required, Validators.min(0)]]
  });

  results: ProfitDto[] = [];
  error?: string;
  displayedColumns = ['totalIncome', 'totalCost', 'profitValue'];

  constructor(private fb: FormBuilder, private profitService: ProfitService) {}

  calculate() {
    if (this.form.invalid) return;

    this.error = undefined;
    const formValue = this.form.value;
    const input: ProfitInputDto = {
      shipmentId: parseInt(formValue.shipmentId as string),
      income: formValue.income as number,
      cost: formValue.cost as number,
      additionalCost: formValue.additionalCost as number
    };

    console.log('Input being sent:', input);
    console.log('Current results array before request:', this.results);

    this.profitService.calculateProfit(input).subscribe({
      next: (dto) => {
        console.log('Response received:', dto);
        console.log('Type of response:', typeof dto);
        console.log('Response keys:', Object.keys(dto));
        this.results.unshift(dto);
        console.log('Results array after adding:', this.results);
        console.log('Results array length:', this.results.length);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.error = err?.error?.message || 'An error occurred';
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
