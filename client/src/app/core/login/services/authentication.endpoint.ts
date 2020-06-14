import { Injectable } from '@angular/core';
import { HttpClient,
  		   HttpHeaders,
         HttpErrorResponse} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


// import { environment } from '../../../../environments/environment';
import { ApiResponse } from "../../../shared/types/api-response";
import { StoreRequestStateUpdater } from "../../../shared/types/store-request-state-updater";
import { LOGIN_CONFIG } from "../login.config";
import { LoginUser } from '../types/user';


@Injectable({providedIn: 'root'})
export class AuthenticationEndPoint {
  
  // private currentUserSubject: BehaviorSubject<LoginUser>;
  // public currentUser: Observable<LoginUser>;
  
  constructor( private httpClient: HttpClient) {
    // this.currentUserSubject = 
      // new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    // set currentUserSubject(as observable) to currentUser
    // to notify all the other components which are subscribe to 
    // currentUser. See currentUserValue() => 
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): LoginUser {
    // avoid other components to subscribe to currentUser to be notified
    // return this.currentUserSubject.value;
  // }

  postAuthentication( 
    requestStateUpdater: StoreRequestStateUpdater,
    loginUser: LoginUser) {
    
    const request = LOGIN_CONFIG.request.postAuthentication;
    requestStateUpdater(request.name, {
      inProgress : true
    });

  	return this.httpClient.post<LoginUser>(request.url, loginUser, this.getHeaders()).pipe(
      map(user => {
        
        requestStateUpdater( request.name, {
          inProgress: false
        });
        // store user ditails and jwttoken in localStorage to keep user
        // logged in between pages
        // localStorage.setItem('currentUser',JSON.stringify(user));
        // The user object is then published to all subscribers by calling
        // this.currentUserSubject.next(user);
        // console.log("EndPoint:",user);
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        requestStateUpdater(request.name, {
          inProgress: false,
          error: true 
        });
        return throwError(error);
      })
    );
  }
  postAuthenticationSimple( loginUser: LoginUser) {
    const request = LOGIN_CONFIG.request.postAuthentication;

  	return this.httpClient.post<LoginUser>(request.url, loginUser, this.getHeaders()).pipe(
      map(user => {
        // store user ditails and jwttoken in localStorage to keep user
        // logged in between pages
        // localStorage.setItem('currentUser',JSON.stringify(user));
        // The user object is then published to all subscribers by calling
        // this.currentUserSubject.next(user);`
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
       
        return throwError(error);
      })
    );
  }

  logout() {
    // remove user from localStorage
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

  private getHeaders() {
  	let headers = new HttpHeaders();
	  headers.append('Content-Type', 'application/json');
  	let options = { headers: headers }
  	
    return options;
  }
}

