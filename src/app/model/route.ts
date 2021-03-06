import { User } from './user';
import { Plan } from './plan';

export class Route {
    constructor(public id: number, public user: User, public description: string,
                public startDescription: string, public targetDescription: string,
                public startLat: number, public startLng: number, public targetLat: number, public targetLng: number,
                public hourStop: number , public plans : Array<Plan>) {
    }

    static fromJson(json): Route {
      return new Route (json.id,
        json.user ? User.fromJson(json.user) : null, json.description, json.startDescription,
        json.targetDescription, json.startLat, json.startLng, json.targetLat, json.targetLng, json.hourStop, json.plans);
    }
}
