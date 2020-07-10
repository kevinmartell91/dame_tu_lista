import { Component, OnInit, HostBinding, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup,
		 FormControl,
     Validators, 
     FormGroupDirective,
     NgForm,
     FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger,
		 state,
		 style,
		 animate,
		 transition } from '@angular/animations';
import { LoginUser } from '../../core/login/types/user';
import { AuthenticationStore } from "../../core/login/services/authentication.store";
import { first } from 'rxjs/operators';

import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

// test
import { Requests } from "../../core/login/types/requests";
import { LOGIN_CONFIG } from "../../core/login/login.config";
import { APP_CONFIG } from 'src/app/app.config';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


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
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  registerUrl: string;
  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  errorMessage = '';
  // Roles: any = ['buyers', 'retailers', 'user','patient', 'therapist', 'medical_center'];
  Roles: any = ['comprador', 'vendedor'];
  
  // animations
  isOpen = true;
  menuState:string;
  dynamicColDetail:string;

  // lading bar
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  request: Requests;
  
  constructor( 
    private fb: FormBuilder,
    private authenticationStore: AuthenticationStore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  )  { 

    if( this.authenticationStore.loginUser) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.registerUrl = APP_CONFIG.appBaseUrl + "/registrate";
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
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
    this.authenticationStore.logout();
  }

  toggleDetails() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.dynamicColDetail= this.dynamicColDetail === '' ? 'col-md-1' : '';
    
    // this.userService.getUser().pipe(first()).subscribe(
    //   users => {
    //     this.loading = false;
    //     this.value = 100;
    //   }
    // );
  }

  private prepareAuthentication(): LoginUser {
  	return new LoginUser().deserialize(this.loginForm.value);
  }

  onSubmit() {
    this.loading = true;
    let loginUser = this.prepareAuthentication();
    console.log("KEVINSSSSSSSSSSSS",loginUser);
    
    // hard coded, quick login purposes
    // loginUser.login_type= "vendedor";
    // loginUser.email = "keyla@gmail.com";
    // loginUser.password = "demo";

    // // hard coded, quick login purposes
    // loginUser.login_type= "comprador";
    // loginUser.email = "fabrizio@gmail.com";
    // loginUser.password = "demo";

    // converting ESP login type to ENG
    if(loginUser.login_type === LOGIN_CONFIG.loginUserCompradorType){
      loginUser.login_type = LOGIN_CONFIG.loginUserBuyerType;
    } else {
      loginUser.login_type = LOGIN_CONFIG.loginUserRetailerType;
    }

    this.returnUrl  = (this.returnUrl !== "/") ? `${this.returnUrl}` : this.getloginTypeRedirect(loginUser);

    this.authenticationStore.login(loginUser)
    .pipe(first())
    .subscribe(
      loginUser => {
        if(loginUser.token) {
          this.router.navigate([this.returnUrl])
        } else {
          this.loading = false;
          this.errorMessage = "Usuario o contraseña incorrecta.";
        }
      },
      errorMessage => {
        this.errorMessage = "En estos momentos tenemos problemas técnicos. Intente más tarde";
        this.loading = false;
      },
    )
    // How to access to storeStates  
    // console.log("this.authenticationStore.state.requests.postAuthentication.inProgress",this.authenticationStore.state.requests.postAuthentication.inProgress);

  }

  getloginTypeRedirect(loginUser: LoginUser): string {

    let loginTypeUrl = '';
    
      switch (loginUser.login_type){
        case 'buyer':         loginTypeUrl = '/cuenta-comprador'; break;
        case 'retailer':      loginTypeUrl = '/vendedor-dashboard'; break;
      }
    return loginTypeUrl;  
  }
  
  ngOnDestroy() {
  	// this.authenticationStore.unsubscribe();
  }

}

