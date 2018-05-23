import { Injectable } from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8087/users';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  saveUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }


}
