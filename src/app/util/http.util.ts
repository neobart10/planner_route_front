import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpUtil {

  constructor(private http: HttpClient, private router: Router) {
  }

  callError(observable) {
    /*observable.catch(
      error => {
        console.error(error)
        return observable;
      }
    )*/
    return observable;
  }

  post(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.post(url, body, {withCredentials: true, headers}));
  }

  get(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.get(url, {withCredentials: true, headers}));
  }

  put(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.put(url, body, {withCredentials: true, headers}));
  }

  delete(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.delete(url, {withCredentials: true, headers}));
  }

  patch(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.patch(url, body, {withCredentials: true, headers}));
  }

  head(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.head(url, {withCredentials: true, headers}));
  }

  options(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.options(url, {withCredentials: true, headers}));
  }
}
