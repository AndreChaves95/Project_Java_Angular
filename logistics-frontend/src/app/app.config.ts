import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // This is needed because Angular 17 uses Zone.js for change detection by default (event coalescing improves performance by grouping multiple events into a single change detection cycle)
    provideHttpClient(),  // This is needed to make HTTP requests
    provideRouter(routes),  // This is needed to set up routing
    provideClientHydration()  // This is needed for server-side rendering (SSR) to hydrate the app on the client side
  ]
};
