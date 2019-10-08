import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { environment } from '@environment/environment';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AsyncSubject, Observable, Observer } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  private static TOKEN_NAME = 'TOKEN';
  private static headers: any = {};
  // tslint:disable-next-line: variable-name
  private _httpError: EventEmitter<HttpErrorResponse> = new EventEmitter();
  // tslint:disable-next-line: variable-name
  private _lastSeen!: moment.Moment;

  constructor(private toastr: ToastrService,
              private authService: AuthService) {
      authService.newToken().subscribe((token: string) => {
        if (!token) {
          localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
          return;
        }

        localStorage.setItem(HttpInterceptorService.TOKEN_NAME, token);
      });

      const lastSeen = localStorage.getItem(HttpInterceptorService.name + '.lastSeen');
      if (lastSeen) {
        this._lastSeen = moment.unix(parseInt(lastSeen, 10));
      }
    }

    public get httpError() {
      return this._httpError;
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = localStorage.getItem(HttpInterceptorService.TOKEN_NAME);
      if (token && moment().subtract(environment.sessionTimeout, 'minutes').isAfter(this._lastSeen)) {
        token = null;
        localStorage.removeItem(HttpInterceptorService.TOKEN_NAME);
        this.authService.clearStaleSession();
        this.toastr.info(`Session timed out after ${environment.sessionTimeout} mins of inactivity`, `Session Timeout`,
          { disableTimeOut: false});
      }

      this._lastSeen = moment();
      localStorage.setItem(HttpInterceptorService.name + '.lastSeen', `${this._lastSeen.valueOf() / 1000}`);

      if (token) {
        const headers: any = { Authorization: `Bearer ${token}` };
        Object.keys(HttpInterceptorService.headers).forEach((header) => {
          if (!HttpInterceptorService.headers[header]) {
            return;
          }
          headers[header] = HttpInterceptorService.headers[header];
        });
        req = req.clone({ setHeaders: headers });
      }
      const handled: Observable<HttpEvent<any>> = next.handle(req);
      const subject: AsyncSubject<HttpEvent<any>> = new AsyncSubject();
      handled.subscribe(subject);
      subject.subscribe((event: HttpEvent<any>) => {

        if (event instanceof HttpErrorResponse) {
          if (event.status === 401) {
            if (token) {
              this.authService.clearStaleSession();
            }
            return;
          }
          this._httpError.emit(event);
        }
      }, (err: HttpEvent<any>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status < 1) {
            this.toastr.error('Please check your internet connection', 'Failed to contact server');
          } else if (err.status === 401) {
            if (token) {
              this.authService.clearStaleSession();
            }
            return;
          } else if (err.status === 404) {
            return;
          }
          this._httpError.emit(err);
        }
      });
      // tslint:disable-next-line: deprecation
      return Observable.create((obs: Observer<HttpEvent<any>>) => {
        subject.subscribe(obs);
      });
    }
}
