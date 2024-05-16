import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login.component';
import {AuthService} from '../services/auth.service';
import {LoggingService} from '../services/logging.service';
import {SnackbarService} from '../services/snackbar.service';
import {JwtDto} from '../schemas/jwt-dto';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loggerSpy: jasmine.SpyObj<LoggingService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = {navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))};
    const loggerMock = jasmine.createSpyObj('LoggingService', ['debug', 'log']);
    const snackbarMock = jasmine.createSpyObj('SnackbarService', ['showMessage']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: Router, useValue: routerMock},
        {provide: LoggingService, useValue: loggerMock},
        {provide: SnackbarService, useValue: snackbarMock},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    loggerSpy = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
    snackbarSpy = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the email control required', () => {
    const control = component.loginForm.get('email');
    if (control === null) throw new Error('email control is null');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the password control required', () => {
    const control = component.loginForm.get('password');
    if (control === null) throw new Error('password control is null');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should call authService.login on form submit when the form is valid', () => {
    const mockResponse: JwtDto = {accessToken: 'test-jwt-token'};
    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({email: 'test@example.com', password: 'password'});
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    expect(localStorage.getItem('token')).toBe('test-jwt-token');
    expect(loggerSpy.debug).toHaveBeenCalledWith('received token: test-jwt-token');
    expect(snackbarSpy.showMessage).toHaveBeenCalledWith('Login erfolgreich!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show an error message if login fails', () => {
    const errorResponse = {error: 'Invalid credentials'};
    authServiceSpy.login.and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({email: 'test@example.com', password: 'password'});
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    expect(snackbarSpy.showMessage).toHaveBeenCalledWith('Login fehlgeschlagen: Invalid credentials');
  });
});
