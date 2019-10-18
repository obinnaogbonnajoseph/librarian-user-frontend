import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '@authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router,
              fb: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService) {
      this.loading = false;

      this.form = fb.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.compose([Validators.required, this.passwordMatch()])],
        librarianUser: [false]
      });

      const password = this.form.get('password');
      password.valueChanges.subscribe(() => {
      this.form.get('confirmPassword').updateValueAndValidity();
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

    const libRoles: string[] = ['CREATE_BOOKS', 'MODIFY_BOOKS'];
    const userRoles: string[] = ['BORROW_BOOKS'];

    const isLibrarian: boolean = this.form.get('librarianUser').value;

    const data = Object.assign({}, this.form.value);

    data.roles = isLibrarian ? libRoles : userRoles;

    console.log('data sent to backend to create user::::', data);

    this.authService.signup(data).subscribe(() => {
      this.toastrService.success('User successfully created', 'Success!!', { closeButton: true});
      this.router.navigate(['/login']);
      this.loading = false;
    }, (res) => {
        console.log('error response on login', res);
        if (res.status < 1) {
          this.error = 'Failed to contact server. Please check your internet connection';
        } else {
          this.error = 'An error occured. Please try again';
        }
        this.loading = false;
      });
  }

  public passwordMatch() {

    return (control: AbstractControl) => {
      if (!this.form) {
        return null;
      }
      const password = this.form.get('password').value;
      if (password !== null) {
        return password.trim() === control.value ? null : { passwordMatch: true};
      }
      return null;
    }
  }

}
