import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { UserDTO } from 'app/user/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  api = inject(ApiClient);
  resourcePath = '/api/users';

  getAllUsers() {
    return this.api.get<UserDTO[]>(this.resourcePath);
  }

  getUsersPaged(page: number, size: number) {
    return this.api.get<Page<UserDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countUsers() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getUser(userId: string) {
    return this.api.get<UserDTO>(this.resourcePath + '/' + userId);
  }

  createUser(userDTO: UserDTO) {
    return this.api.post<string>(this.resourcePath, userDTO);
  }

  updateUser(userId: string, userDTO: UserDTO) {
    return this.api.put<string>(this.resourcePath + '/' + userId, userDTO);
  }

  deleteUser(userId: string) {
    return this.api.delete(this.resourcePath + '/' + userId);
  }

}
