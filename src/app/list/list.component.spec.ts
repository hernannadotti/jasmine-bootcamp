import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { IUser } from '../models/users';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SearchBoxService } from '../services/search-box.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockUsersService: ApiService;
  let mockActivatedRoute: ActivatedRoute;
  let mockSearchBoxService: SearchBoxService;
  let mockRouter;
  let USERS: IUser[];

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
    component = new ListComponent(mockUsersService, mockRouter, mockActivatedRoute, mockSearchBoxService);
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    USERS = [
      {id: 1, name: 'Hernan'},
      {id: 2, name: 'Ariel'},
      {id: 3, name: 'Pietro'}
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be Users List', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Users List');
  });

  it('deleteUsers shoulde be called', () => {
    component.users = USERS;
    mockUsersService.deleteUsers(USERS[1]);
    expect(mockUsersService.deleteUsers).toHaveBeenCalled();
  });

});
