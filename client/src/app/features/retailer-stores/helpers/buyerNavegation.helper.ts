
import { BuyerNavegationStore } from "../../../core/buyer/services/buyer-navegation.store";
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';

export function  updateBuyerNavagation(
    buyerNavegationStore: BuyerNavegationStore,
    newBuyerNavegationView: string
): void {

    let buyerNavegation = buyerNavegationStore.state.buyerNavegation;
    buyerNavegation.typeView = newBuyerNavegationView,
    buyerNavegationStore.setNewState(buyerNavegation);
    
}


// export function  storeBuyerNavegationInLocalStorage(
//     buyerNavegationStore: BuyerNavegationStore,
//     newBuyerNavegationView: string
// ): void {
//      // store in local storage in case the page is reloaded
//      localStorage.setItem('buyerNavegation',JSON.stringify(newBuyerNavegationView));
//      console.log("newBuyerNavegationView => ", JSON.parse(localStorage.getItem('buyerNavegation')));
// }

// // export function setBuyerNavegationFromLocalStorage( buyerNavegation: string ):void {
// export function getBuyerNavegationFromLocalStorage(  ):void {
//     let buyerNavegationLocalStorage = 
//       localStorage.getItem('buyerNavegation');

//     if (buyerNavegationLocalStorage === BUYER_CONFIG.navegation.storeView) {
//       updateBuyerNavagation(
//         this.buyerNavegationStore,
//         buyerNavegationLocalStorage
//       );
//     } 
//   }