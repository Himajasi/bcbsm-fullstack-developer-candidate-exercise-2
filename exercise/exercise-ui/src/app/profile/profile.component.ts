import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    userData!: User;

    constructor(private userService: UserService) {}

    ngOnInit() {
        const username = localStorage.getItem('loggedInUsername');
        if (username) {
            this.userService.getProfile(username).subscribe(data => {
                this.userData = data;
            });
        } else {
                console.error("No username has been provided");
            }
        }
    

    onUpdate() {
        this.userService.saveOrUpdateUser(this.userData).subscribe(updatedData => {
            this.userData = updatedData;
            alert("Profile updated successfully!");
        });
    }
}
