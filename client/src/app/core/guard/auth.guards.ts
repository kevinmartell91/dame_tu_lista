import { Injectable } from '@angular/core';
import { Router,
		 CanActivate,
		 RouterStateSnapshot, 
		 ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationStore } from "../login/services/authentication.store";	 

@Injectable({ providedIn: 'root'} )
export class AuthGuard implements CanActivate {

  constructor( 
  	private router: Router,
	private authenticationStore: AuthenticationStore
  ) { }
	
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
	
	const loginUser = this.authenticationStore.loginUser;
	if(loginUser) {
	// logged in so return true
      return true;
	}
  	// not logged in, so redirect to login page with the return url
	this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
	return false;
  }

  
}
