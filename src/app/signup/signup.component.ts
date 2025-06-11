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
    this.jwtService.register(this.form).subscribe({
    next: (res) => {
      console.log('Signup response:', res);

      // Adjust condition depending on your backend response
      if (res?.message === 'User registered successfully') {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/login');
      } else {
        // Handle unexpected success format
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.errorMessage = res?.message || 'Unexpected response from server';
      }
    },
    error: (error) => {
      console.error('Signup failed:', error);
      this.isSuccessful = false;
      this.isSignUpFailed = true;
      this.isSubmitted = false;
      this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
    }
    });
  }

  toLogin() {
    this.router.navigateByUrl('/login');
  }
}
