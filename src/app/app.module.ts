import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UtilsModule } from './utils/utils.module';
import { LibrarianModule } from './librarian/librarian.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './authentication/http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { ProgressbarModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '@utils/custom-errors';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    UtilsModule,
    LibrarianModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
