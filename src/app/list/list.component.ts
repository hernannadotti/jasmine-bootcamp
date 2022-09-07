import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { IUser } from '../models/users';
import { LoadingService } from '../services/loading.service';
import { SearchBoxService } from '../services/search-box.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: IUser[] = [];
  dataSource: any = [];
  filteredDataSource: any = [];
  haveToRefresh: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'username', 'actions'];
  subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchBoxService: SearchBoxService,
    private loadingservice: LoadingService
    ) { }

  ngOnInit(): void {
    this.haveToRefresh = !this.activatedRoute.snapshot.queryParams["refresh"] || this.activatedRoute.snapshot.queryParams["refresh"] === true ? true : false;
    if (this.haveToRefresh) {
      this.getAllUsers();
    } else {
      this.dataSource = this.apiService.users.map((user: any) => user = {id: user.id, name: user.name, username: user.username});
      this.filteredDataSource = this.dataSource;
    }
    this.router.navigate([], {queryParams: {}});
    this.initSubscriptions();

  }

  ngOndestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  getAllUsers() {
    this.subscriptions.push(this.apiService.getUsers().subscribe((res: any) => {
      this.dataSource = res.map((user: any) => user = {id: user.id, name: user.name, username: user.username});
      this.filteredDataSource = this.dataSource;
      this.apiService.setUsers(res);
      this.apiService.setUsers(this.dataSource);
    }));
  }

  deleteUser(currentUser: IUser): void {
    this.dataSource = this.apiService.deleteUsers(currentUser);
    this.filteredDataSource = this.dataSource;
  }

  addUser(): void {
    this.router.navigate(['add'], {queryParams: {refresh: false}});
  }



  initSubscriptions() {
    this.subscriptions.push(this.searchBoxService.getSearchDataObs().subscribe(value => {
      if(!value.name?.length && !value.username?.length) this.filteredDataSource = this.dataSource;
      if(value.name?.length) {
        this.filteredDataSource = this.dataSource.filter((user: any) => user.name.includes(value.name));
      }

      if(value.username?.length) {
        this.filteredDataSource = this.dataSource.filter((user: any) => user.username.includes(value.username));
      }
    }));

    this.subscriptions.push(this.loadingservice.loading$.subscribe((value: boolean) => {
      this.loading = value;
    }));
  }

}
