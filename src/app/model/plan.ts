import { Route } from './route';

export class Plan {
    constructor(public id: number, public route: Route, public startLat: number,
                public startLng: number, public targetLat: number, public targetLng: number,
                public stop: number, public state: number) {
    }

    static fromJson(json): Plan {
        return new Plan(json.id, json.route ? Route.fromJson(json.route) : null,
        json.startLat, json.startLng, json.targetLat, json.targetLng, json.stop, json.state);
    }
}
