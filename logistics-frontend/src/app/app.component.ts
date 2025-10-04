import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';   // Import RouterOutlet and RouterLink for routing functionalities
import { CommonModule } from '@angular/common';               // Import CommonModule for common directives like ngIf, ngFor, etc.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand bg-light mb-3 p-2">
      <div class="container">
        <h3>Logistics Profits</h3>
        <a class="navbar-brand" routerLink="/">Back to Main Page</a>
        <p></p>
        <a class="btn btn-outline-primary" routerLink="/calculate-profit">Calculate Profit</a>
        <p></p>
        <a class="btn btn-outline-secondary" routerLink="/shipment-profit">Shipment Profit</a>
        <p></p>
        <a class="btn btn-outline-secondary" routerLink="/all-profits">Total Profits</a>
      </div>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'logistics-frontend';
}
