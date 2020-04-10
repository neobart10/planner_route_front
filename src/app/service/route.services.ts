import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Route} from '../model/route';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {User} from '../model/user';

@Injectable()
export class RouteService {

  constructor(private http: HttpUtil) {
  }

  getAll(): Observable<Array<Route>> {
    return this.http.get(environment.url + '/route').pipe(map(
      (data: any) =>
        data.map(
          json => Route.fromJson(json)
        )
    ));
  }


  get(id): Observable<Route> {
    return this.http.get(environment.url + '/route/' + id).pipe(map(
      (data: any) => {
        if (data === null) {
          console.error('204 - Route not exist.')
          return null;
        } else {
          return Route.fromJson(data);
        }
      }
    ));
  }

  getByIdUser(idUser): Observable<Array<Route>> {
    return this.http.get(environment.url + '/route/byUser/' + idUser).pipe(map(
      (data: any) =>
        data.map(
          json => Route.fromJson(json)
        )
    ));
  }

  save(route): Observable<Route> {
    return this.http.post(environment.url + '/route/', JSON.stringify(route),
      new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return Route.fromJson(data);
        }
      }
    ));
  }

  update(route, id): Observable<Route> {
    return this.http.put(environment.url + '/route/' + id, JSON.stringify(route),
      new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data === null) {
          console.error('204 - Route not exist.')
          return null;
        } else {
          return Route.fromJson(data);
        }
      }
    ));
  }

  delete(id) {
    return this.http.delete(environment.url + '/route/' + id).pipe(map(
      (data: any) => {
        if (data === true){
          console.log('Route delete');
        } else {
          console.error('204 - Route not Exist');
        }
      }
    ));
  }
}
