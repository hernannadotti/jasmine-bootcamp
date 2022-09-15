import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './models/todo';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todos: ITodo[] = [];

  constructor(public http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  setTodos(todos: any[]) {
    this.todos = todos;
  }

  addUsers(todo: ITodo) {
    this.todos.push(todo);
    return this.todos;
  }

  deleteUsers(currentUser: ITodo) {
    this.todos = this.todos.filter((todo: ITodo) => todo.id !== currentUser.id);
    this.setTodos(this.todos);
    return this.todos;
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.userUrl + "/" + id);
  }

}
