import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpUtil} from './util/http.util';
import {UserService} from './service/user.service';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RouteService} from './service/route.services';
import { PlanService } from './service/plan.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [HttpUtil, UserService, RouteService,PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
