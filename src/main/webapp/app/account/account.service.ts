import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { AccountDTO } from 'app/account/account.model';


@Injectable({
  providedIn: 'root',
})
export class AccountService {

  api = inject(ApiClient);
  resourcePath = '/api/accounts';

  getAllAccounts() {
    return this.api.get<AccountDTO[]>(this.resourcePath);
  }

  getAccountsPaged(page: number, size: number, q?: string) {
    return this.api.get<Page<AccountDTO>>(this.resourcePath + '/paged', q ? { page, size, q } : { page, size });
  }

  countAccounts() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getAccount(accountId: string) {
    return this.api.get<AccountDTO>(this.resourcePath + '/' + accountId);
  }

  createAccount(accountDTO: AccountDTO) {
    return this.api.post<string>(this.resourcePath, accountDTO);
  }

  updateAccount(accountId: string, accountDTO: AccountDTO) {
    return this.api.put<string>(this.resourcePath + '/' + accountId, accountDTO);
  }

  deleteAccount(accountId: string) {
    return this.api.delete(this.resourcePath + '/' + accountId);
  }

  getOwnerValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
