import {
  Deserializable,
  Topping,
} from '../../../shared/models/deserializable.model';

export class Product implements Deserializable {
  public _id?: string;

  public type?: string;
  public isVisible?: boolean;

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

  public toppings?: Topping[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
