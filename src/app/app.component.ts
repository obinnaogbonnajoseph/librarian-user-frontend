import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadStart, Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading: boolean;
  public user: any = undefined;

  constructor(private router: Router,
              private authService: AuthService) {
      // authenticate the user;
      this.authService.init();
      this.authService.getUser().subscribe((user) => {
        this.user = user;
      });

      this.router.events.subscribe((event: any) => {
        if (event instanceof RouteConfigLoadStart ||
          event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
            this.loading = false;
        }
        if (event instanceof NavigationEnd) {
          window.scroll(0, 0);
        }
        if (event instanceof NavigationError) {
          console.log(event);
        }
      });
    }

    userInitialized() {
      return !isUndefined(this.user);
    }
}
