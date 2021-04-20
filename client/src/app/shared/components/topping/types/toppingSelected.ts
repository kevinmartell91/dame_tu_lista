export interface ToppingSelected {
  name: string;
  selected: string;
  isMultipleSelection: boolean;
  countSelected: number;
}

export interface ToppingModalResult {
  quantity: number;
  productLabel: string;
  toppingsSelected: ToppingSelected[];
}
