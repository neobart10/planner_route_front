import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {RouteService} from './service/route.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-route-plan';

  users = [];

  user = {
    id: 1,
    username: 'neo',
    pass: '123',
    typeVehicle: 2,
    gallonsVehicle: 10,
    gallonsKm: 20
  };


  route = {
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
    startLat: 30.6,
    startLng: 15.6,
    targetLat: 17.5,
    targetLng: 10.6,
    stop: 1,
    state: 1
  };


  constructor(private userService: UserService, private routeService: RouteService) {

  }


  ngOnInit() {
    console.log('Pruebas User');

    this.userService.save(this.user).subscribe(
      u => {
        console.log(u);

        this.userService.getAll().subscribe(
          data => {
            this.users = data;
            console.log(this.users);
          }
        );

      },
      error2 => {
        console.log(error2.error.message);
      });

    this.userService.get(1).subscribe(
      aleja => {
        console.log(aleja);
      }
    );


    this.userService.update(this.user, 2).subscribe(
      jhonatan => {
        console.log(jhonatan);
      }
    );

    console.log('Pruebas Route');

    this.routeService.save(this.route).subscribe(
      r => {
        console.log(r);
      }
    );


    this.routeService.get(3).subscribe(
      rutaIngrid => {
        console.log('Esta es la ruta 3');
        console.log(rutaIngrid);
      }
    );

    //Aleja Route - getByIdUser


    //Jhonantan Route - update


    //Andres Route - Delete


    //Ingrid Plan - Save


    //Andres plan - getAll  completar del Route los Planes


    //Aleja plan getId


    //Jhonatan plan update

  }


}
