import { Component, OnInit } from '@angular/core';
import {RouteService} from '../service/route.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  public routes = [];
  step = 0;

  constructor(private routeService: RouteService, private router: Router) { }

  ngOnInit(): void {

    this.routeService.getAll().subscribe(
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
