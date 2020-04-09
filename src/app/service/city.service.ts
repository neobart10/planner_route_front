import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {City} from '../model/city';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class CityService {

  constructor(private http: HttpUtil) {
  }

  getAll(): Observable<Array<City>> {
    return this.http.get(environment.url + '/city').pipe(map(
      (data: any) =>
        data.map(
          json => City.fromJson(json)
        )
    ));
  }


  get(id): Observable<City> {
    return this.http.get(environment.url + '/city/' + id).pipe(map(
      (data: any) =>
        json => City.fromJson(json)
    ));
  }

  save(city): Observable<City> {
    return this.http.post(environment.url + '/city', JSON.stringify(city),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data) { return City.fromJson(data); } else { return data; }
      }
    ));
  }

  update(city, id): Observable<City> {
    return this.http.put(environment.url + '/city/id', JSON.stringify(city),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data) { return City.fromJson(data); } else { return data; }
      }
    ));
  }
}
