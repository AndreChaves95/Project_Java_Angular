import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shipment-profit',
    loadComponent: () => import('./features/profit-form/profit-form.component').then(m => m.ProfitFormComponent)
  },
  {
    path: 'all-profits',
    loadComponent: () => import('./features/profit-list/profit-list.component').then(m => m.ProfitListComponent)
  },
  {
    path: 'calculate-profit',
    loadComponent: () => import('./features/profit-calculator/profit-calculator.component').then((m) => m.ProfitCalculatorComponent)
  },
  { path: '**', redirectTo: '' }
];
