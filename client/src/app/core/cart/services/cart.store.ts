import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'rxjs-observable-store';
import { map } from 'rxjs/operators';
import { Retailer } from '../../retailer/types/retailer';
import { updateTotalProductPrice } from '../helpers/cart-helper';
import { CartProduct } from '../types/cart-product';
import { ShoppingCart } from '../types/shopping-cart';
import { CartStoreState } from './cart.store.states';

@Injectable({ providedIn: 'root'})
export class CartStore extends Store<CartStoreState> {
    
    shoppingCart$: Observable<ShoppingCart>;

    favoriteRetailerSelected$: Observable<Retailer>;


    constructor() {
        super(new CartStoreState()) 
        this.shoppingCart$ = this.state$.pipe( map ( state => state.shoppingCart));
        this.favoriteRetailerSelected$ = this.state$.pipe( map ( state => state.favoriteRetailerSelected));
    }

    setCart(newCart: CartProduct[]): void {
        this.setState({
            ...this.state,
            shoppingCart: {
                ...this.state.shoppingCart,
                products: newCart
            }
        })
        console.log("setCart(newCart: CartProduct[]): void ", newCart);
    }

    setFavoriteRetalerSelected(retailer: Retailer): void {
        this.setState({
            ...this.state,
            favoriteRetailerSelected: retailer
        })
    }

    public updateCart(cartProduct: CartProduct):void {
    
        let cartProducts: CartProduct[] = this.state.shoppingCart.products;   

        let exit = this.isOnCartStoreList(cartProduct);

        if ( exit ) {
            //remove is quantity is cero
            if( cartProduct.quantity === 0) {
                cartProducts = 
                cartProducts.filter( ele => ele._id != cartProduct._id )
                
            } else { // update quantity
                 cartProducts.filter( elem => {
                    if (elem._id == cartProduct._id )  {
                        elem.quantity = cartProduct.quantity;
                        elem.totalPrice = updateTotalProductPrice(cartProduct.quantity, cartProduct.price);
                        elem.details = cartProduct.details;
                    }
                })
            }
        } else { 
            // add if it doesn't exist
            cartProducts.push(cartProduct);
        }
       
        // update the cartStore
        this.setCart(cartProducts);
    }

    private isOnCartStoreList(cartProduct: CartProduct): boolean {
         
        // retrieve current cartProduct from cartStore
        let cartProducts: CartProduct[] = this.state.shoppingCart.products;   
        
        //look for cartProduct in the cartStore
        for (let i = 0; i < cartProducts.length; i++) {
            const elem = cartProducts[i];
            
            if( elem._id === cartProduct._id ) {
                return true;
            }
        }
        
        return false;
    }
}