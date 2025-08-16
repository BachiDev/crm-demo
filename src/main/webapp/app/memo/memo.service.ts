import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MemoDTO } from 'app/memo/memo.model';


@Injectable({
  providedIn: 'root',
})
export class MemoService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/memos';

  getAllMemoes() {
    return this.http.get<MemoDTO[]>(this.resourcePath);
  }

  getMemo(memoId: string) {
    return this.http.get<MemoDTO>(this.resourcePath + '/' + memoId);
  }

  createMemo(memoDTO: MemoDTO) {
    return this.http.post<string>(this.resourcePath, memoDTO);
  }

  updateMemo(memoId: string, memoDTO: MemoDTO) {
    return this.http.put<string>(this.resourcePath + '/' + memoId, memoDTO);
  }

  deleteMemo(memoId: string) {
    return this.http.delete(this.resourcePath + '/' + memoId);
  }

  getUserValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/userValues');
  }

}
