import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public loading = false;
  public usernameEmpty = false;
  public passEmpty = false;
  public errorLogin = false;
  keyUser = '&I%U%$234';

  constructor(private _snackBar: MatSnackBar, private userService: UserService, private router: Router,
              private _cookieService: CookieService) {
    this.user = new User(null, null, null, null, null, null, null);
  }

  ngOnInit(): void {

  }

  isValid(){
    this.passEmpty = false;
    this.usernameEmpty = false;
    this.errorLogin = false;

    let result = true;

    if (this.user.username === null || this.user.username.length === 0 ){
       this.usernameEmpty = true;
       result = false;
    }

    if (this.user.pass === null || this.user.pass.length === 0){
      this.passEmpty = true;
      result = false;
    }

    return result;
  }

  onLogin(){
    if (this.isValid()) {
      this.loading = true;
      this.userService.login(this.user).subscribe(
        user => {
          this.loading = false;
          if (user === null) {
            this.errorLogin = true;
            this.openSnackBar('User or Pass invalid.', 'Retry');
          } else {
            this._cookieService.put(this.keyUser, user.id.toString());
            this.openSnackBar('User successfully logged in, please start your route plan.', 'Welcome');
            this.router.navigate(['filter-route']);
          }
          this.user.username = '';
          this.user.pass = '';
        }
      );

    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
