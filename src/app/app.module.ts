import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpUtil} from './util/http.util';
import {UserService} from './service/user.service';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {CookieModule} from 'ngx-cookie';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PlanListComponent } from './plan-list/plan-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PlannerComponent, PlannerViewPlaceComponent, PlannerViewPlaceDetailComponent} from './planner/planner.component';
import {AgmCoreModule} from '@agm/core';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';

export const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'planner', component: PlannerComponent, pathMatch: 'full'},
  {path: 'plan-list', component: PlanListComponent, pathMatch: 'full'},
  {path: 'user-edit', component: UserEditComponent, pathMatch: 'full'},
];



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    PlanListComponent,
    PlannerComponent,
    PlannerViewPlaceComponent,
    PlannerViewPlaceDetailComponent
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
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3Rqop7zUXKC1Oxy8P9znappPOmSn4ORs',
      libraries: ['places', 'geometry']
    }),
    CookieModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [HttpUtil, UserService, RouteService, PlanService, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent]
})
export class AppModule { }
