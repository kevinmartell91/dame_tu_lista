import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { BuyerNavegationStoreState } from './buyer-navegation.store.states';
import { BuyerNavegation } from '../types/buyer-navegation';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BuyerNavegationStore extends Store<BuyerNavegationStoreState> {
    
    buyerNavegation$: Observable<BuyerNavegation>;

    constructor () {
        super( new BuyerNavegationStoreState()) 
        this.buyerNavegation$ = this.state$.pipe(map(state => state.buyerNavegation));
        
        // set the first state
        let buyerNav = new BuyerNavegation();
        this.setNewState(buyerNav);
    }

    get buyerNavegation(): any {
        return this.state.buyerNavegation;
    }

    setNewState( buyerNavegation: BuyerNavegation) {
        this.setState({
            ...this.state, 
            buyerNavegation: buyerNavegation
        });
    }
}
