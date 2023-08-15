import { Component } from '@angular/core';
import { UserService } from '../user.service'; 
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    model: User = new User();

    constructor(private userService: UserService, private router: Router) {}

    onSubmit() {
        this.userService.loginUser(this.model).subscribe(
            data => {
                localStorage.setItem('loggedInUsername', this.model.username);
                this.router.navigate(['/profile']);
            },
            error => {
                alert("error logging in, please check your username/password");
                console.error("Error logging in", error);
            }
        );
    }
}
