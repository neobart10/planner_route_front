import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {City} from '../model/city';

@Injectable()
export class CityService {

  constructor(private http: HttpUtil) {
  }

  getCities(): Observable<Array<City>> {
    return this.http.get(environment.url + '/city').pipe(map(
      (data: any) =>
        data.map(
          json => City.fromJson(json)
        )
    ));
  }
}
