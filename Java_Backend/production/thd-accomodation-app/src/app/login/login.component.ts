import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from '../_services/token-storage.service';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    const login = document.getElementById('login-opt') as HTMLElement;
    login.classList.add('no-display');
    const search = document.getElementById('dashboard-opt') as HTMLElement;
    search.classList.remove('no-display');
    const email = document.getElementById('email') as HTMLInputElement;
    email.focus();
  }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  isSubmitted = false;
  showErrorMessage = false;
  // form element values
  email: string = '';
  password: string = '';

  reloadPage(): void {
    window.location.reload();
  }
  get formControls() {
    return this.loginForm.controls;
  }
  login() {
    console.log('inside login');
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.jwtService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log('login request send');
        this.showErrorMessage = false;
        // Get the user role from the response from logged in user default will be ADMIN
        localStorage.setItem('USER_ROLE', res?.userRole);
        localStorage.setItem('access_token', res?.token); // simple
        if (res.message == 'Successfully Login') {
          this.router.navigateByUrl('/dashboard');
          console.log('Login');
          const login = document.getElementById('login-opt') as HTMLElement;
          login.classList.add('no-display');
          const logout = document.getElementById('logout-opt') as HTMLElement;
          if (logout.classList.contains('no-display'))
            logout.classList.remove('no-display');
          const search = document.getElementById(
            'dashboard-opt'
          ) as HTMLElement;
          search.classList.add('no-display');
        } else console.log('login failed');
      },
      (error) => {
        this.showErrorMessage = true;
      }
    );
  }

  toSignup(url: string) {
    this.router.navigate([`${url}`]);
  }
}
