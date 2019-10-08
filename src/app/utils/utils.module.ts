import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteToolbarComponent } from './site-toolbar/site-toolbar.component';
import { RouterModule } from '@angular/router';
import { SiteFooterComponent } from './site-footer/site-footer.component';



@NgModule({
  declarations: [LoaderComponent, SiteHeaderComponent, SiteToolbarComponent, SiteFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    SiteHeaderComponent,
    SiteFooterComponent
  ]
})
export class UtilsModule { }
