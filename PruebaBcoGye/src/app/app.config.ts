import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient, HttpParams, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { jwtTokenInterceptor } from './core/interceptors/jwt-token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([jwtTokenInterceptor]),
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClient, HttpParams,
    MessageService,
    ToastrModule,
  ]

};
