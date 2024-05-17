import { UserRoleEnum } from './user-role-enum';

export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  streetNr: string;
  zip: number;
  city: string;
  userRole: UserRoleEnum;
}
