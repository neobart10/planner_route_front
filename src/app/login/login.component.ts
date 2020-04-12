import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public loading = false;

  constructor(private _snackBar: MatSnackBar, private userService: UserService, private router: Router) {
    this.user = new User(null, null, null, null, null, null, null);
  }

  ngOnInit(): void {

  }

  onLogin(){

    console.log('onLogin');
    console.log(this.user.username);
    console.log(this.user.pass);

    this.loading = true;
    this.userService.login(this.user).subscribe(
      user => {
        if ( user === null){
          this.openSnackBar('User or Pass invalid.', 'Retry');
        }else {
          this.openSnackBar('User valid.', 'Welcome');
          this.router.navigate(['filter-route']);
        }
        this.user.username = '';
        this.user.pass = '';
        this.loading = false;

      }
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
