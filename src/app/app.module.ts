import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpUtil} from './util/http.util';
import {UserService} from './service/user.service';
import {RouterModule, Routes} from '@angular/router';
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
import { WelcomeComponent } from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterComponent } from './router/router.component';
import { PlansComponent } from './plans/plans.component';
import { FilterRouteComponent } from './filter-route/filter-route.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'filter-route', component: FilterRouteComponent, pathMatch: 'full'},
  {path: 'router', component: RouterComponent, pathMatch: 'full'},
  {path: 'plans', component: PlansComponent, pathMatch: 'full'},
];



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    RouterComponent,
    PlansComponent,
    FilterRouteComponent
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
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [HttpUtil, UserService, RouteService, PlanService],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent]
})
export class AppModule { }
