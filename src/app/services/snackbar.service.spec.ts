import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackbarService]
    });
    service = TestBed.inject(SnackbarService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with correct message, action and configuration', () => {
    const spy = spyOn(snackBar, 'open');
    const message = 'Test Message';
    const action = 'Test Action';
    const duration = 5000;

    service.showMessage(message, action, duration);

    expect(spy).toHaveBeenCalledWith(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });

  it('should use default values if no action and duration are provided', () => {
    const spy = spyOn(snackBar, 'open');
    const message = 'Test Message';

    service.showMessage(message);

    expect(spy).toHaveBeenCalledWith(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });
});
