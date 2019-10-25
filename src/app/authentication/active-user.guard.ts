import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.fetchUser()
      .pipe(map((user => {
        if (!user) {
          this.router.navigate(['login']);
          return false;
        }
        const permissions: string[] = next.data.permission;
        if (!permissions || !permissions.length || permissions.filter(it => user.hasPermission(it)).length) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })))
      .pipe(catchError((err: any, caught: Observable<any>) => {
        this.router.navigate(['login']);
        return of(false);
      }));
  }

}
