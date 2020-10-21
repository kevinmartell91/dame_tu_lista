import { BuyerNavegationStore } from "../../../core/buyer/services/buyer-navegation.store";

export function  updateBuyerNavagation(
    buyerNavegationStore: BuyerNavegationStore,
    newBuyerNavegationView: string
): void {

    let buyerNavegation = buyerNavegationStore.state.buyerNavegation;
    buyerNavegation.typeView = newBuyerNavegationView,
    buyerNavegationStore.setNewState(buyerNavegation);
    
}
