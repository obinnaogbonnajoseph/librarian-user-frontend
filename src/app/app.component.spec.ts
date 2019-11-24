import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UtilsModule } from '@utils/utils.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '@authentication/auth.service';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { User } from '@models/user.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService;

  // set up mockUser
  let userData = {
    firstName: 'Obi',
    lastName: 'Joe',
    usename: 'obi-joe',
    userId: '1',
    status: 'ACTIVE',
    roles: ['MODIFY_BOOKS', 'CREATE_BOOKS']
  }
  let mockUser: User = new User(userData); 
  let subjectMockUser: Subject<User | null> = new BehaviorSubject(mockUser);
  

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['init', 'getUser']);
    mockAuthService.getUser.and.returnValue(subjectMockUser);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    // start up the component
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  describe('constructor', () => {
    it('should call authService init() and getUser()', () => {
      // assert
      expect(mockAuthService.init).toHaveBeenCalled();
      expect(mockAuthService.getUser).toHaveBeenCalled();
      expect(component.user).toEqual(mockUser);
    });

  })

  describe('template', () => {

    it('should have header', () => {
      // assert
      expect(fixture.nativeElement.querySelector('header')).toBeDefined();
    })

    it('should have main', () => {
      expect(fixture.nativeElement.querySelector('main')).toBeDefined();
    })

    it('should have footer', () => {
      expect(fixture.nativeElement.querySelector('footer')).toBeDefined();
    })
  })
  
});
