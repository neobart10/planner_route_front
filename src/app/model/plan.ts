import { Route } from './route';

export class Plan {
    constructor(public id: number, public route: Route, public description: string,
                public lat: number, public lng: number, public km: number, 
                public stop: number, public state: number) {
    }

    static fromJson(json): Plan {
        return new Plan(json.id, json.route ? Route.fromJson(json.route) : null,
        json.description, json.lat, json.lng, json.km, json.stop, json.state);
    }
}
