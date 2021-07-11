import { HttpHeaders } from '@angular/common/http';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { StoreRequestStateUpdater } from '../types/store-request-state-updater';

export function getUrlWithParams(
  url: string,
  params: { [key: string]: any }
): string {
  Object.keys(params).forEach((key) => {
    const value = params[key];
    url = url.replace(`:${key}`, value);
  });
  return url;
}

export function getStoreRequestStateUpdater(
  store: any
): StoreRequestStateUpdater {
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

export function getHeadersForGet(): any {
  let headers = new HttpHeaders();
  // let localStorageToken =
  // JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage)).token;
  headers.append('Content-Type', 'application/json');
  // headers.append('x-access-token',localStorageToken )
  let options = { headers: headers };
  return options;
}

export function getHeadersForNewUsers(): any {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };

  return options;
}

export function getHeadersForNewOrders(): any {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let options = { headers: headers };

  return options;
}

export function getHeadersForPatch(): any {
  let headers = new HttpHeaders();
  let localStorageToken = JSON.parse(
    localStorage.getItem(LOGIN_CONFIG.loginUserStorage)
  ).token;
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token', localStorageToken);
  let options = { headers: headers };
  return options;
}

export function getHeadersForPut(): any {
  let headers = new HttpHeaders();
  // let localStorageToken =
  //     JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage)).token;
  headers.append('Content-Type', 'application/json');
  // get a temp token when buyer wants to hit database for securit reasons
  // headers.append('x-access-token',localStorageToken )
  let options = { headers: headers };
  return options;
}
