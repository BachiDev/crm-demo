import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { MemoDTO } from 'app/memo/memo.model';


@Injectable({
  providedIn: 'root',
})
export class MemoService {

  api = inject(ApiClient);
  resourcePath = '/api/memos';

  getAllMemoes() {
    return this.api.get<MemoDTO[]>(this.resourcePath);
  }

  getMemoesPaged(page: number, size: number) {
    return this.api.get<Page<MemoDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countMemoes() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getMemo(memoId: string) {
    return this.api.get<MemoDTO>(this.resourcePath + '/' + memoId);
  }

  createMemo(memoDTO: MemoDTO) {
    return this.api.post<string>(this.resourcePath, memoDTO);
  }

  updateMemo(memoId: string, memoDTO: MemoDTO) {
    return this.api.put<string>(this.resourcePath + '/' + memoId, memoDTO);
  }

  deleteMemo(memoId: string) {
    return this.api.delete(this.resourcePath + '/' + memoId);
  }

  getUserValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/userValues');
  }

}
