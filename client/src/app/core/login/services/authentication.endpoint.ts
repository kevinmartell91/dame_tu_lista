import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StoreRequestStateUpdater } from "../../../shared/types/store-request-state-updater";
import { LOGIN_CONFIG } from "../login.config";
import { LoginUser } from '../types/user';



@Injectable({providedIn: 'root'})
export class AuthenticationEndPoint {
  
 
  constructor( private httpClient: HttpClient) {

  }

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
        console.log("USER postAuthentication => ", user);
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
        
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
       
        return throwError(error);
      })
    );
  }

  logout() {
   
  }

  private getHeaders() {
  	let headers = new HttpHeaders();
	  headers.append('Content-Type', 'application/json');
  	let options = { headers: headers }
  	
    return options;
  }
}

