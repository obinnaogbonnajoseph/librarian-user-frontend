import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteToolbarComponent } from '../site-toolbar/site-toolbar.component';
import { AuthService } from '@authentication/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  user: any;

  @ViewChild('staticTopMenu', {static: false})
  staticTopMenu: SiteToolbarComponent;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser()
      .subscribe((user) => {
        this.user = user;
    })
  }

}
