import { adminform } from './adminForm';
import { EmptySearchComponent } from './empty-search/empty-search.component';
import { Password } from './Password';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

import { User } from './user';
import { __param } from 'tslib';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  // URL of the server
  apiUrl = environment.SOCKET_ENDPOINT;
  redirectUrl: string = '/';

  constructor(private httpClient: HttpClient, public router: Router) {}

  login(userData: User) {
    let em = userData.email;
    let pw = userData.password;
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/login`,
      {
        email: em,
        password: pw,
      },
      { observe: 'response' } // <-- this gives you full HTTP response including status code
    );
  }

  register(userData: User) {
    let un = userData.username;
    let em = userData.email;
    let pw = userData.password;
    console.log('jwt.service register email: ' + em);
    console.log('jwt.service register password: ' + pw);
    return this.httpClient.post<any>(`${this.apiUrl}/api/register`, {
      username: un,
      email: em,
      password: pw,
    }
    );
  }

  addCardData(adminForm: adminform) {
    return (
      this.httpClient
        // .put<any>(`${this.apiUrl}/auth/postAdv`, JSON.stringify(adminForm))
        .put<any>(`${this.apiUrl}/auth/postAdv`, {
          apartmentName: adminForm.apartmentName,
          apartmentDesc: adminForm.apartmentDesc,
          apartmentPic: adminForm.apartmentPic,
          apartmentLoc: adminForm.apartmentLoc,
          rooms: adminForm.rooms,
          bathrooms: adminForm.bathrooms,
          kitchen: adminForm.kitchen,
          amenities: adminForm.amenities,
          area: adminForm.area,
          rent: adminForm.rent,
          securityDeposit: adminForm.securityDeposit,
          availableFrom: adminForm.availableFrom,
          availableTill: adminForm.availableTill,
        })
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.token);
          console.log('put register response: ' + res.token);
        })
    );
  }
  verifyEmail(email: string) {
    let response = 'false';
    return this.httpClient.put<any>(`${this.apiUrl}/api/forgotPassword`, {
      email: email,
    });
  }
  changePassword(userData: Password) {
    let em = userData.email;
    let pw = userData.password;
    let cpw = userData.confirmPassword;
    return this.httpClient.put<any>(`${this.apiUrl}/api/updatePassword`, {
      email: em,
      password: pw,
      confirmPassword: cpw,
    });
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('USER_ROLE');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public get userRole(): string {
    return localStorage.getItem('USER_ROLE') || 'GUEST';
  }
}
