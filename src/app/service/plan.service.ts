import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Plan} from '../model/plan';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Route} from '../model/route';

@Injectable()
export class PlanService {

  constructor(private http: HttpUtil) {
  }

  getAll(): Observable<Array<Plan>> {
    return this.http.get(environment.url + '/plan').pipe(map(
      (data: any) =>
        data.map(
          json => Plan.fromJson(json)
        )
    ));
  }


  get(id): Observable<Plan> {
    return this.http.get(environment.url + '/plan/' + id).pipe(map(
      (data: any) => {
        if (data === null) {
          console.error('204 - Plan not exist.')
          return null;
        } else {
          return Plan.fromJson(data);
        }
      }
    ));
  }

  save(plan): Observable<Plan> {
    return this.http.post(environment.url + '/plan', JSON.stringify(plan),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return Plan.fromJson(data);
        }
      }
    ));
  }

  update(plan, id): Observable<Plan> {
    return this.http.put(environment.url + '/plan/' + id, JSON.stringify(plan),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data === null) {
          console.error('204 - Plan not exist.')
          return null;
        } else {
          return Plan.fromJson(data);
        }
      }
    ));
  }
}
