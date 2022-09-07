import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './models/users';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userUrl: string = "https://jsonplaceholder.typicode.com/users";
  users: IUser[] = [];

  constructor(public http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  addUsers(user: IUser) {
    this.users.push(user);
    return this.users;
  }

  deleteUsers(currentUser: IUser) {
    this.users = this.users.filter((user: IUser) => user.id !== currentUser.id);
    this.setUsers(this.users);
    return this.users;
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.userUrl + "/" + id);
  }

}
