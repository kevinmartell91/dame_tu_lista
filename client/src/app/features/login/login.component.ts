import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { APP_CONFIG } from 'src/app/app.config';
import { LOGIN_CONFIG } from '../../core/login/login.config';
import { AuthenticationStore } from '../../core/login/services/authentication.store';
// test
import { Requests } from '../../core/login/types/requests';
import { LoginUser } from '../../core/login/types/user';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  registerUrl: string;
  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  errorMessage = '';
  Roles: any = ['comprador', 'vendedor'];

  // lading bar
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  request: Requests;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private authenticationStore: AuthenticationStore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authenticationStore.loginUser) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.registerUrl = APP_CONFIG.appBaseUrl + '/registrate';
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      login_type: ['vendedor', Validators.required],
    });
  }

  private prepareAuthentication(): LoginUser {
    return new LoginUser().deserialize(this.loginForm.value);
  }

  onSubmit() {
    this.loading = true;
    let loginUser = this.prepareAuthentication();

    // converting ESP login type to ENG
    if (loginUser.login_type === LOGIN_CONFIG.loginUserCompradorType) {
      loginUser.login_type = LOGIN_CONFIG.loginUserBuyerType;
    } else {
      loginUser.login_type = LOGIN_CONFIG.loginUserRetailerType;
    }

    // this.returnUrl  = (this.returnUrl !== "/") ? `${this.returnUrl}` : this.getloginTypeRedirect(loginUser);

    this.authenticationStore
      .login(loginUser)
      .pipe(first())
      .subscribe(
        (loginUser) => {
          if (loginUser.token) {
            this.router.navigate([this.getloginTypeRedirect(loginUser)]);
          } else {
            this.loading = false;
            this.errorMessage = 'Usuario o contraseña incorrecta.';
          }
        },
        (errorMessage) => {
          this.errorMessage =
            'En estos momentos tenemos problemas técnicos. Intente más tarde';
          this.loading = false;
        }
      );
  }

  getloginTypeRedirect(loginUser: LoginUser): string {
    let loginTypeUrl = '';

    switch (loginUser.login_type) {
      case 'buyer':
        loginTypeUrl = '/cuenta-comprador';
        break;
      case 'retailer':
        loginTypeUrl = '/vendedor-dashboard/cuenta';
        break;
    }
    return loginTypeUrl;
  }

  ngOnDestroy() {}
}
