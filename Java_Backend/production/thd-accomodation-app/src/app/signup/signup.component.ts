import { User } from './../user';
import { TokenStorageService } from '../_services/token-storage.service';
import { JwtService } from '../jwt.service';
import { HttpService } from './../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitted = false;
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  get formControls() {
    return this.signupForm.controls;
  }

  sendSignup(signup: User) {
    this.isSubmitted = true;
    this.jwtService.register(signup).subscribe(
      (res: any) => {
        console.log('signup responsse' + res.message);
        if ((res.message = 'Created Successfully')) {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          localStorage.setItem('access_token', res.token);
          console.log('post register response: ' + res.token);
          this.router.navigateByUrl('/login');
        }
      },
      (error) => {
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.isSubmitted = false;
      }
    );
  }

  toLogin() {
    this.router.navigateByUrl('/login');
  }
}
