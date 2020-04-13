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
              private _cookieService: CookieService) { }

  ngOnInit(): void {

    this.userId = Number(this._cookieService.get(this.keyUser));

    this.routeService.getByIdUser(this.userId).subscribe(
      routes => {
        this.routes = routes;
        console.log(this.routes);
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

  goRoute(){
    this.router.navigate(['router']);
  }

}
