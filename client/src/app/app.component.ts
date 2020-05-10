import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';
import { LoginUser } from './features/login/models/login-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  currentUser: LoginUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe( 
        x => { 
          this.currentUser = x;
        }
      );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
