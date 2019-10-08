import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  currentYear() {
    return moment().year();
  }

}
