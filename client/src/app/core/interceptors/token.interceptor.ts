import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationStore } from '../login/services/authentication.store';
		 

@Injectable({providedIn : 'root'})
export class TokenInterceptor implements HttpInterceptor {
  
  constructor( private authenticationStore: AuthenticationStore) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	/*
		Add authorization header if jwt token available.
		Getting the current logged in user is possible
		thanks to currentUserSubject.asObsevable in 
		authentication.service.ts, but subscribing is not 
		necessary because of the getter method.		
	*/
	let currentUser = this.authenticationStore.loginUser;
	 
 	if(currentUser && currentUser.token){
		request = request.clone({
			setHeaders: {
				['x-access-token']: `${currentUser.token}`
			}
		});
 	} 
  	
  	return next.handle(request);
  }

}