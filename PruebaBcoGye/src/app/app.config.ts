import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient, HttpParams, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { jwtTokenInterceptor } from './core/interceptors/jwt-token.interceptor';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtTokenInterceptor]),
    ),
    BrowserModule,
    HttpClient, HttpParams,
    MessageService
  ]

};
