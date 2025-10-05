import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';   // Import RouterOutlet and RouterLink for routing functionalities
import { CommonModule } from '@angular/common';               // Import CommonModule for common directives like ngIf, ngFor, etc.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-wrapper">
      <header class="hero-header">
        <div class="container">
          <div class="hero-content">
            <div class="logo-section">
              <div class="logo-icon">📦</div>
              <h1 class="hero-title">Dachser Profits Logistics</h1>
            </div>

            <nav class="navigation">
              <a class="nav-btn primary-btn" routerLink="/">
                <span class="label">Main Page</span>
              </a>
              <div class="nav-buttons">
                <a class="nav-btn primary-btn" routerLink="/calculate-profit">
                  <span class="label">Calculate Profit</span>
                </a>
                <a class="nav-btn primary-btn" routerLink="/shipment-profit">
                  <span class="label">Profit by Shipment</span>
                </a>
                <a class="nav-btn primary-btn" routerLink="/all-profits">
                  <span class="label">Total Profits</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .hero-header {
      background: linear-gradient(135deg, #003d7a 0%, #005cb8 50%, #0066cc 100%);
      color: white;
      padding: 3rem 0;
      box-shadow: 0 4px 20px rgba(0, 61, 122, 0.3);
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 1;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 2.5rem;
    }

    .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .logo-icon {
      font-size: 4rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      margin-top: 30px;
      color: #ffcc00;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.95;
      margin: 0;
      font-weight: 400;
      color: #ffcc00;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    }

    .navigation {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      width: 100%;
    }

    .nav-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      max-width: 800px;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 2rem;
      border-radius: 35px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      min-width: 180px;
      justify-content: center;
    }

    .primary-btn {
      background: linear-gradient(45deg, #ffcc00, #ffd633);
      color: #003d7a;
      border: 3px solid #ffcc00;
    }

    .label {
      white-space: nowrap;
      font-weight: 700;
    }

    .main-content {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 3rem 0;
      background: linear-gradient(to bottom, #f8f9fa, #ffffff);
      min-height: 60vh;
    }

    .content-wrapper {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: center;
    }
  `]
})
export class AppComponent {
}
