export interface Deserializable {
  deserialize(input: any): this;
}

export class Topping {
  type_toppings: string;
  price_toppings: number[];
  isEnable_toppings: boolean;
  title_toppings: string;
  name_toppings: string[];
  isMultipleSelection_toppings: boolean;
}
