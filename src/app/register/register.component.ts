import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public loading = false;
  public usernameEmpty = false;
  public passEmpty = false;
  public errorLogin = false;

  public typeVehicle = [
    {value: 1, viewValue: 'Car'},
    {value: 2, viewValue: 'Bike'}
  ];

  public gallons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  constructor(private _snackBar: MatSnackBar, private userService: UserService, private router: Router,
              private _cookieService: CookieService) {
    this.user = new User(null, null, null, null, null, null, null);
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.isValid()) {
      this.loading = true;
      this.userService.save(this.user).subscribe(
        user => {
          this.loading = false;
          if (user === null) {
            this.errorLogin = true;
            this.openSnackBar('Username exist.', 'Retry');
          } else {
            this.openSnackBar('Registered user successfully, please start your route plan.', 'Welcome');
            this.router.navigate(['filter-route']);
          }
          this.user.username = '';
          this.user.pass = '';
        }
      );

    }
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
