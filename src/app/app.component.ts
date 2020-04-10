import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
<<<<<<< HEAD
import {RouteService} from './service/route.services'; 
import { PlanService } from './service/plan.service';
import { Subscription } from 'rxjs';
=======
import {RouteService} from './service/route.services';
import { PlanService } from './service/plan.service';
>>>>>>> a195723b6ebd90ac43cbb25088feba2966f0bde5

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


  constructor(private userService: UserService, private routeService: RouteService, private planService: PlanService) {

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
      this.routeService.getByIdUser(this.route.user.id).subscribe(
       usuario=>{
         console.log('la ruta del el usuario es :');
        console.log(usuario);   

       }
       );
    
    //Jhonantan Route - update
    this.routeService.update(this.route, 2).subscribe(
      r => {
        console.log(r);
      }
    );

    //Andres Route - Delete
    this.routeService.delete(3).subscribe(
      deleteRoute =>{
        console.log("se borra la ruta 3");;
        console.log(deleteRoute);
      }
    );
    
    //Ingrid Plan - Save
    this.planService.save(this.plan).subscribe(
      p => {
      console.log('El plan guardado es');
      console.log(p);
      }
    );

    //Andres plan - getAll  completar del Route los Planes
    this.planService.getAll().subscribe(
      allPlan =>{
        console.log('todos los planes');
        console.log(allPlan);
      }
    );


    //Aleja plan getId
    this.planService.get(1).subscribe (
    rutaget=>{
      console.log('plan de el usuario ');
      console.log(rutaget);

    }
  ) ;  

    

    //Jhonatan plan update
    this.planService.update(this.plan, 2).subscribe(
      r => {
        console.log(r);
      }
    );

  }


}
