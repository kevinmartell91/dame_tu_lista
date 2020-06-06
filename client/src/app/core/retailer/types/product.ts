import { Deserializable } from "../../../shared/models/deserializable.model";

export class Product implements Deserializable {

    public categoryImageUrl?: string;
    public categoryName?: string;
    public typeImageUrl?: string;
    public typeName?: string;
    public currency?: number;
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

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}