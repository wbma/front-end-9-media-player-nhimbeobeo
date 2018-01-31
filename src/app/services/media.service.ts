import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  email: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  status: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  public login() {
    const body = {
      username: this.username,
      password: this.password
    };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      localStorage.setItem('token', response['token']);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      this.status = error.error.message;
    });
  }

  public register() {
    const body = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.http.post(this.apiUrl + '/login', body).subscribe(response => {
      console.log(response['token']);
    });
  }

  public getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }
}
