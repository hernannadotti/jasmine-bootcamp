import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let mockFormBuilder, mockRouter;
  
  beforeEach(async () => {
    mockFormBuilder = {
      group: jasmine.createSpy('group')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockFormBuilder = jasmine.createSpyObj(['group']);
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add button should call addUser Method', () => {
    let spyMethod = spyOn(component, 'addUser');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('addUser method should navigate to specific url', () => {
    let router = TestBed.inject(Router);
    component.addUser({id:1, name:'Hernan'});
    expect(router.navigate).toHaveBeenCalledWith(['list'], {queryParams: {refresh: true}});
  });
});
