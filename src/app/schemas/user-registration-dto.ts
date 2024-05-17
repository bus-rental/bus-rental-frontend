export interface UserRegistrationDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  street: string;
  streetNr: string;
  zip: number;
  city: string;
}
