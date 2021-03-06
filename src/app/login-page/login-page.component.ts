import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@authentication/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;

  public user: User;
  public error!: string | null;

  constructor(private router: Router, fb: FormBuilder, private authService: AuthService) {
      this.loading = false;
      this.form = fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
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

    this.authService.login({
      username: value.username.trim(),
      password: value.password
    })
    .subscribe((user: any) => {
      this.user = new User(user);
      this.loading = false;
      if (this.user.isLibrarian()) {
        this.router.navigate(['/librarian']);
      } else {
        // todo: navigate to normal user
        this.router.navigate(['/user']);
      }
    }, (res) => {
      console.log('error response on login', res);
      if (res.status === 401 || res.status === 400) {
        this.error = 'Username or Password incorrect';
      } else if (res.status < 1) {
        this.error = 'Failed to contact server. Please check your internet connection';
      } else {
        this.error = 'An error occured. Please try again';
      }
      this.loading = false;
    });
  }

}
