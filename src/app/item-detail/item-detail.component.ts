import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { IuserData } from '../models/userData';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  id: number;
  userData: IuserData;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getUser(this.id);
    this.initSubscriptions();
  }

  getUser(id: number) {
    this.apiService.getUser(id).subscribe((data: IuserData) => {
      this.userData = data;
    });
  }

  initSubscriptions() {
    this.loadingService.loading$.subscribe((value: boolean) => {
      this.loading = value;
    })
  }

}
