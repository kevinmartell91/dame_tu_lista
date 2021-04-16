export interface ToppingSelected {
  name: string;
  selected: string;
  // selected: [string, number];
}
export interface ToppingModalResult {
  quantity: number;
  productLabel: string;
  toppingsSelected: ToppingSelected[];
}
