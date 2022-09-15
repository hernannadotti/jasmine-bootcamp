import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ITodo } from '../models/todo';
import { LoadingService } from '../services/loading.service';
import { SearchBoxService } from '../services/search-box.service';
import { MatTableDataSource } from '@angular/material/table';
import { ITodoData } from '../models/todoData';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todos: ITodo[] = [];
  dataSource: MatTableDataSource<any>;
  filteredDataSource: MatTableDataSource<any>;
  haveToRefresh: boolean = true;
  displayedColumns: string[] = ['title', 'completed', 'actions'];
  subscriptions: Subscription[] = [];
  loading: boolean = false;
  length: number;
  pageSize: number;
  pageIndex: number;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchBoxService: SearchBoxService,
    private loadingservice: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let storedItems: any;
    this.haveToRefresh =
      !this.activatedRoute.snapshot.queryParams['refresh'] ||
      this.activatedRoute.snapshot.queryParams['refresh'] === true
        ? true
        : false;
    if (this.haveToRefresh) {
      this.getAllTodos();
    } else {
      this.dataSource = new MatTableDataSource(this.apiService.todos.map(
        (todo: any) =>
          (todo = { id: todo.id, title: todo.title, completed: todo.completed })
      ));
      storedItems = localStorage.getItem('users');
      if (storedItems?.length) storedItems = JSON.parse(storedItems);
      this.dataSource = new MatTableDataSource(this.dataSource.data.concat(storedItems));
      this.filteredDataSource = new MatTableDataSource(this.filterUnique(this.dataSource.data));
      this.loadingservice.setLoadingState(false);
    }
    this.router.navigate([], { queryParams: {} });
  }

  ngOndestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getAllTodos() {
    let storedItems: string | null | any[];
    this.subscriptions.push(
      this.apiService.getUsers().subscribe((res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res.map(
          (todo: ITodo) =>
            (todo = { id: todo.id, title: todo.title, completed: todo.completed })
        );
        storedItems = localStorage.getItem('users');
        if (storedItems?.length) storedItems = JSON.parse(storedItems);
        this.dataSource.data = storedItems?.length
          ? this.dataSource.data.concat(storedItems)
          : this.dataSource.data;
        this.filteredDataSource = new MatTableDataSource(this.filterUnique(this.dataSource));
        this.filteredDataSource.paginator = this.paginator;
        this.apiService.setTodos (res);
        this.apiService.setTodos(this.dataSource.data);
        this.loadingservice.setLoadingState(false);
        this.initSubscriptions();
      })
    );
  }

  openDeleteComponent(currentTodo: ITodo, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ModalDialogComponent,{
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe((result) => {
      let type: string = result.target.innerText;
      if(type === 'Ok') {
        this.deleteUser(currentTodo);
      }
    });
  }

  deleteUser(currentUser: ITodo) {
    let storedItems: string | null | any;
    storedItems = localStorage.getItem('users');
    if (storedItems?.length) {
      storedItems = JSON.parse(storedItems);
      storedItems = storedItems.filter(
        (user: ITodo) => user.id !== currentUser.id
      );
    }
    localStorage.setItem('users', JSON.stringify(storedItems));
    this.dataSource = new MatTableDataSource(this.apiService.deleteUsers(currentUser));
    this.dataSource = storedItems?.length
      ? new MatTableDataSource(this.dataSource.data.concat(storedItems))
      : this.dataSource;
    this.filteredDataSource = new MatTableDataSource(this.filterUnique(this.dataSource.data));
  }

  addUser(): void {
    this.router.navigate(['add'], { queryParams: { refresh: false } });
  }

  initSubscriptions() {
    this.subscriptions.push(
      this.searchBoxService.getSearchDataObs().subscribe((value) => {
        this.filteredDataSource = this.dataSource;
        if (!value.title?.length && (typeof value.completed !== 'boolean'))
          this.filteredDataSource = new MatTableDataSource(this.dataSource.data);
          this.filteredDataSource = value.title
          ? new MatTableDataSource(this.dataSource.data.filter((todo: any) =>
              todo.title.includes(value.title)
            ))
          : this.dataSource;
          this.filteredDataSource = (typeof value.completed === 'boolean')
          ? new MatTableDataSource(this.filteredDataSource.data.filter((todo: any) => {
            return todo.completed === value.completed
          }))
          : this.filteredDataSource;

          this.filteredDataSource.paginator = this.paginator;
      })

    );

    this.subscriptions.push(
      this.loadingservice.loading$.subscribe((value: boolean) => {
        this.loading = value;
      })
    );
  }

  filterUnique(data: any) {
    let resArr: any[] = [];
    data.filteredData.forEach(function (item: any) {
      var i = resArr.findIndex((x) => x.id === item.id);
      if (i <= -1) {
        resArr.push({ id: item.id, title: item.title, completed: item.completed });
      }
    });
    return resArr;
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
