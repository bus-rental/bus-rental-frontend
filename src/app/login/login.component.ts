import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoggingService} from "../services/logging.service";
import {SnackbarService} from "../services/snackbar.service";
import {JwtDto} from "../schemas/jwt-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: JwtDto) => {
          localStorage.setItem('token', response.accessToken);
          this.logger.debug('received token: ' + response.accessToken);
          this.snackbarService.showMessage('Login erfolgreich!');
          this.router.navigate(['/']).then(() => this.logger.log('Navigated to home'));
        },
        error: (error) => {
          console.error('Login failed', error);
          this.snackbarService.showMessage(`Login fehlgeschlagen: ${error.error}`);
        }
      });
    }
  }
}
