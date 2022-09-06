import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IUser } from '../models/Iusers';
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
    private apiService: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm(): void {
    this.createUserForm = this.formBuilder.group({
      name: '',
      username : '',
      id: uniqid()
    })
  }

  addUser(user: IUser) {
    this.apiService.addUsers(user);
    this.router.navigate(['list'], {queryParams: {refresh: true}})
  }

}
