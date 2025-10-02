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
  form = this.fb.group({
    shipmentId: [null, [Validators.required, Validators.min(1)]]
  });

  result?: ProfitDto;
  loading = false;
  error?: string;

  constructor(private fb: FormBuilder, private profitService: ProfitService) {}

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = undefined;

    const id = this.form.value.shipmentId!;
    this.profitService.getProfitByShipmentId(id).subscribe({
      next: (dto: any) => { this.result = dto; this.loading = false; },
      error: (err: { error: any; message: any; }) => { this.error = err?.error || err?.message; this.loading = false; }
    });
  }
}
