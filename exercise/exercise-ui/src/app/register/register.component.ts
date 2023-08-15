import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html'
})
export class RegistrationComponent {
  states: string[] = ['NY', 'MA', 'RI','NJ'];
  
  user: User = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  };

  constructor(private userService: UserService) { }

  message: string = '';
  isSuccess: boolean = false;



  register() {
    this.userService.saveOrUpdateUser(this.user).subscribe(
      data => {
        alert("User Registered successfully!");
        this.isSuccess = true;
        this.message = 'Registration successful! please login.';
        this.user = {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          dateOfBirth: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: ''
        };
      },
      error => {
        this.message = 'Error registering user!';
        this.isSuccess = false;
      }
    );
}

    
  
}
