import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static user: Subject<User | null> = new BehaviorSubject(undefined);
  // tslint:disable-next-line: variable-name
  private static _user: User;
  private static ongoingFetch: Observable<any> | null;
  private static initialized: boolean;

  private static newUserToken: EventEmitter<string | null> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private router: Router) {
      AuthService.user.subscribe((user: any) => {
        if (user === undefined) {
          return;
        }
        AuthService.initialized = true;
        AuthService._user = user;
      });
    }

    public init() {
      this.fetch().subscribe((res => {
        // initialize auth service
      }), (res => {
        // initialize auth service
      }));
    }

    public logout() {
      AuthService.newUserToken.next(null);
      AuthService.user.next(null);
      this.router.navigate(['login']);
    }

    public login(data: any): Observable<any> {
      return this.httpClient.post(`${environment.baseApi}/auth/login`, data)
      .pipe(map((payload: any) => {
        AuthService.initialized = false;
        AuthService.ongoingFetch = null;
        AuthService.newUserToken.next(payload.token);
        return payload.user;
      }));

    }

    public signup(data: any): Observable<any> {
      return this.httpClient.post(`${environment.baseApi}/auth/signup`, data);
    }

    public newToken() {
      return AuthService.newUserToken;
    }

    public clearStaleSession() {
      console.log('*** clearing stale session ***');
      const redirect = AuthService._user;
      AuthService.user.next(null);
      if (redirect) {
        location.href = this.router.createUrlTree(['/login']).toString();
      }
    }

    public getUser() {
      return AuthService.user;
    }

    public fetchUser(): Observable<User> {
      if (AuthService.initialized) {
        console.log('auth service initialized... trying to return existing user:::', AuthService._user);
        return of(AuthService._user);
      }
      return this.fetch();
    }

    private fetch() {
      if (!AuthService.ongoingFetch) {
        const wrapper = new AsyncSubject();
        AuthService.ongoingFetch = wrapper;

        this.httpClient.get(`${environment.baseApi}/auth/me`)
          .subscribe((u: any) => {
            const user = new User(u);
            wrapper.next(user);
            wrapper.complete();

            AuthService.user.next(user);
            AuthService.ongoingFetch = null;
          }, (err: any) => {
            wrapper.error(err);
            wrapper.complete();
            AuthService.user.next(null);
        });
      }
      return AuthService.ongoingFetch;
    }
}
