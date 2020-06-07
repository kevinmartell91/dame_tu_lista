import {Injectable} from '@angular/core';
import {Store} from 'rxjs-observable-store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { AuthenticationEndPoint} from './authentication.endpoint';
import { AuthenticationStoreState } from './authentication.store.state';
import { LOGIN_CONFIG } from "../login.config";
import { LoginUser } from '../types/user';
import { StoreRequestStateUpdater } from '../../../shared/types/store-request-state-updater';
import * as endpointHelpers from '../../../shared/helpers/endpoint.helpers';

@Injectable({ providedIn: 'root' }) 
export class AuthenticationStore extends Store<AuthenticationStoreState> {
    
    loginUser$ : Observable<LoginUser>;
    private storeRequestStateUpdater : StoreRequestStateUpdater;

    constructor ( private endPoint: AuthenticationEndPoint ) {
        super(new AuthenticationStoreState())

        this.loginUser$ = this.state$.pipe(map(state => state.loginUser));
        this.storeRequestStateUpdater = endpointHelpers.getStoreRequestStateUpdater(
            this
        );
        // console.log("KEVIN - this.storeRequestStateUpdater",this.storeRequestStateUpdater)
        let loginUserLocalStorage = JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage));
        this.handleGetUserLoginResponse( loginUserLocalStorage as LoginUser );
    }

    get loginUser(): any {
        // avoid other components to subscribe to currentUser to be notified/
        console.log("AuthenticationStore - get loginUser() => ", this.state);
        return this.state.loginUser;
    }

    login(user: LoginUser): Observable<LoginUser> {

        return this.endPoint.postAuthentication(this.storeRequestStateUpdater, user).pipe(
            tap((loginUser: LoginUser) => {
                console.log("this.endPoint.postAuthentication", loginUser);
                // store user ditails and jwttoken in localStorage to keep user
                // logged in between pages
                localStorage.setItem(LOGIN_CONFIG.loginUserStorage, JSON.stringify(loginUser));
                this.handleGetUserLoginResponse(loginUser);
            })
        );
    }

    logout() {
        console.log("AuthenticationStore - logout()")
        localStorage.removeItem(LOGIN_CONFIG.loginUserStorage);
        this.handleGetUserLoginResponse(null);
        console.log("AuthenticationStore - logout() - this.state:", this.state)
    }

    private handleGetUserLoginResponse (loginUser: LoginUser): void {
        // The user object is then published to all subscribers with the call to
        // calls this.currentUserSubject.next(user);
        this.setState({  
            ...this.state,
            loginUser: loginUser
        });
        console.log("handleGetUserLoginResponse - this.state", this.state);
        console.log("handleGetUserLoginResponse - this.state.loginUser",this.state.loginUser);
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