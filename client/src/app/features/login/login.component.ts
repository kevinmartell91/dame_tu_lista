import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup,
		 FormControl,
		 Validators,
     FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger,
		 state,
		 style,
		 animate,
		 transition } from '@angular/animations';
import { LoginUser } from './models/login-user.model';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AuthService } from './services/auth.service';
import { first } from 'rxjs/operators';

import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('slideInOutDetails', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, +300%, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],	
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  Roles: any = ['user','patient', 'therapist', 'medical_center'];
  
  // animations
  isOpen = true;
  menuState:string;
  dynamicColDetail:string;

  // lading bar
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
  
  constructor( 
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute)  { 

    if( this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }  
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      login_type: ['', Validators.required]
    }) 

    this.menuState = 'in';
    this.dynamicColDetail = '';

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.authenticationService.logout();
  }

  toggleDetails() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.dynamicColDetail= this.dynamicColDetail === '' ? 'col-md-1' : '';
    
    this.userService.getUser().pipe(first()).subscribe(
      users => {
        this.loading = false;
        this.value = 100;
      }
    );
  }

  private prepareAuthentication(): LoginUser {
  	return new LoginUser().deserialize(this.loginForm.value);
  }

  onSubmit() {
    this.loading = true;
    let loginUser = this.prepareAuthentication();
    this.returnUrl  = (this.returnUrl !== "/") ? `${this.returnUrl}` : this.getloginTypeRedirect(loginUser);

    this.authenticationService.login(loginUser)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl])
        },
        error => {
          this.error = error;
          this.loading = false;
        },
      )
  }

  getloginTypeRedirect(loginUser: LoginUser): string {
    let loginTypeUrl = '';
      switch (loginUser.login_type){
        case 'user':           loginTypeUrl = '/dashboard-medical-center'; break;
        case 'patient':        loginTypeUrl = '/dashboard-attorney'; break;
        case 'therapist':      loginTypeUrl = '/dashboard-therapist'; break;
        case 'medical_center': loginTypeUrl = '/dashboard-medical-center';
      }
    return loginTypeUrl;  
  }
  
  ngOnDestroy() {
  	// this.authenticationService.unsubscribe();
  }

}

