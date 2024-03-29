import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStore } from '../../core/login/services/authentication.store';

@Component({
  selector: 'app-buyer-accounts',
  templateUrl: './buyer-accounts.component.html',
  styleUrls: ['./buyer-accounts.component.sass'],
})
export class BuyerAccountsComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   * when reloadig the web page, this method
   * retrieve updated data from DB
   * then pupulate using a subs object is created
   * whose role is to store subscriptions to different
   *  observables stores. This is an optimization so
   * that only one subscription per store is created
   * in a template by storing a conditional result
   * in a variable.
   */
  ngOnInit(): void {}

  logout(): void {
    this.authenticationStore.logout();
    this.router.navigateByUrl('login');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
