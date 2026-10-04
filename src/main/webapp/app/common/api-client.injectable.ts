import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';


/**
 * Single place that knows the backend base URL. All entity services delegate
 * to this client instead of concatenating `environment.apiPath` themselves.
 * Cross-origin calls never send credentials (stateless demo API, no cookies).
 */
@Injectable({
  providedIn: 'root'
})
export class ApiClient {

  private http = inject(HttpClient);
  readonly baseUrl = environment.apiPath;

  get<T>(path: string, params?: HttpParams | Record<string, string | number | boolean>) {
    return this.http.get<T>(this.baseUrl + path, { params: params as HttpParams, withCredentials: false });
  }

  post<T>(path: string, body: unknown) {
    return this.http.post<T>(this.baseUrl + path, body, { withCredentials: false });
  }

  put<T>(path: string, body: unknown) {
    return this.http.put<T>(this.baseUrl + path, body, { withCredentials: false });
  }

  delete(path: string) {
    return this.http.delete(this.baseUrl + path, { withCredentials: false });
  }

}
