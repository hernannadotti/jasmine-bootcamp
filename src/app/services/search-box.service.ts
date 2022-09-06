import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { IsearchData } from '../models/searchData';

@Injectable({
  providedIn: 'root'
})
export class SearchBoxService {
  private searchQuery$: BehaviorSubject<IsearchData> = new BehaviorSubject({});

  getSearchDataObs(): Observable<IsearchData> {
    return this.searchQuery$.asObservable();
  }

  setSearchDataObs(searchData: IsearchData) {
    this.searchQuery$.next(searchData);
  }

  constructor() { }
}
