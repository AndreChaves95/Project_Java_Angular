import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {ProfitService} from "../../services/profit.service";
import {ProfitDto} from "../../models/profit.model";

@Component({
  selector: 'app-profit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatLabel
  ],
  templateUrl: './profit-form.component.html',
  styleUrl: './profit-form.component.scss'
})

export class ProfitFormComponent {
  form = this.formBuilder.group({
    shipmentId: [null as number | null, [Validators.required, Validators.min(1)]] // Shipment ID must be a positive integer
  });

  profit?: ProfitDto;
  error?: string;

  constructor(private formBuilder: FormBuilder, private profitService: ProfitService) {}

  submit() {
    if (this.form.invalid) return;

    this.profit = undefined;  // Clear previous result
    this.error = undefined;
    const id = this.form.value.shipmentId!;
    this.profitService.getProfitByShipmentId(id).subscribe({
      next: (dto: any) => { this.profit = dto; },
      error: (err) => {
        if (err.status === 404) {
          this.error = `No shipment found with ID ${id}!`;
        } else {
          this.error = err?.error?.message || err?.message || 'Unexpected error occurred';
        }
      }
    });
  }
}
