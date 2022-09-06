import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { IsearchData } from '../models/searchData';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { SearchBoxService } from '../services/search-box.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  searchQuery$ = new BehaviorSubject<IsearchData>({});
  inputChange$ = new BehaviorSubject('');
  inputName$: Observable<Event>;
  inputUserName$: Observable<Event>;
  searchQuery: IsearchData = {};
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('userNameInput') userNameInput: ElementRef;

  constructor(private searchBoxService: SearchBoxService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.inputName$ = fromEvent(this.nameInput.nativeElement, 'input');
    this.inputUserName$ = fromEvent(this.userNameInput.nativeElement, 'input');
    this.initSubscriptions();
  }

  search(event: any) {
    this.searchBoxService.setSearchDataObs(this.searchQuery);
  }

  initSubscriptions() {
    this.inputName$.pipe(debounceTime(500),distinctUntilChanged()).subscribe((event: any) => {
      this.searchQuery.name = event?.target?.value;
      this.searchBoxService.setSearchDataObs(this.searchQuery);
    });

    this.inputUserName$.pipe(debounceTime(500),distinctUntilChanged()).subscribe((event: any) => {
      this.searchQuery.username = event?.target?.value;
      this.searchBoxService.setSearchDataObs(this.searchQuery);
    });
  }

}
