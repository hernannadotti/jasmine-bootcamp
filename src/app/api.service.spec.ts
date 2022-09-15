import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { ITodo } from './models/todo';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {

  class HttpClientMock {
    get = jasmine.createSpy('httpClient.get');
  }

  let apiService: ApiService;
  let expectedUsers: ITodo[];
  let mockRouter;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    expectedUsers = [
      { id: 101, name: 'Krishna' },
      { id: 102, name: 'Arjun' }
    ];

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    mockRouter = jasmine.createSpyObj(['navigate']);
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(httpClientMock);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('deleteUsers should remove indicated user', () => {
    apiService.users = expectedUsers;
    apiService.deleteUsers(apiService.users[1]);
    expect(apiService.users.length).toBe(1);
  });

  it('addUsers should add a user', () => {
    apiService.users = expectedUsers;
    apiService.addUsers(apiService.users[1]);
    expect(apiService.users.length).toBe(3);
  });

  it('get users should get a collection of user', () => {
    httpClientMock.get.and.returnValue(of(expectedUsers));
    apiService.getUsers().subscribe(value => {
      expect(expectedUsers).toBe(value);
    })
  });

  it('get users should be called one time', () => {
    httpClientMock.get.and.returnValue(of(expectedUsers));
    apiService.getUsers().subscribe(value => {
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    })
  });

});
