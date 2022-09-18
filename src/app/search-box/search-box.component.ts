import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { IsearchData } from '../models/searchData';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchBoxService } from '../services/search-box.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchQuery$ = new BehaviorSubject<IsearchData>({});
  inputChange$ = new BehaviorSubject('');
  searchQuery: IsearchData = {};
  inputTitle$: Observable<Event>;
  stateForm: FormGroup;
  @ViewChild('inputTitle') inputTitle: ElementRef;

  constructor(
    private searchBoxService: SearchBoxService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configRadioButtonsForm();
  }

  ngAfterViewInit() {
    this.inputTitle$ = fromEvent(this.inputTitle.nativeElement, 'input');
    this.initSubscriptions();
  }

  configRadioButtonsForm() {
    this.stateForm = this.formBuilder.group({
      state: null,
    });
  }

  search(event: any) {
    this.searchBoxService.setSearchDataObs(this.searchQuery);
  }

  initSubscriptions() {
    this.inputTitle$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((event: any) => {
        this.searchQuery.title = event?.target?.value;
        this.searchBoxService.setSearchDataObs(this.searchQuery);
      });

    this.stateForm.valueChanges.subscribe((value) => {
      this.searchQuery.completed =
        value.state === 'pending' ? false : value.state === 'all' ? null : true;
      this.searchBoxService.setSearchDataObs(this.searchQuery);
    });
  }
}
