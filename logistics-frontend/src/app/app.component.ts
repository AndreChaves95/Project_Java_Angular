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
        <div>
          <a class="nav-link d-inline me-2" routerLink="/shipment-profit">Shipment Profit</a>
        </div>
        <div>
          <a class="nav-link d-inline" routerLink="/all-profits">Total Profit</a>
        </div>
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
