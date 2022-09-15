import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { ITodo } from '../models/todo';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { LoadingService } from '../services/loading.service';
import { SearchBoxService } from '../services/search-box.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockUsersService: ApiService;
  let mockActivatedRoute: ActivatedRoute;
  let mockSearchBoxService: SearchBoxService;
  let mockLoadingService: LoadingService;
  let mockDialogService: MatDialog;
  let mockRouter;
  let TODOS: ITodo[];

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [ ListComponent, SearchBoxComponent ],
      imports: [HttpClientModule, MatTableModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: convertToParamMap({ refresh :false })
            }
          },
        }
      ]
    })
    .compileComponents();
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockUsersService = jasmine.createSpyObj(ApiService, ['getUSers', 'deleteUsers'])
    component = new ListComponent(mockUsersService, mockRouter, mockActivatedRoute, mockSearchBoxService, mockLoadingService, mockDialogService);
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    TODOS = [
      {id: 1, title: 'Hernan', completed: true},
      {id: 2, title: 'Ariel', completed: true},
      {id: 3, title: 'Pietro', completed: false}
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be Users List', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Todos List');
  });

  it('deleteUsers shoulde be called', () => {
    component.todos = TODOS;
    mockUsersService.deleteUsers(TODOS[1]);
    expect(mockUsersService.deleteUsers).toHaveBeenCalled();
  });

});
