import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoggingService } from '../services/logging.service';
import { SnackbarService } from '../services/snackbar.service';
import { UserDto } from '../schemas/user-dto';
import { UserRegistrationDto } from '../schemas/user-registration-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetNr: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: UserRegistrationDto = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response: UserDto) => {
          this.logger.debug('User registered: ' + response.email);
          this.snackbarService.showMessage('Registration successful!');
          this.router.navigate(['/login']).then(() => this.logger.log('Navigated to login'));
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.snackbarService.showMessage(`Registration failed: ${error.error}`);
        }
      });
    }
  }
}
