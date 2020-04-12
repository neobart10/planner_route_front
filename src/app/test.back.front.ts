import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {RouteService} from './service/route.services';
import {PlanService} from './service/plan.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TestComponent implements OnInit {
  title = 'my-route-plan';

  users = [];

  user = {
    id: 1,
    username: 'neo123',
    pass: '123',
    typeVehicle: 2,
    gallonsVehicle: 10,
    gallonsKm: 20
  };


  route = {
    id: 4,
    description: 'mi viaje a Cartagena',
    startDescription: 'prueba del start',
    targetDescription: 'prueba del target',
    startLat: 7.8,
    startLng: 6.3,
    targetLat: 11.2,
    targetLng: 6.7,
    hourStop: 7,
    user: this.user
  };


  plan = {
    route: this.route,
    startLat: 30.8,
    startLng: 15.6,
    targetLat: 17.5,
    targetLng: 10.6,
    stop: 1,
    state: 1
  };


  constructor(private userService: UserService, private routeService: RouteService, private planService: PlanService) {

  }


  ngOnInit() {
    console.log('Pruebas User');

    this.userService.save(this.user).subscribe(
      userSave => {
        if (userSave) {
          this.userService.getAll().subscribe(
            data => {
              this.users = data;
              console.log(this.users);
            }
          );
        }
      });

    this.userService.get(11).subscribe(
      user => {
        if (user) {
          console.log(user);
        }
      }
    );


    this.userService.update(this.user, 11).subscribe(
      user => {
        if (user) {
          console.log(user);
        }
      }
    );

    console.log('Pruebas Route');

    this.routeService.save(this.route).subscribe(
      route => {
        console.log(route);
      }
    );

    /* Tenia problemas cuando no existia*/
    this.routeService.get(15).subscribe(
      route => {
        if (route) {
          console.log(route);
        }
      }
    );

    /*Aleja Route - getByIdUser Estaba mal el servicio*/
    this.routeService.getByIdUser(this.route.user.id).subscribe(
      route => {
        if (route) {
          console.log(route);
        }
      }
    );

    /*Jhonantan Route - update estaba mal no funcionaba el servicios estaba mal*/
    this.routeService.update(this.route, 45).subscribe(
      route => {
        if (route) {
          console.log(route);
        }
      }
    );

    /*Andres Route - Delete Se modifico para validar si elimino o no */
    this.routeService.delete(2).subscribe();

    /* Ingrid Plan - Save No funcionaba, lanzaba error debia agregar el id a la clase Ruta */
    this.planService.save(this.plan).subscribe(
      plan => {
        if (plan) {
          console.log(plan);
        }
      }
    );

    /*Andres plan - getAll  completar del Route los Planes */
    this.planService.getAll().subscribe(
      allPlan => {
        console.log(allPlan);
      }
    );


    /* Aleja plan get no cambiaste las variables y tampoco funcionaba por que el servicio estaba mal*/
    this.planService.get(1).subscribe(
      plan => {
        if (plan) {
          console.log(plan);
        }
      }
    );

    /*Jhonatan plan update */
    this.planService.update(this.plan, 6).subscribe(
      plan => {
        if (plan){
          console.log(plan);
        }
      }
    );
  }


}
