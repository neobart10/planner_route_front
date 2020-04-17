import { Component, OnInit } from '@angular/core';
import {RouteService} from '../service/route.services';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  public routes = [];
  step = 0;
  public userId: number;
  private keyUser = '&I%U%$234';

  constructor(private routeService: RouteService, private router: Router,
              private cookieService: CookieService) { }

  ngOnInit(): void {

    this.userId = Number(this.cookieService.get(this.keyUser));

    this.routeService.getByIdUser(this.userId).subscribe(
      routes => {
        this.routes = routes;
      }
    );

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  goRoute(id){
    this.router.navigate(['planner'], { queryParams : { id } } );
  }

}
