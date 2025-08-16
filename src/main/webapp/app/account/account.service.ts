import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AccountDTO } from 'app/account/account.model';


@Injectable({
  providedIn: 'root',
})
export class AccountService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/accounts';

  getAllAccounts() {
    return this.http.get<AccountDTO[]>(this.resourcePath);
  }

  getAccount(accountId: string) {
    return this.http.get<AccountDTO>(this.resourcePath + '/' + accountId);
  }

  createAccount(accountDTO: AccountDTO) {
    return this.http.post<string>(this.resourcePath, accountDTO);
  }

  updateAccount(accountId: string, accountDTO: AccountDTO) {
    return this.http.put<string>(this.resourcePath + '/' + accountId, accountDTO);
  }

  deleteAccount(accountId: string) {
    return this.http.delete(this.resourcePath + '/' + accountId);
  }

  getOwnerValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
