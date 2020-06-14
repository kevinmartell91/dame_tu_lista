import {StoreRequestStateUpdater} from '../types/store-request-state-updater';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { HttpHeaders } from '@angular/common/http';

export function getUrlWithParams(
    url: string,
    params: {[key: string]: any}
): string {
    Object.keys(params).forEach(key => {
        const value = params[key];
        url = url.replace(`:${key}`, value);
    });
    return url;
}

export function getStoreRequestStateUpdater(
    store: any,
): StoreRequestStateUpdater {
    console.log("KEVIN => getStoreRequestStateUpdater - store",store);
    return (requestName, requestState) => {
        store.setState({
            ...store.state,
            requests: {
                ...store.state.requests,
                [requestName]: requestState,
            },
        });
    };
}

export function  getHeadersForGet(): any {

    let headers = new HttpHeaders();
    let localStorageToken = 
        JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage)).token;
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token',localStorageToken )
    let options = { headers: headers }
  return options;
}