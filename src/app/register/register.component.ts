import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  public user: User;
  public loading = false;
  public errorRegister = false;
  public confirm: string;

  public typesVehicle = [
    {value: 1, viewValue: 'Car'},
    {value: 2, viewValue: 'Bike'}
  ];


  public gallons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  constructor(private _snackBar: MatSnackBar, private userService: UserService, private router: Router,
              private _cookieService: CookieService) {
    this.user = new User(null, undefined, undefined, null, null, null, null);
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
            this.errorRegister = true;
            this.openSnackBar('Username exist.', 'Retry');
          } else {
            this.openSnackBar('Registered user successfully, please login.', 'Welcome');
            this.router.navigate(['login']);
          }
          this.user.pass = '';
          this.confirm = '';
        }
      );

    }
  }

  isValid(){
    this.errorRegister = false;
    let result = true;

    if (this.user.username === null || this.user.username.length === 0 ){
      result = false;
    }

    if (this.user.pass === null || this.user.pass.length === 0){
      result = false;
    }

    if (this.confirm === null || this.confirm.length === 0 || this.confirm !== this.user.pass){
      this.confirm = '';
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
