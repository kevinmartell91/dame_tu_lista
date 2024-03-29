import { ToppingSelected } from 'src/app/shared/components/topping/types/toppingSelected';
import { Deserializable } from '../../../shared/models/deserializable.model';

export class CartProductOrder implements Deserializable {
  public _id?: string;
  public idAux?: string;
  public categoryImageUrl?: string;
  public categoryName?: string;
  public varietyImageUrl?: string;
  public varietyName?: string;
  public currency?: string;
  public price?: number;
  public isSmallSize?: boolean;
  public isMediumSize?: boolean;
  public isBigSize?: boolean;
  public isKilo?: boolean;
  public isUnit?: boolean;
  public isOrganic?: boolean;
  public isSeasonal?: boolean;
  public isMaturityDetails?: boolean;
  public maturityImageUrl?: string;
  public maturityName?: string;
  public maturityInfo?: string;
  public maturityEatIn?: string;
  public maturityLastFor?: string;
  public isInStock?: boolean;

  public quantity?: number;
  public details?: string;
  public size?: string;
  public totalAmount?: number;
  public totalPrice?: number;
  public isCheckedDone?: boolean = false;
  public toppings?: ToppingSelected[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
