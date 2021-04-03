import { BuyerNavegationStore } from '../../../core/buyer/services/buyer-navegation.store';

export function updateBuyerNavagation(
  buyerNavegationStore: BuyerNavegationStore,
  newBuyerNavegationView: string,
  fieldText: string
): void {
  let buyerNavegation = buyerNavegationStore.state.buyerNavegation;
  buyerNavegation.typeView = newBuyerNavegationView;
  buyerNavegation.field = fieldText;
  buyerNavegationStore.setNewState(buyerNavegation);
  console.log('VIEW', buyerNavegationStore.state.buyerNavegation);
}
