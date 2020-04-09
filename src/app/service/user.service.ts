import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { User } from '../model/user';

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
         return User.fromJson(data);
      }
    ));
  }

  save(user): Observable<User> {
    return this.http.post(environment.url + '/user', JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data) { return User.fromJson(data); } else { return data; }
      }
    ));
  }

  update(user, id): Observable<User> {
    return this.http.put(environment.url + '/user/' + id, JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data) { return User.fromJson(data); } else { return data; }
      }
    ));
  }
}
