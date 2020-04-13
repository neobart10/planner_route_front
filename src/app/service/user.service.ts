import {Injectable, ViewEncapsulation } from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { User } from '../model/user';
import {catchError} from 'rxjs/internal/operators';
import {isNull} from '@angular/compiler/src/output/output_ast';

@Injectable()
export class UserService {

  constructor(private http: HttpUtil) {
  }

  getAll(): Observable<Array<User>> {
    return this.http.get(environment.url + '/user').pipe(map(
      (data: any) =>
        data.map(
          json => User.fromJson(json)
        )
    ));
  }


  get(id): Observable<User> {
    return this.http.get(environment.url + '/user/' + id).pipe(map(
      (data: any) => {
        if (data === null){
          console.error('204 - User not exist.')
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }

  save(user): Observable<User> {
    return this.http.post(environment.url + '/user', JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }

  update(user, id): Observable<User> {
    return this.http.put(environment.url + '/user/' + id, JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data === null){
          console.error('204 - User not exist.')
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }


  login(user): Observable<User> {
    return this.http.post(environment.url + '/user/login', JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }
}
