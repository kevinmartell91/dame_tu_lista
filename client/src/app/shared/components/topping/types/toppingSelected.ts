export interface ToppingSelected {
  name: string;
  name_abbreviation: string;
  selected: string;
  isMultipleSelection: boolean;
  countSelected: number;
}

export interface ToppingModalResult {
  quantity: number;
  productLabel: string;
  toppingsSelected: ToppingSelected[];
}
