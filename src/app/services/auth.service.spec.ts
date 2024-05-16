import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { JwtDto } from '../schemas/jwt-dto';
import { LoginDto } from '../schemas/login-dto';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding HTTP requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request and return a JWT', () => {
    const mockResponse: JwtDto = { accessToken: 'test-jwt-token' };
    const loginCredentials: LoginDto = { email: 'testuser', password: 'password' };

    service.login(loginCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginCredentials);

    req.flush(mockResponse);
  });
});
