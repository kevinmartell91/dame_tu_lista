import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable,
         BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LoginUser } from '../models/login-user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;
  
  constructor( private httpClient: HttpClient) { }

  getUser() {
    let apiUrl = `${environment.apiUrl}/users`;
    return this.httpClient.get<any[]>(apiUrl, this.getHeaders());
  }
  
  private getHeaders() {
  	let headers = new HttpHeaders();
	  headers.append('Content-Type', 'application/json');
  	let options = { headers: headers }
  	
    return options;
  }
}

