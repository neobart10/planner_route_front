import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public loading = false;

 public typeVehicle = [
    {value: 1 , viewValue: 'Car'},
    {value: 2 , viewValue: 'Bike'}
  ];
  public gallons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];


  constructor(private userService: UserService) { 
    this.user = new User(null, null, null, null, null, null, null);
  }

  ngOnInit(): void {
  }

  onSave(){
    console.log(this.user);

    this.userService.save(this.user).subscribe(
      data=>{
        console.log(data);
      }
    );
  }

}
