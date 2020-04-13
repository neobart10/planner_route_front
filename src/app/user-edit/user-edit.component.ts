import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../service/user.service';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public loading = false;
  public usernameEmpty = false;
  public passEmpty = false;
  public errorLogin = false;
  public userId : number;


  public typeVehicle = [
    {value: 1, viewValue: 'Car'},
    {value: 2, viewValue: 'Bike'}
  ];

  keyUser = '&I%U%$234';

  public gallons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  constructor(private _snackBar: MatSnackBar, private userService: UserService, private router: Router,
              private _cookieService: CookieService) {
    this.user = new User(null, null, null, null, null, null, null);
  }

  ngOnInit(): void {

<<<<<<< HEAD


=======
     this.userId = Number (this._cookieService.get(this.keyUser));

      this.userService.get(this.userId).subscribe(  
        user => {          
          this.user = user;          
        }
      );
>>>>>>> 1656b73d9b35ecdeb0e076413c70903824aa145a
  }

  onSave() {
    if (this.isValid()) {
      this.loading = true;
      this.userService.update(this.user,this.user.id).subscribe(
        user => {
          this.loading = false;
          if (user === null) {
            this.errorLogin = true;
            this.openSnackBar('user not exist.', 'Retry');
          } else {
            this.openSnackBar('User Updated', 'Welcome');            
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



  onLogOut(){
    this._cookieService.remove(this.keyUser);
    this.router.navigate(['login']);
  }

}
