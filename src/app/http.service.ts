import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(url:string) {
    return this.httpClient.get<Event>(url);
  }

  sendPostSignupRequest(url: string,login: Object){
    return this.httpClient.post(url,login)  }

  sendGetLoginRequest(url: string,login: Object){
    //  return this.httpClient.get()
  }
}
