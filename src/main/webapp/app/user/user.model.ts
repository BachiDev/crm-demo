export class UserDTO {

  constructor(data:Partial<UserDTO>) {
    Object.assign(this, data);
  }

  userId?: string|null;
  username?: string|null;
  email?: string|null;
  passwordHash?: string|null;
  firstName?: string|null;
  lastName?: string|null;

}
