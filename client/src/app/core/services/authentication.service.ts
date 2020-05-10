import { Injectable } from '@angular/core';
import { HttpClient,
  		   HttpResponse,
  		   HttpHeaders,
  		   HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoginUser } from '../../features/login/models/login-user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;
  
  constructor( private httpClient: HttpClient) {
    this.currentUserSubject = 
      new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    // set currentUserSubject(as observable) to currentUser
    // to notify all the other components which are subscribe to 
    // currentUser. See currentUserValue() => 
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    // avoid other components to subscribe to currentUser to be notified
    return this.currentUserSubject.value;
  }

  login( loginUser: LoginUser) {
    let apiUrl =`${environment.apiUrl}/authenticate`;
  	return this.httpClient.post<any>(apiUrl, loginUser, this.getHeaders())
        .pipe(map(user => {
          // store user ditails and jwttoken in localStorage to keep user
          // logged in between pages
          localStorage.setItem('currentUser',JSON.stringify(user));
          // The user object is then published to all subscribers with the call to
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
    // remove user from localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private getHeaders() {
  	let headers = new HttpHeaders();
	  headers.append('Content-Type', 'application/json');
  	let options = { headers: headers }
  	
    return options;
  }
}

