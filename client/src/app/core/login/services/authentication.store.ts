import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map, tap } from 'rxjs/operators';
import * as endpointHelpers from '../../../shared/helpers/endpoint.helpers';
import { StoreRequestStateUpdater } from '../../../shared/types/store-request-state-updater';
import { LOGIN_CONFIG } from '../login.config';
import { LoginUser } from '../types/user';
import { AuthenticationEndPoint } from './authentication.endpoint';
import { AuthenticationStoreState } from './authentication.store.state';

@Injectable({ providedIn: 'root' })
export class AuthenticationStore extends Store<AuthenticationStoreState> {
  loginUser$: Observable<LoginUser>;
  private storeRequestStateUpdater: StoreRequestStateUpdater;

  constructor(private endPoint: AuthenticationEndPoint) {
    super(new AuthenticationStoreState());

    this.loginUser$ = this.state$.pipe(map((state) => state.loginUser));
    this.storeRequestStateUpdater =
      endpointHelpers.getStoreRequestStateUpdater(this);
    let loginUserLocalStorage = JSON.parse(
      localStorage.getItem(LOGIN_CONFIG.loginUserStorage)
    );
    this.handleGetUserLoginResponse(loginUserLocalStorage as LoginUser);
  }

  get loginUser(): any {
    // avoid other components to subscribe to currentUser to be notified/
    return this.state.loginUser;
  }

  login(user: LoginUser): Observable<LoginUser> {
    return this.endPoint
      .postAuthentication(this.storeRequestStateUpdater, user)
      .pipe(
        tap((loginUser: any) => {
          if (loginUser.success) {
            // store user details and jwttoken in localStorage to keep user
            // logged in between pages
            loginUser.name = loginUser.entity.name;
            loginUser.email = loginUser.entity.email;
            loginUser.password = loginUser.entity.password;
            loginUser.login_type = loginUser.entity.user_type;
            localStorage.setItem(
              LOGIN_CONFIG.loginUserStorage,
              JSON.stringify(loginUser)
            );
            this.handleGetUserLoginResponse(loginUser);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(LOGIN_CONFIG.loginUserStorage);
    this.handleGetUserLoginResponse(null);
  }

  public handleGetUserLoginResponse(loginUser: LoginUser): void {
    // The user object is then published to all subscribers with the call to
    // calls this.currentUserSubject.next(user);
    this.setState({
      ...this.state,
      loginUser: loginUser,
    });
  }
}

// import {Observable, BehaviorSubject} from 'rxjs';

// export class Store<T> {
//     state$: Observable<T>;
//     private _state$: BehaviorSubject<T>;

//     protected constructor (initialState: T) {
//         this._state$ = new BehaviorSubject(initialState);
//         this.state$ = this._state$.asObservable();
//     }

//     get state (): T {
//         return this._state$.getValue();
//     }

//     setState (nextState: T): void {
//         this._state$.next(nextState);
//     }
// }
