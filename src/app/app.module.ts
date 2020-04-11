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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoadingModule} from './util/loading/loading.module';
import {LoadingComponent} from './util/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    LoadingModule,
    RouterModule.forRoot([])
  ],
  providers: [HttpUtil, UserService, RouteService, PlanService],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent]
})
export class AppModule { }
