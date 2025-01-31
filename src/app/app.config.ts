import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(),
    {
      provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance:'outline',
        subscriptSizing:'dynamic'
      }
    }
  ]

};



