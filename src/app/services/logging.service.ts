import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(message: string): void {
    if (!environment.production) {
      console.log(message);
    }
  }

  warn(message: string): void {
    if (!environment.production) {
      console.warn(message);
    }
  }

  error(message: string): void {
    if (!environment.production) {
      console.error(message);
    }
  }
}
