import { Deserializable } from '../models/deserializable.model';

export class Product implements Deserializable{
    categoryImageUrl?: string;
    categoryName?: string;
    typeName?: string;
    currency?: string;
    price?: number;
    isSmallSize?: boolean;
    isMediumSize?: boolean;
    isBigSize?: boolean;
    isKilo?: boolean;
    isUnit?: boolean;
    isOrganic?: boolean;
    isSeason?: boolean;
    isMaturityDetails?: string;
    maturityImageUrl?: string;
    maturityName?: string;
    maturityInfo?: string;
    maturityEatIn?: string;
    maturityLastFor?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
    
}