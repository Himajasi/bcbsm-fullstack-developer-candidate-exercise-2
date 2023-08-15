import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = "http://localhost:8080/api/user";

    constructor(private httpClient: HttpClient) { }

    // registerUser(data: User): Observable<any> {
    //     return this.httpClient.post(`${this.baseURL}/register`, data);
    // }

    loginUser(data: User): Observable<any> {
        return this.httpClient.post(`${this.baseURL}/login`, data).pipe(
            tap((response: any) => {
                localStorage.setItem('token', response.jwt);
            })
        );
    }

    getProfile(username: string): Observable<User> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.httpClient.get<User>(`${this.baseURL}/profile?username=${username}`, { headers: headers });
    }

    // updateProfile(data: User): Observable<User> {
    //     const headers = new HttpHeaders({
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     });
    //     return this.httpClient.put<User>(`${this.baseURL}/update`, data, { headers: headers });
    // }

    saveOrUpdateUser(data: User): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.httpClient.post(`${this.baseURL}/saveOrUpdate`, data, { headers: headers });
    }
    

    logout() {
        localStorage.removeItem('token');
    }
}
