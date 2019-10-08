import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@authentication/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[site-toolbar]',
  templateUrl: './site-toolbar.component.html',
  styleUrls: ['./site-toolbar.component.css']
})
export class SiteToolbarComponent implements OnInit {

  @Input() user: any;

  showCollapse: boolean;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      this.showCollapse = false;
    });
  }

  toggleCollapse() {
    this.showCollapse = !this.showCollapse;
  }

  logout() {
    this.authService.logout();
  }

}
