import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationStore } from '../login/services/authentication.store';


@Injectable({providedIn: 'root'})
export class ErrorInterceptors implements HttpInterceptor {
	
  constructor( private authenticationStore: AuthenticationStore ) { }

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	return next.handle(request)
  	  .pipe(catchError (err => {
  	  	if (err.status === 401) {
  	  		// out logout of 401 response returned from api
  	  		this.authenticationStore.logout();
			location.reload(true);
  	  	}

  	  	const error = err.error.message	|| err.statusText;
  	  	return throwError(error);
  	  }))
  }
}

