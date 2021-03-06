import {Route} from './route';

export class User {
    constructor(public id: number, public username: string, public pass: string,
                public typeVehicle: number, public gallonsVehicle: number, public gallonsKm: number,
                public routes: Array<Route>) {
    }

    static fromJson(json): User {
      return new User(json.id, json.username, json.pass, json.typeVehicle,
         json.gallonsVehicle, json.gallonsKm, json.routes
        );
    }
}
