import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getLoadinState(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoadingState(state: boolean): void {
    this.loading$.next(state);
  }

  constructor() { }
}
