import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {RouteService} from './service/route.services';
import {PlanService} from './service/plan.service';
import {LoadingService} from './util/loading/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-route-plan';
  loading = false;

  constructor(private userService: UserService, private routeService: RouteService, private planService: PlanService,
              private loadingService: LoadingService) {

  }


  ngOnInit() {
    //this.loadingService.show(true);
    this.loading = true;
    setTimeout( () => {
      //this.loadingService.show(false);
      this.loading = false;
    }, 4000 );

  }


}
