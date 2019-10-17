import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '@authentication/auth.service';
import { Validators, ValidatorDeclaration } from 'angular-reactive-validation';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;

  public user: User;
  public error!: string | null;
  password: string = '';

  constructor(private router: Router, fb: FormBuilder, private authService: AuthService) {
      this.loading = false;

      const passwordMatchValidator = ValidatorDeclaration.wrapSingleArgumentValidator((matchingControlName: string) => {
        return (control: AbstractControl): ValidationErrors => {
          if (!matchingControlName) {
            return null;
          }
          return control.value.trim() === matchingControlName.trim() ? null : { mustMatch: true };
        };
    }, 'mustMatch');

      this.form = fb.group({
        username: ['', Validators.required('username is required')],
        firstname: ['', Validators.required('firstname is required')],
        lastname: ['', Validators.required('lastname is required')],
        password: [this.password, Validators.required('password is required')],
        confirmPassword: ['', [Validators.required('enter matching password'),
          passwordMatchValidator(this.password, 'Passwords do not match')]],
        librarianUser: [false]
      });
    }

  ngOnInit() {
  }

  public submit(): void {
    if (this.loading || this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    const value = this.form.value;

    // this.authService.login({
    //   username: value.username.trim(),
    //   password: value.password
    // })
    // .subscribe((user: any) => {
    //   this.user = new User(user);
    //   this.loading = false;
    //   if (this.user.isLibrarian()) {
    //     this.router.navigate(['/librarian']);
    //   } else {
    //     // todo: navigate to normal user
    //     this.router.navigate(['/user']);
    //   }
    // }, (res) => {
    //   console.log('error response on login', res);
    //   if (res.status === 401 || res.status === 400) {
    //     this.error = 'Username or Password incorrect';
    //   } else if (res.status < 1) {
    //     this.error = 'Failed to contact server. Please check your internet connection';
    //   } else {
    //     this.error = 'An error occured. Please try again';
    //   }
    //   this.loading = false;
    // });
  }

}
