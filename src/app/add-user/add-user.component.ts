import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ITodo } from '../models/todo';
import uniqid from 'uniqid';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  createUserForm: FormGroup;
  haveToRefresh: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm(): void {
    this.createUserForm = this.formBuilder.group({
      name: '',
      username : '',
      phone: '',
      website : '',
      email: '',
      id: uniqid()
    })
  }

  addUser(user: ITodo) {
    let newItems: any = [];
    //this.apiService.addUsers(user);
    let strItems: string | null | undefined = this.getUsersFromLocalStorage();
    if (strItems?.length) {
      newItems = JSON.parse(strItems);
    }
    newItems.push(user);
    if(newItems.length) localStorage.setItem('users', JSON.stringify(newItems));
    this.router.navigate(['list'], {queryParams: {refresh: true}})
  }

  getUsersFromLocalStorage() {
    let users = localStorage.getItem('users');
    if(users?.length) {
      return localStorage.getItem('users');
    }
    return
  }

}
