import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './service/user.service';
import {RouteService} from './service/route.services';
import {PlanService} from './service/plan.service';
import {LoadingService} from './util/loading/loading.service';
import {CookieService} from 'ngx-cookie';
import {isUndefined} from "util";
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-route-plan';
  loading = false;
  registered = false;
  keyUser = '&I%U%$234';
  userId: number;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private userService: UserService, private routeService: RouteService, private planService: PlanService,
              private loadingService: LoadingService, private _cookieService: CookieService, private router: Router) {

  }


  ngOnInit() {
    //this.loadingService.show(true);
    this.loading = true;
    setTimeout( () => {
      //this.loadingService.show(false);
      this.loading = false;
    }, 3000 );
  }


  getUserCookie(key: string) {
    if (isUndefined(this._cookieService.get(key)) || (this._cookieService.get(key) === '')) {
      return -1;
    }
    return Number(this._cookieService.get(key));
  }

  goLogin(){
    this.sidenav.close();
    this.userId = this.getUserCookie(this.keyUser);
    if (this.userId === - 1){
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['user-edit']);
    }
  }


}
