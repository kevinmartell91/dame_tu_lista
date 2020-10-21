import { Product } from 'src/app/core/retailer/types/product';
import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class Small {
    url: string;
    width: number;
    height: number;
}

export class Large {
    url: string;
    width: number;
    height: number;
}

export class Full {
    url: string;
    width: number;
    height: number;
}

export class Thumbnails {
    small: Small;
    large: Large;
    full: Full;
}

export class CategoryImg {
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: Thumbnails;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}

export class Small2 {
    url: string;
    width: number;
    height: number;
}

export class Large2 {
    url: string;
    width: number;
    height: number;
}

export class Full2 {
    url: string;
    width: number;
    height: number;
}

export class Thumbnails2 {
    small: Small2;
    large: Large2;
    full: Full2;
}

export class VarietyImg {
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: Thumbnails2;

    deserialize(input: any) {
        Object.assign(this, input);
    }
}

export class Small3 {
    url: string;
    width: number;
    height: number;
}

export class Large3 {
    url: string;
    width: number;
    height: number;
}

export class Full3 {
    url: string;
    width: number;
    height: number;
}

export class Thumbnails3 {
    small: Small3;
    large: Large3;
    full: Full3;
}

export class MaturityImg {
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: Thumbnails3;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class Fields implements Deserializable{
    _id: string;
    varietyImageUrl: string;
    Category_Img: CategoryImg[];
    categoryImageUrl: string;
    categoryName: string;
    varietyName: string;
    currency: string;
    price: number;
    isMediumSize: boolean;
    isUnit: boolean;
    isSeasonal: boolean;
    isMaturityDetails: boolean;
    maturityImageUrl: string;
    maturityName: string;
    maturityInfo: string;
    Variety_Img: VarietyImg[];
    maturityEatIn: number;
    maturityLastFor: number;
    isInStock: boolean;
    Maturity_Img: MaturityImg[];
    isSmallSize?: boolean;
    isKilo?: boolean;
    isOrganic?: boolean;
    isBigSize?: boolean;
    isProduction?: boolean;
    
    deserialize(input: any) {
        Object.assign(this, input);

        this.Category_Img = input.Category_Img.map(
            product => new CategoryImg().deserialize(product)
        );
        this.Category_Img = input.Category_Img.map(
            product => new VarietyImg().deserialize(product)
        );
        this.Category_Img = input.Category_Img.map(
            product => new MaturityImg().deserialize(product)
        );

        return this;
    }
}

export class Record {
    id: string;
    fields: Fields;
    createdTime: Date;

    deserialize(input: any) {
        Object.assign(this, input);
        return this
    }
}

export class RootObject implements Deserializable {
    records: Record[];

    deserialize(input: any) {
        Object.assign(this, input);

        this.records = input.records.map(
            product => new Record().deserialize(product)
        );

        return this;
    }
}

export function manuallyRetrievedAritableData():any {
    
    let productsList: Product[] = [];

    let data = {
      
   }
    let deserializedData  = new RootObject().deserialize(data);

    deserializedData.records.forEach(ele => {
        let AT = ele.fields;
       
        if(AT.isProduction) {

            let product = new Product();
    
            product.varietyImageUrl =  AT.Variety_Img[0].thumbnails.large.url;
            product.categoryImageUrl = AT.Category_Img[0].thumbnails.large.url;
            product.maturityImageUrl = AT.Maturity_Img[0].thumbnails.large.url;

            product.categoryName = CapFirstChar(AT.categoryName);
    
            product.varietyName = AT.varietyName == "-" ? "Normal" : CapFirstChar(AT.varietyName);
    
            product.currency = AT.currency;
            product.price = AT.price;
            product.isMediumSize = (AT.isMediumSize) ? product.isMediumSize = true : product.isMediumSize = false;
            product.isUnit = (AT.isUnit) ? product.isUnit = true : product.isUnit = false;
            product.isSeasonal = (AT.isSeasonal) ? product.isSeasonal = true : product.isSeasonal = false;
            product.isMaturityDetails = (AT.isMaturityDetails) ? product.isMaturityDetails = true : product.isMaturityDetails = false;
            product.maturityName = CapFirstChar(AT.maturityName);
            product.maturityInfo = AT.maturityInfo;
            product.maturityEatIn = AT.maturityEatIn.toString();
            product.maturityLastFor = AT.maturityLastFor.toString();
            product.isInStock = (AT.isInStock) ? product.isInStock = true : product.isInStock = false;
            product.isSmallSize = (AT.isSmallSize) ? product.isSmallSize = true : product.isSmallSize = false;
            product.isKilo = (AT.isKilo) ? product.isKilo = true : product.isKilo = false;
            product.isOrganic = (AT.isOrganic) ? product.isOrganic = true : product.isOrganic = false;
            product.isBigSize = (AT.isBigSize) ? product.isBigSize = true : product.isBigSize = false;
    
            productsList.push(product);
        }
        
    });

    let json = JSON.stringify({ productsList: productsList });
   //  console.log("mockedAmanuallyRetrievedAritableDataritableData - deserialzedData", deserializedData);
   //  console.log("mockedAmanuallyRetrievedAritableDataritableData - deserialzedData", json);


    
}

export function CapFirstChar(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
