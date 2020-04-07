import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpUtil {

  constructor(private http: HttpClient, private router: Router) {
  }

  callError(observable) {
    /*.catch(
      error => {
        /*if (error.status == 401) {
          let navigationExtras = {
            queryParam: {url: this.router.url}
          };
          // this.router.navigate(['login'], navigationExtras);
        }
        else return error;
      }
    )*/
    return observable;
  }

  post(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.post(url, body, {withCredentials: true, headers: headers}));
  }

  get(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.get(url, {withCredentials: true, headers: headers}));
  }

  put(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.put(url, body, {withCredentials: true, headers: headers}));
  }

  delete(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.delete(url, {withCredentials: true, headers: headers}));
  }

  patch(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.patch(url, body, {withCredentials: true, headers: headers}));
  }

  head(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.head(url, {withCredentials: true, headers: headers}));
  }

  options(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.options(url, {withCredentials: true, headers: headers}));
  }
}
