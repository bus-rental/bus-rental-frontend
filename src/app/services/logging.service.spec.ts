import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';

describe('LoggingService', () => {
  let service: LoggingService;
  let originalProduction: boolean;
  let consoleLogSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;
  let consoleDebugSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);

    // Preserve original environment.production value
    originalProduction = environment.production;

    // Spy on console methods
    consoleLogSpy = spyOn(console, 'log');
    consoleWarnSpy = spyOn(console, 'warn');
    consoleErrorSpy = spyOn(console, 'error');
    consoleDebugSpy = spyOn(console, 'debug');
  });

  afterEach(() => {
    // Restore original environment.production value
    environment.production = originalProduction;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('log method', () => {
    it('should log message when not in production', () => {
      environment.production = false;
      const message = 'Test log message';

      service.log(message);

      expect(consoleLogSpy).toHaveBeenCalledWith(message);
    });

    it('should not log message when in production', () => {
      environment.production = true;
      const message = 'Test log message';

      service.log(message);

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe('warn method', () => {
    it('should warn message when not in production', () => {
      environment.production = false;
      const message = 'Test warn message';

      service.warn(message);

      expect(consoleWarnSpy).toHaveBeenCalledWith(message);
    });

    it('should not warn message when in production', () => {
      environment.production = true;
      const message = 'Test warn message';

      service.warn(message);

      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('error method', () => {
    it('should error message when not in production', () => {
      environment.production = false;
      const message = 'Test error message';

      service.error(message);

      expect(consoleErrorSpy).toHaveBeenCalledWith(message);
    });

    it('should not error message when in production', () => {
      environment.production = true;
      const message = 'Test error message';

      service.error(message);

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('debug method', () => {
    it('should debug message when not in production', () => {
      environment.production = false;
      const message = 'Test debug message';

      service.error(message);

      expect(consoleDebugSpy).toHaveBeenCalledWith(message);
    });

    it('should not debug message when in production', () => {
      environment.production = true;
      const message = 'Test debug message';

      service.error(message);

      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });
});
