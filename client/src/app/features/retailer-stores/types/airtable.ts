import { Deserializable } from 'src/app/shared/models/deserializable.model';
import { element } from 'protractor';
import { Product } from 'src/app/core/retailer/types/product';

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
    
    let assetPath = "assets/testDataStore/";
    let productsList: Product[] = [];

    let data = {
        "records": [{
            "id": "rec3LWBDkJuAH0cD3",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attPzSuFGO5UNpjc4",
                    "url": "https://dl.airtable.com/.attachments/ef4d8673af8ed7a5bdd9203e16d4c0eb/373c0f0b/platano_seda_organico_selecta_comer_ya.jpg",
                    "filename": "platano_seda_organico_selecta_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5db65811151fb81444fdef91ea50ca3/f9c51dcb",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/06825fe0ccf14a10f02da8b2011cefda/af4aab27",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/034f17020809e35bff1a63160ce9b8fd/755a51dc",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:12:35.000Z"
        }, {
            "id": "rec55UNLaDlsMED7g",
            "fields": {
                "_id": "nectarine",
                "varietyImageUrl": "nectarine.jpg",
                "Category_Img": [{
                    "id": "attptR44X3d8kaChc",
                    "url": "https://dl.airtable.com/.attachments/85244c81666fbc9e2267bc0e91117cd3/859ff6fe/categoria_nectarine.jpg",
                    "filename": "categoria_nectarine.jpg",
                    "size": 239705,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e55aa19e9d5f63c3e433331a3ed551ce/6d51a179",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/eb59452639ce2697e173149dff7c9819/bbcc4a78",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5cb8647d6878cd1a60032207ae997d4e/3c1627b4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_nectarine.jpg",
                "categoryName": "nectarine",
                "varietyName": "-",
                "currency": "PEN",
                "price": 10,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attD8CeXw4ZLno0bw",
                    "url": "https://dl.airtable.com/.attachments/4c7053375dd3a1a67e46021324154bad/9b58441e/nectarine.jpg",
                    "filename": "nectarine.jpg",
                    "size": 86662,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0e62bc0ae0a2d857043a72657f462557/5b984db0",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/605b30e7ed5c2c96b63e91554c5b27e7/0d2b54c3",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5fdeccb540ea7eeeb58f72d8bd06b960/d0d260ce",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:00:55.000Z"
        }, {
            "id": "rec5AaDOZsTTT2CYC",
            "fields": {
                "_id": "uva copy",
                "varietyImageUrl": "uva_italia_selecta.jpg",
                "Category_Img": [{
                    "id": "attJWthOGhfBYOQo2",
                    "url": "https://dl.airtable.com/.attachments/49783e3bc7549cd714bb525556f68a62/185fe85b/categoria_uva.jpg",
                    "filename": "categoria_uva.jpg",
                    "size": 51995,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43f44c9732de1b4130b62e9d5c4ddc44/851816c4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f1e497b2568344d3f017a7d66f0fd2d/f96998c9",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/48b6d99e065eec40eac4a44d543dfec0/50a1849a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_uva.jpg",
                "categoryName": "uva",
                "varietyName": "italiana selecta c/p",
                "currency": "PEN",
                "price": 3.5,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attViz6bxufFIk3dR",
                    "url": "https://dl.airtable.com/.attachments/6a530db3d27819c2e0f2707e4cba8936/1b95f310/uva_italia_selecta.jpg",
                    "filename": "uva_italia_selecta.jpg",
                    "size": 89584,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b5da5ca93a78c4ea53a708206ac5e15b/d4c5cf41",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9bd9027ca2e44b4b3ab0eb2fa3c1fe3f/a55217c6",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/26bb799ebef57ec122c65947c9e62aeb/17aacf92",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:49:09.000Z"
        }, {
            "id": "rec5FS71yQNu0Tud3",
            "fields": {
                "_id": "platano copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.7,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attrOUgGDAhqjdQwE",
                    "url": "https://dl.airtable.com/.attachments/3c60e6a833f595cefa8ea5ef852c1393/0969ea65/platano_seda_organico_granel_inmaduro.jpg",
                    "filename": "platano_seda_organico_granel_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5d387d5d166d99db222859ad4bb747c8/91f1791a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/11644f336ec9a53513b83326086079fe/2e65ed2f",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ea5f69dd4431af12a43e4703424932d1/6e2d8e35",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:21:43.000Z"
        }, {
            "id": "rec5LrkoESSWiOS55",
            "fields": {
                "_id": "yacon",
                "varietyImageUrl": "yacon.jpg",
                "Category_Img": [{
                    "id": "attbo1PbHXZEXItTA",
                    "url": "https://dl.airtable.com/.attachments/86b4da61dab5221c210af26bf28d42ed/d50afd9b/categoria_yacon.jpg",
                    "filename": "categoria_yacon.jpg",
                    "size": 261181,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/81288b33209f86c9039bd84dcfd7187a/aafb2f7d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/decbd6145397fac83a1d37632a61e1ac/913f2001",
                            "width": 500,
                            "height": 500
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/71787c98f1e8ec2d543c581354390a03/3a2a3f96",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_yacon.jpg",
                "categoryName": "yacón",
                "varietyName": "-",
                "currency": "PEN",
                "price": 3.5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attq1n4ycojIn7pWK",
                    "url": "https://dl.airtable.com/.attachments/901bb9f496dc54df9bf441c427a9eb76/fdb2e1aa/yacon.jpg",
                    "filename": "yacon.jpg",
                    "size": 66326,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f87d1fcc5478858ddbe4af996c79cc30/54ce04bc",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/add17aa01ad251a8902e2b5c47aebf47/73fd2195",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f52224b27a59b4443c68533f0d1d9069/91eaa8f7",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:42:38.000Z"
        }, {
            "id": "rec7WvxgLuyqZjk73",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.7,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "atth02tngyQQwqPb4",
                    "url": "https://dl.airtable.com/.attachments/4046b8c2bda1e4f3e1b60600b7880976/8a81c9b4/platano_seda_organico_granel_comer_ya.jpg",
                    "filename": "platano_seda_organico_granel_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0cf8acb0592eca9793688e1cb7573c74/859af66c",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c931a376fb299ac50bd4252b4d533bec/9d063300",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/96f2061442d58afd467bb1e8e7206bf4/25ba5df3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:21:46.000Z"
        }, {
            "id": "rec7iD1LtxW29jQR4",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_bellaco.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "bellaco",
                "currency": "PEN",
                "price": 1,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_bellaco_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att5bDFTxNgI8L4ST",
                    "url": "https://dl.airtable.com/.attachments/2b924634c116ff49131aa088213d3d6e/e20fc12b/platano_bellaco.jpg",
                    "filename": "platano_bellaco.jpg",
                    "size": 35666,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3a1304d534c4441e3e26f38e8dd31211/ad2a142a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/097e9ebee98c23789eaee0eebb6cf20d/0f4325d2",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/648bfc34f742ce69a9c595d10b6ecdde/e1593e85",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attPgxfG77PsZlYhB",
                    "url": "https://dl.airtable.com/.attachments/a4f70d5b7b9eeee0b9522cea672dc60f/17fb5909/platano_bellaco_maduro.jpg",
                    "filename": "platano_bellaco_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7f81f3dddb82a4f8e4914c1b71861086/f46311ed",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c0aee7bf629e31ea51579f4f75ab7008/023ac143",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a78d742c8317416b96bd30b32090ad72/18c859bd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:49:02.000Z"
        }, {
            "id": "rec8oyzyE2OYXNNK8",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_manzano.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "manzano",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att7fmUfNoxXbXPhs",
                    "url": "https://dl.airtable.com/.attachments/6b2680843bffc72e6907ba39a4f211ee/2fee19e0/platano_manzano.jpg",
                    "filename": "platano_manzano.jpg",
                    "size": 28294,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43dbd791a074e4f6f1e58d5686e10d7b/5e1f3fb3",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/32689e7cec4a8c48cb93566707f97c7e/4ee26d80",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c32004868f45522a0913640c649959c/cc9ab12c",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:03:28.000Z"
        }, {
            "id": "recAFbDAemjRA06tU",
            "fields": {
                "_id": "fresas copy",
                "varietyImageUrl": "fresa.jpg",
                "Category_Img": [{
                    "id": "attVzjQCS5ZtnLkvv",
                    "url": "https://dl.airtable.com/.attachments/88672583ebdcbc41f115ec2183a5b155/dd017ede/categoria_fresa.jpg",
                    "filename": "categoria_fresa.jpg",
                    "size": 75774,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8f4744b7acc259254b3b10637240c9c/39db988e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d78461a55ebae0cbbaba2ff507927831/3e90f60a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b2b51d0627d8d4631bc8e159e9a603d2/f5781568",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_fresa.jpg",
                "categoryName": "fresa",
                "varietyName": "-",
                "currency": "PEN",
                "price": 10,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att4CjjR5xYNdmwJx",
                    "url": "https://dl.airtable.com/.attachments/972220519cf44a74c55e2d5bf6adaf12/fa5e7add/fresa.jpg",
                    "filename": "fresa.jpg",
                    "size": 294008,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3cdd438bc2d17b72b7473621cf15c2f1/706a9ae1",
                            "width": 64,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e58ce5057362d2f64d48ccf8a54c2651/405a12af",
                            "width": 910,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2726761b6e770e54af7344b69af1856a/a6e29bfa",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:11:49.000Z"
        }, {
            "id": "recAjTULe8VudsTdb",
            "fields": {
                "_id": "fresas",
                "varietyImageUrl": "fresa.jpg",
                "Category_Img": [{
                    "id": "attVzjQCS5ZtnLkvv",
                    "url": "https://dl.airtable.com/.attachments/88672583ebdcbc41f115ec2183a5b155/dd017ede/categoria_fresa.jpg",
                    "filename": "categoria_fresa.jpg",
                    "size": 75774,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8f4744b7acc259254b3b10637240c9c/39db988e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d78461a55ebae0cbbaba2ff507927831/3e90f60a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b2b51d0627d8d4631bc8e159e9a603d2/f5781568",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_fresa.jpg",
                "categoryName": "fresa",
                "varietyName": "-",
                "currency": "PEN",
                "price": 6,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att4CjjR5xYNdmwJx",
                    "url": "https://dl.airtable.com/.attachments/972220519cf44a74c55e2d5bf6adaf12/fa5e7add/fresa.jpg",
                    "filename": "fresa.jpg",
                    "size": 294008,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3cdd438bc2d17b72b7473621cf15c2f1/706a9ae1",
                            "width": 64,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e58ce5057362d2f64d48ccf8a54c2651/405a12af",
                            "width": 910,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2726761b6e770e54af7344b69af1856a/a6e29bfa",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:08:34.000Z"
        }, {
            "id": "recAyIhDESstiksMI",
            "fields": {
                "_id": "mandarina copy",
                "varietyImageUrl": "mandarina_sp.jpg",
                "Category_Img": [{
                    "id": "attMUerjm2ZtKG6iM",
                    "url": "https://dl.airtable.com/.attachments/a871d52d18bf1dadf3f29ba8fbdbb264/49847aa1/categoria_mandarina.jpg",
                    "filename": "categoria_mandarina.jpg",
                    "size": 91332,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c15c0699848e8994ce820877daca0fe/44aadf28",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/95debd6e68ac0f071bec3caed5e71f57/df166ff7",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/55c505385516b7ef780769b7bbb33af8/4b2e56ab",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mandarina.jpg",
                "categoryName": "mandarina",
                "varietyName": "normal s/p",
                "currency": "PEN",
                "price": 5,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attpPfQ6ZU4fk1vNP",
                    "url": "https://dl.airtable.com/.attachments/f23042bb5ee8ae33d8386f32f6041def/67039027/mandarina_sp.jpg",
                    "filename": "mandarina_sp.jpg",
                    "size": 74307,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e0360ae8a6ec3d232b62c69dbd784c79/25dcb4d9",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c30d30ad3cdaa65070406e7390986d5b/ea201b06",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0e253899454f36897c845755268431ed/8c71dd1b",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:35:52.000Z"
        }, {
            "id": "recBLZ2zIkdwJeFzg",
            "fields": {
                "_id": "platano copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attevtUuXkPo1XzGD",
                    "url": "https://dl.airtable.com/.attachments/9727a3fab1af02d682d06c39beb27d2b/bc62aa59/platano_seda_organico_selecta_semi_maduro.jpg",
                    "filename": "platano_seda_organico_selecta_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b55d5884fb51ec7c2369397d029602a8/bb32d679",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/704b8ce987ac42d72d57a56a6d58788f/dc3d831a",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/934a15a46fea14f2c9a7c9831919bc14/3cca87be",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:09:08.000Z"
        }, {
            "id": "recBad3Lfi3eUaT7S",
            "fields": {
                "_id": "mango copy",
                "varietyImageUrl": "mango_edward_selecta.jpg",
                "Category_Img": [{
                    "id": "attY4RwwFJHEiKBEJ",
                    "url": "https://dl.airtable.com/.attachments/1905afb9dd09e61a9376a5ba5f7de25b/43ffa8c3/categoria_mango.jpg",
                    "filename": "categoria_mango.jpg",
                    "size": 72184,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c4b28f2f3518343bc466329df099d5a/7c06534f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e21a1c5758ed7b7e6201a2e51244901a/e6ab5672",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/accbed648154353508bc7b398cb9e526/ab97b263",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mango.jpg",
                "categoryName": "mango",
                "varietyName": "edward selecta",
                "currency": "PEN",
                "price": 8,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attPzMHjG1WHWAQjf",
                    "url": "https://dl.airtable.com/.attachments/7aadbc38be5186f7b729a121fbe90a5f/eb72a121/mango_edward_selecta.jpg",
                    "filename": "mango_edward_selecta.jpg",
                    "size": 81149,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/13fdbe418408dde4fd79447a90161b56/b2e5786f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c87cccca75faf24437ae2d573c5ef8b/ed31d227",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5e59f5f63b2c1283df61c3b453fe0dc9/89142e63",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:26:23.000Z"
        }, {
            "id": "recC32hMh4I3Rrbck",
            "fields": {
                "_id": "sandia",
                "varietyImageUrl": "melon_coquito.jpg",
                "Category_Img": [{
                    "id": "attF8s77Hgp3nrFFi",
                    "url": "https://dl.airtable.com/.attachments/376e62236096feb64b343c79f26de26c/8e40e0fa/categoria_melon.jpg",
                    "filename": "categoria_melon.jpg",
                    "size": 151648,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/758e134856ad1604ab046df5602ebf6b/34b6d99a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1f778bfa8eff28e72aadb5fb9f26e24a/9db7559c",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/254a8328978cc7b2c6474f7bca8d5cfc/b99d8530",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_melon.jpg",
                "categoryName": "melón",
                "varietyName": "coquito",
                "currency": "PEN",
                "price": 3,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attyPiDToQ7mgjvVO",
                    "url": "https://dl.airtable.com/.attachments/f2d47a640974f935397a9ca22b7c02d4/0bbdc348/melon_coquito.jpg",
                    "filename": "melon_coquito.jpg",
                    "size": 160164,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9c916cf4478b42d7f5b498c30f96676/51b0ce83",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d1c0a6914f3d7104903912254f445910/7424706b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/70b49e57a0e48b4444387035f6bd3856/326b540f",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T21:49:03.000Z"
        }, {
            "id": "recCjBwP7lX4W6R9B",
            "fields": {
                "_id": "uva",
                "varietyImageUrl": "uva_red_globe.jpg",
                "Category_Img": [{
                    "id": "attJWthOGhfBYOQo2",
                    "url": "https://dl.airtable.com/.attachments/49783e3bc7549cd714bb525556f68a62/185fe85b/categoria_uva.jpg",
                    "filename": "categoria_uva.jpg",
                    "size": 51995,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43f44c9732de1b4130b62e9d5c4ddc44/851816c4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f1e497b2568344d3f017a7d66f0fd2d/f96998c9",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/48b6d99e065eec40eac4a44d543dfec0/50a1849a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_uva.jpg",
                "categoryName": "uva",
                "varietyName": "red globe c/p",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att9JlPIBa4y4PPSH",
                    "url": "https://dl.airtable.com/.attachments/86169cd9e988459dad9f6f99d5cd4eec/09da796b/uva_red_globe.jpg",
                    "filename": "uva_red_globe.jpg",
                    "size": 80121,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8c233a97d58a3c44916601b46130dc31/9b8415ed",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1062b038bdcfaaa6caf48b5f2b53c7e0/1f6e6835",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a2c372f37864fb05ae27795554fe591c/addd0168",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:45:56.000Z"
        }, {
            "id": "recDCuVeH7kKHg6Mg",
            "fields": {
                "_id": "mango copy copy copy",
                "varietyImageUrl": "mango_criollo.jpg",
                "Category_Img": [{
                    "id": "attY4RwwFJHEiKBEJ",
                    "url": "https://dl.airtable.com/.attachments/1905afb9dd09e61a9376a5ba5f7de25b/43ffa8c3/categoria_mango.jpg",
                    "filename": "categoria_mango.jpg",
                    "size": 72184,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c4b28f2f3518343bc466329df099d5a/7c06534f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e21a1c5758ed7b7e6201a2e51244901a/e6ab5672",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/accbed648154353508bc7b398cb9e526/ab97b263",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mango.jpg",
                "categoryName": "mango",
                "varietyName": "criollo",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att45ceFVd9uxKqkN",
                    "url": "https://dl.airtable.com/.attachments/dc57e37d0f025ed593854f4226670f87/8399ecbd/mango_criollo.jpg",
                    "filename": "mango_criollo.jpg",
                    "size": 64131,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9676ca87e860aa55cb8da2d22098133d/7f0013f1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/baff2ecd405f9f28226ddfee7c74c428/cdddaf3b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f8d6d2e86715849e65924a42922d2701/85f08136",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:28:02.000Z"
        }, {
            "id": "recDdyiGussEyvaG9",
            "fields": {
                "_id": "platano copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.7,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attOqIvhMgOM7435o",
                    "url": "https://dl.airtable.com/.attachments/6cc2175d5a94ccec7345965ceda1b776/b37e66af/platano_seda_organico_granel_maduro.jpg",
                    "filename": "platano_seda_organico_granel_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/24aaea628e8a4d61728d5dd7b9efe609/df3a164f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a4a12cdf98deda425bca2a271c441828/1f730de7",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/44a9e3382bdcba1b92f5291443e5da83/65b3fda1",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:21:46.000Z"
        }, {
            "id": "recE8lvhEmWo3QyjT",
            "fields": {
                "_id": "platano copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attevtUuXkPo1XzGD",
                    "url": "https://dl.airtable.com/.attachments/9727a3fab1af02d682d06c39beb27d2b/bc62aa59/platano_seda_organico_selecta_semi_maduro.jpg",
                    "filename": "platano_seda_organico_selecta_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b55d5884fb51ec7c2369397d029602a8/bb32d679",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/704b8ce987ac42d72d57a56a6d58788f/dc3d831a",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/934a15a46fea14f2c9a7c9831919bc14/3cca87be",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:12:35.000Z"
        }, {
            "id": "recEXHv2VGUD6G0mk",
            "fields": {
                "_id": "uva copy",
                "varietyImageUrl": "uva_verde.jpg",
                "Category_Img": [{
                    "id": "attJWthOGhfBYOQo2",
                    "url": "https://dl.airtable.com/.attachments/49783e3bc7549cd714bb525556f68a62/185fe85b/categoria_uva.jpg",
                    "filename": "categoria_uva.jpg",
                    "size": 51995,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43f44c9732de1b4130b62e9d5c4ddc44/851816c4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f1e497b2568344d3f017a7d66f0fd2d/f96998c9",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/48b6d99e065eec40eac4a44d543dfec0/50a1849a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_uva.jpg",
                "categoryName": "uva",
                "varietyName": "verde s/p",
                "currency": "PEN",
                "price": 20,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att1hXIqnb4WDUe6a",
                    "url": "https://dl.airtable.com/.attachments/3b901d8bc91cf19438414753a6509c16/ba100ed8/uva_verde.jpg",
                    "filename": "uva_verde.jpg",
                    "size": 42358,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/708299a9887959d356cbf239bb2bc9a4/f7558d95",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fe28b79e6ed358eb2001231eb76f9e3e/8c947076",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b289eaf60c81be8fa1f3490fc6d1cc34/70b18214",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:47:26.000Z"
        }, {
            "id": "recGUlT7mxHxywEI3",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_verde_americana.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "verde americana",
                "currency": "PEN",
                "price": 9,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attjRsf9jP8zq91Oi",
                    "url": "https://dl.airtable.com/.attachments/319c1dafaae271a3466a871c3948bccf/4718b597/manzana_verde_americana.jpg",
                    "filename": "manzana_verde_americana.jpg",
                    "size": 76263,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/dc36c472dcd969e3b55d00a638b73af5/73ccbd91",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9b1cf2a88b0ebb296f8ff5cb43d9ce4d/8a5f5f0a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a63bddef2d482891eb12ce40b6396d5f/34488b49",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:21:42.000Z"
        }, {
            "id": "recGY62i3WgkhAnc7",
            "fields": {
                "_id": "pera",
                "varietyImageUrl": "pera.jpg",
                "Category_Img": [{
                    "id": "attUw8zFx48boP6Cx",
                    "url": "https://dl.airtable.com/.attachments/000e9d8746e7157d466f63a2729faef9/88d41285/categoria_pera.jpg",
                    "filename": "categoria_pera.jpg",
                    "size": 66059,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9386f91969b25d108885164a726b7120/964b2d2e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76221a211b25380332c615a2fb230b6c/b888bc70",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/74162dccbb5dac95eda3fb191ce179b8/1c4812be",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_pera.jpg",
                "categoryName": "pera",
                "varietyName": "-",
                "currency": "PEN",
                "price": 8,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attd980MfAvAc2t08",
                    "url": "https://dl.airtable.com/.attachments/0718b683c0564969b938ee4b72cc3628/bd1e1459/pera.jpg",
                    "filename": "pera.jpg",
                    "size": 70638,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c4bc5ea4ea98fca3297332bbd166172/e6be2176",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/dd82253847136d223a56341f9ce40df2/5df90435",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8ce5caec8f996500cbf0872319cfa09b/b23f596a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T21:57:57.000Z"
        }, {
            "id": "recHQypjSkN7d7QfK",
            "fields": {
                "_id": "papaya",
                "varietyImageUrl": "papaya_selecta_amarilla.jpg",
                "Category_Img": [{
                    "id": "attePhLm42f4IGJfN",
                    "url": "https://dl.airtable.com/.attachments/db82074299f3307440cfd6b98b28899b/31f9754b/categoria_papaya.jpg",
                    "filename": "categoria_papaya.jpg",
                    "size": 57967,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8569189101e17f688246a1101152461e/13062ac1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/370ba3dacf6468dc19193130c0c330f5/4f7db082",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2a15b49e95a3c54b554ab52d94dc5248/3277d948",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_papaya.jpg",
                "categoryName": "papaya",
                "varietyName": "selecta amarilla",
                "currency": "PEN",
                "price": 5,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attYhv8xQMLiydMIZ",
                    "url": "https://dl.airtable.com/.attachments/ceccc8a27d32e0e27a72762e51c2e76c/bc1cdcc7/papaya_selecta_amarilla.jpg",
                    "filename": "papaya_selecta_amarilla.jpg",
                    "size": 34322,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d2129cb41acfc3d1f6d5d3309511b3c6/38a963ce",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d031d05df79a70687824b6efb43c6000/2dab5ec3",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/448c51513299fba9faaf3c58b6613219/c82e3058",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:30:12.000Z"
        }, {
            "id": "recJcBuWNtHIvWeFi",
            "fields": {
                "_id": "aguaymanto",
                "varietyImageUrl": "aguaymanto_rubias.jpg",
                "Category_Img": [{
                    "id": "att21kxjVazvkX0GV",
                    "url": "https://dl.airtable.com/.attachments/b5c65ab303e7801cdda6784625951c4d/32ca9f2f/categoria_aguaymanto.jpg",
                    "filename": "categoria_aguaymanto.jpg",
                    "size": 15176,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/88d8c9778bd50939db421d8f6a04b985/2e040759",
                            "width": 44,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c71a28ecd779ff26dc9c12dc26e5da2/6110dc21",
                            "width": 500,
                            "height": 413
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/13aeb2ff1dbbf7a71d2eaab38e790668/a43c2c0d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_aguaymanto.jpg",
                "categoryName": "aguaymanto",
                "varietyName": "rubias",
                "currency": "PEN",
                "price": 10,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att9nb2xyt9Cqzedz",
                    "url": "https://dl.airtable.com/.attachments/9a81c1ee114c5b340ee4fffb78275f99/f394d078/aguaymanto_rubias.jpg",
                    "filename": "aguaymanto_rubias.jpg",
                    "size": 85149,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3fb4c49ed5dd5cf19ba88a8608efc875/3e31314f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/616383cfeb4fa1d25c05d50a1167f70b/de6872fe",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ba6ea2dfec861a62f4a664475f323c66/6afe3599",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:03:06.000Z"
        }, {
            "id": "recJjKSyoHqkQjzsu",
            "fields": {
                "_id": "mandarina",
                "varietyImageUrl": "mandarina_niños_sp.jpg",
                "Category_Img": [{
                    "id": "attMUerjm2ZtKG6iM",
                    "url": "https://dl.airtable.com/.attachments/a871d52d18bf1dadf3f29ba8fbdbb264/49847aa1/categoria_mandarina.jpg",
                    "filename": "categoria_mandarina.jpg",
                    "size": 91332,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c15c0699848e8994ce820877daca0fe/44aadf28",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/95debd6e68ac0f071bec3caed5e71f57/df166ff7",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/55c505385516b7ef780769b7bbb33af8/4b2e56ab",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mandarina.jpg",
                "categoryName": "mandarina",
                "varietyName": "para niños s/p",
                "currency": "PEN",
                "price": 3.5,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attSM2SZO3EXrhA7a",
                    "url": "https://dl.airtable.com/.attachments/47a7669dbb8f1cbc3166d7bf6cb78340/83a66854/mandarina_nios_sp.jpg",
                    "filename": "mandarina_niños_sp.jpg",
                    "size": 74307,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/dd747898d68320e699c4cec0d12ca265/3ec1d596",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/4cc80846fec8e6cceb63990174ce2ad2/e480afed",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9418c517ed654de02acbbdbbffa6d851/17442c97",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:33:11.000Z"
        }, {
            "id": "recJneqnMb889h6PM",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_bizcocho.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "bizcocho",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attA5XLPxeSmeP5cv",
                    "url": "https://dl.airtable.com/.attachments/95f1ac8e2593f22bc2da55c84fc8087d/42b85719/platano_bizcocho.jpg",
                    "filename": "platano_bizcocho.jpg",
                    "size": 194089,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0bd4ee4216fa3b010f91707f4b70791c/709590bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/61743339e4be7aa1f3a1973dd2aca711/bdbf8040",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/67417fb89184646028b29c45eb9ea5a2/66ab0078",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T00:59:48.000Z"
        }, {
            "id": "recKDhQXyaRnXv7EW",
            "fields": {
                "_id": "durazno",
                "varietyImageUrl": "durazno.jpg",
                "Category_Img": [{
                    "id": "attZ7BiSlVtV89wBT",
                    "url": "https://dl.airtable.com/.attachments/0ed0be0da7510c9f171025b9d7a07353/6da15713/categoria_durazno.jpg",
                    "filename": "categoria_durazno.jpg",
                    "size": 78824,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/655ea901ca8026e7da5172aa13d55b33/b176dca6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ecdc318a0529c2857418dc0e7e75bcac/634f1fc5",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/42feba97c7b3120d1220824959fece32/86d089af",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_durazno.jpg",
                "categoryName": "durazno",
                "varietyName": "-",
                "currency": "PEN",
                "price": 6,
                "isMediumSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "atto1qIEbwsUhye3H",
                    "url": "https://dl.airtable.com/.attachments/e7dfffc3f3f6217a5248842fd4816489/15a6ee73/durazno.jpg",
                    "filename": "durazno.jpg",
                    "size": 117601,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ac595ab6b0b4e8d105cad94d6f65834b/be948ec1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/246513f558f0609047649861eec19c1c/a349090c",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/104118beef6ee671d5b71fd2ff918e22/af73d4cb",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:57:57.000Z"
        }, {
            "id": "recKo6zs7cJ0Qv5qG",
            "fields": {
                "_id": "mango",
                "varietyImageUrl": "mango_edward_selecta.jpg",
                "Category_Img": [{
                    "id": "attY4RwwFJHEiKBEJ",
                    "url": "https://dl.airtable.com/.attachments/1905afb9dd09e61a9376a5ba5f7de25b/43ffa8c3/categoria_mango.jpg",
                    "filename": "categoria_mango.jpg",
                    "size": 72184,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c4b28f2f3518343bc466329df099d5a/7c06534f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e21a1c5758ed7b7e6201a2e51244901a/e6ab5672",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/accbed648154353508bc7b398cb9e526/ab97b263",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mango.jpg",
                "categoryName": "mango",
                "varietyName": "edward selecta",
                "currency": "PEN",
                "price": 7,
                "isMediumSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attPzMHjG1WHWAQjf",
                    "url": "https://dl.airtable.com/.attachments/7aadbc38be5186f7b729a121fbe90a5f/eb72a121/mango_edward_selecta.jpg",
                    "filename": "mango_edward_selecta.jpg",
                    "size": 81149,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/13fdbe418408dde4fd79447a90161b56/b2e5786f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c87cccca75faf24437ae2d573c5ef8b/ed31d227",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5e59f5f63b2c1283df61c3b453fe0dc9/89142e63",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:24:51.000Z"
        }, {
            "id": "recMs6Qk29SRtU6b3",
            "fields": {
                "_id": "aceituna",
                "varietyImageUrl": "aceituna_botija.jpg",
                "Category_Img": [{
                    "id": "attTSqhfpopRFN09e",
                    "url": "https://dl.airtable.com/.attachments/bc912908bd18fbde24983fe6ccc87313/dd0f30dd/categoria_aceituna.jpg",
                    "filename": "categoria_aceituna.jpg",
                    "size": 83010,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/32b8a4d149bfbb007732961a2be8105d/a40fb426",
                            "width": 48,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/aeff87d354a5561aee272fc78408c022/b34a9a98",
                            "width": 683,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/faadde8a00ccbca904b8a1b337bf118b/499af92e",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_aceituna.jpg",
                "categoryName": "aceituna",
                "varietyName": "botija",
                "currency": "PEN",
                "price": 12,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attRqPjMtSMW9joyh",
                    "url": "https://dl.airtable.com/.attachments/d7983c864a2a643b4bc4dfe5d0caa9f7/5e392d1f/aceituna_botija.jpg",
                    "filename": "aceituna_botija.jpg",
                    "size": 43370,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3669ea290e0a373218d163a2d95829d7/074a41e0",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/96f3cb4d8fdd1b59f4516ab1fc7325ef/074d1bb7",
                            "width": 458,
                            "height": 458
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a40c8f5157ac38f54a39eaf648f47a28/fa0907fd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T01:17:35.000Z"
        }, {
            "id": "recNsN6i2yCrz06XV",
            "fields": {
                "_id": "piña copy",
                "varietyImageUrl": "piña_golden.jpeg",
                "Category_Img": [{
                    "id": "attc35MNHgp67Il3B",
                    "url": "https://dl.airtable.com/.attachments/50fbef03fc82e24446bcf8695a7dbabd/5f3b4a57/categoria_pia.jpg",
                    "filename": "categoria_piña.jpg",
                    "size": 89318,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8c93dd7a104264ca1adecd818420163/aab3dfe8",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a433ef4b4dcf329f6df71464451fac3e/98828a68",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a324f7baca38ba0b5369847979bf27e4/89e253ba",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_piña.jpg",
                "categoryName": "piña",
                "varietyName": "golden",
                "currency": "PEN",
                "price": 4,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attezs2IUIfM4tvK1",
                    "url": "https://dl.airtable.com/.attachments/62430337e4e03ff8cee547a44822c8fe/f45ac1b1/pia_golden.jpeg",
                    "filename": "piña_golden.jpeg",
                    "size": 111454,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/596c23e3032f80a2f3f7e321c7eb310d/72312cc2",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e33d921cc90f98d6a39af382d669a390/7897e93e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/630e55b96d77a3b4cca9a9332267d097/9bf70f9d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:37:19.000Z"
        }, {
            "id": "recPSETYZmqZSnx35",
            "fields": {
                "_id": "mango copy copy",
                "varietyImageUrl": "mango_kent.jpg",
                "Category_Img": [{
                    "id": "attY4RwwFJHEiKBEJ",
                    "url": "https://dl.airtable.com/.attachments/1905afb9dd09e61a9376a5ba5f7de25b/43ffa8c3/categoria_mango.jpg",
                    "filename": "categoria_mango.jpg",
                    "size": 72184,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c4b28f2f3518343bc466329df099d5a/7c06534f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e21a1c5758ed7b7e6201a2e51244901a/e6ab5672",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/accbed648154353508bc7b398cb9e526/ab97b263",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mango.jpg",
                "categoryName": "mango",
                "varietyName": "kent",
                "currency": "PEN",
                "price": 3.5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attbdCioJYV8paOul",
                    "url": "https://dl.airtable.com/.attachments/dd06a037e1eda188dfc3c7cededd296a/991bdc59/mango_kent.jpg",
                    "filename": "mango_kent.jpg",
                    "size": 32188,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7aa1d5df57bf467d0ac1a98fc3fc4d47/f6d7b0d6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/bd4ac618826c41f94a0098ae4867ab7b/1b862923",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d7dfd354925d83019cb4b89420472e2c/b72ec78d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:26:46.000Z"
        }, {
            "id": "recQ5wg9CIxQaihMK",
            "fields": {
                "_id": "platano copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att3k9wGEZBWgfHqX",
                    "url": "https://dl.airtable.com/.attachments/ee4937c0e4b609a2a8ea0a89bbc3afc7/22754200/platano_seda_organico_selecta_inmaduro.jpg",
                    "filename": "platano_seda_organico_selecta_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5d9a79fc556ccda6ac14cb1c1a5ae6c0/4db1733f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e15dc19817b7322038e821523959c4b6/9ed60082",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/892a302029ace83d87b8415c7aea2cfc/9eb12132",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-24T23:37:51.000Z"
        }, {
            "id": "recRDjvAYxrJkdYPY",
            "fields": {
                "_id": "palta",
                "varietyImageUrl": "palta_de_primera_cremosa.jpg",
                "Category_Img": [{
                    "id": "att3SlQYCZDGwIyK8",
                    "url": "https://dl.airtable.com/.attachments/5d08d1e1b579b21926424762e925c415/4b1d49b5/categoria_palta.jpg",
                    "filename": "categoria_palta.jpg",
                    "size": 122960,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/590a0b5060e419188c877d2066995436/171d09d6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c6d7bfd38061cabdeadf721bfed3e936/8f5f704b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a6515a585e18f086cc6ac2a33fa92d45/fc7ef287",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_palta.jpg",
                "categoryName": "palta",
                "varietyName": "de primera cremosa",
                "currency": "PEN",
                "price": 12,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attq3FemMgnfDQIrc",
                    "url": "https://dl.airtable.com/.attachments/6b33f44c9e991c224865d48e4c4fac06/e18ac537/palta_de_primera_cremosa.jpg",
                    "filename": "palta_de_primera_cremosa.jpg",
                    "size": 47221,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9ae42174f4c046fc7b0d3f4e9daf7e20/5ea9dcef",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d30ede046bdf1b555b6a9eed81be4cf5/202405f5",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/bfbe3b4589bac25c4c636504b320e0d7/32a543e0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:58:16.000Z"
        }, {
            "id": "recRQt92lYE2f5LTL",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_bellaco.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "bellaco",
                "currency": "PEN",
                "price": 1,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_bellaco_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att5bDFTxNgI8L4ST",
                    "url": "https://dl.airtable.com/.attachments/2b924634c116ff49131aa088213d3d6e/e20fc12b/platano_bellaco.jpg",
                    "filename": "platano_bellaco.jpg",
                    "size": 35666,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3a1304d534c4441e3e26f38e8dd31211/ad2a142a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/097e9ebee98c23789eaee0eebb6cf20d/0f4325d2",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/648bfc34f742ce69a9c595d10b6ecdde/e1593e85",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attYWShm7d5WQOjEd",
                    "url": "https://dl.airtable.com/.attachments/232e791da4e6df4473690c51b28a4f39/581bc347/platano_bellaco_inmaduro.jpg",
                    "filename": "platano_bellaco_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5f1ff0389418471bb95ad3bdb50d9530/80a3d2bc",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ba3f1becff34dd5ecd41882da373fede/31df9154",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7dc878a3a2d4f70a7bc370538cd1b895/7e7d97b8",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:47:43.000Z"
        }, {
            "id": "recRr9pTMhGeYmMfH",
            "fields": {
                "_id": "pera",
                "varietyImageUrl": "pera.jpg",
                "Category_Img": [{
                    "id": "attUw8zFx48boP6Cx",
                    "url": "https://dl.airtable.com/.attachments/000e9d8746e7157d466f63a2729faef9/88d41285/categoria_pera.jpg",
                    "filename": "categoria_pera.jpg",
                    "size": 66059,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9386f91969b25d108885164a726b7120/964b2d2e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76221a211b25380332c615a2fb230b6c/b888bc70",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/74162dccbb5dac95eda3fb191ce179b8/1c4812be",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_pera.jpg",
                "categoryName": "pera",
                "varietyName": "-",
                "currency": "PEN",
                "price": 7,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attd980MfAvAc2t08",
                    "url": "https://dl.airtable.com/.attachments/0718b683c0564969b938ee4b72cc3628/bd1e1459/pera.jpg",
                    "filename": "pera.jpg",
                    "size": 70638,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c4bc5ea4ea98fca3297332bbd166172/e6be2176",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/dd82253847136d223a56341f9ce40df2/5df90435",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8ce5caec8f996500cbf0872319cfa09b/b23f596a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T21:55:57.000Z"
        }, {
            "id": "recSVNJ1YeSPqwCoy",
            "fields": {
                "_id": "piña copy copy",
                "varietyImageUrl": "piña_kawaii_jugo.jpg",
                "Category_Img": [{
                    "id": "attc35MNHgp67Il3B",
                    "url": "https://dl.airtable.com/.attachments/50fbef03fc82e24446bcf8695a7dbabd/5f3b4a57/categoria_pia.jpg",
                    "filename": "categoria_piña.jpg",
                    "size": 89318,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8c93dd7a104264ca1adecd818420163/aab3dfe8",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a433ef4b4dcf329f6df71464451fac3e/98828a68",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a324f7baca38ba0b5369847979bf27e4/89e253ba",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_piña.jpg",
                "categoryName": "piña",
                "varietyName": "kawaii jugo",
                "currency": "PEN",
                "price": 2.5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnJ29HdYoWVcBZi",
                    "url": "https://dl.airtable.com/.attachments/bdaeba69881f9af15568434b4264b5e5/2a739839/pia_kawaii_jugo.jpg",
                    "filename": "piña_kawaii_jugo.jpg",
                    "size": 52082,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/03b157e5f29ad9a48c199067844bdb37/71c7a9f4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9ce7d6f2ff1e77b5693be335d96176aa/daaa1844",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/656a57176db8bb4576dfca52248501c9/24a0e7b6",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:37:38.000Z"
        }, {
            "id": "recSVW3JmUMNOrO8u",
            "fields": {
                "_id": "naranja",
                "varietyImageUrl": "naranja_de_mesa_importada.jpg",
                "Category_Img": [{
                    "id": "attkw6UmTt8R5oHjv",
                    "url": "https://dl.airtable.com/.attachments/5d41341e9af4bc756af8b72cc2dafa6a/7c8ca4b4/categoria_naranja.jpg",
                    "filename": "categoria_naranja.jpg",
                    "size": 124947,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6a4bdbcac4bfcedb522f292cade68455/a40b60bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3156f4eec4e21c7832ae1da99bc09ff1/6debaa9f",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5dec30fba5613e00f014c1a23f69ac9/d31bb662",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_naranja.jpg",
                "categoryName": "naranja",
                "varietyName": "de mesa importada",
                "currency": "PEN",
                "price": 12,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnlDUeasmhrebaa",
                    "url": "https://dl.airtable.com/.attachments/9f1dad3535378dcaa8fa2223a10e1229/417baeaa/naranja_de_mesa_importada.jpg",
                    "filename": "naranja_de_mesa_importada.jpg",
                    "size": 72171,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/59d26d7b9fc561c14f0eba5ef7c98711/018b32fb",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/02dfdf33b879c25fd1f8859c7dc9ed9f/9be0e15e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/4f57e1343e66791ed3bfc8dfeb4e3147/cf9cc3f1",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:13:58.000Z"
        }, {
            "id": "recSsozPJIx5NwccY",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_isla_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "isla selecta",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_isla_selecta_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attx3QoCwVmACaffi",
                    "url": "https://dl.airtable.com/.attachments/1386de935c1aa5e66b7d99ab96e30a51/9ab1d323/platano_isla_selecta.jpg",
                    "filename": "platano_isla_selecta.jpg",
                    "size": 17866,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/425668f49c8e7da11acb1bc834b69674/463125e6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c07b23abeb135c9fb1eccabf76b0277/92261880",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/107ee1d38faecd6c45ffed27af832636/a57c30d4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attKaOQaPtJKsMyBc",
                    "url": "https://dl.airtable.com/.attachments/4b72b3e73298f6a8133f751029ecdc37/5a821aa6/platano_isla_selecta_comer_ya.jpg",
                    "filename": "platano_isla_selecta_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/aaee053a39f62f85fb6d143a3634e0b9/4c48c683",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8af643e04a9a94428ba002737fafa4f3/48cdc8e6",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/34632fda9ec6c724e43964fcee0d9240/765ed031",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:33:41.000Z"
        }, {
            "id": "recSwKQkM0ZAFiyUK",
            "fields": {
                "_id": "granadilla",
                "varietyImageUrl": "granadilla_selecta.jpeg",
                "Category_Img": [{
                    "id": "attkfrnNrkRRFUVP5",
                    "url": "https://dl.airtable.com/.attachments/f12899e2040f17c5b2126a8e6e14879d/ffc64a00/categoria_granadilla.jpeg",
                    "filename": "categoria_granadilla.jpeg",
                    "size": 9160,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/59cd842649b8f676b33692d46196d78c/fab4d06f",
                            "width": 43,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/14bbd4c97a293a10e8aa54b3b50a8812/1350dbd5",
                            "width": 337,
                            "height": 281
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76f52f478c2ccdb4219dcddf305504ae/81fc2f09",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_granadilla.jpeg",
                "categoryName": "granadilla",
                "varietyName": "selecta",
                "currency": "PEN",
                "price": 6,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attjh7cCWS5kQ17eF",
                    "url": "https://dl.airtable.com/.attachments/993c1b63b0b3a7361ab9cb7446eb75a1/699a3b2d/granadilla_selecta.jpeg",
                    "filename": "granadilla_selecta.jpeg",
                    "size": 21944,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76fd2455b0b333e10b09aeb4cb986f63/a91f0dc5",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2bcaabe2aa3bc32f3944cebc6aa6ec70/69c9330b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d68e16eca76df6e1ee79eee97774ccef/f8ba9502",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:10:54.000Z"
        }, {
            "id": "recToksWcTXn3g7Ju",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_manzano.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "manzano",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att7fmUfNoxXbXPhs",
                    "url": "https://dl.airtable.com/.attachments/6b2680843bffc72e6907ba39a4f211ee/2fee19e0/platano_manzano.jpg",
                    "filename": "platano_manzano.jpg",
                    "size": 28294,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43dbd791a074e4f6f1e58d5686e10d7b/5e1f3fb3",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/32689e7cec4a8c48cb93566707f97c7e/4ee26d80",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5c32004868f45522a0913640c649959c/cc9ab12c",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T00:54:54.000Z"
        }, {
            "id": "recTz6pIaEVZSXh8B",
            "fields": {
                "_id": "papaya",
                "varietyImageUrl": "papaya_selecta_amarilla.jpg",
                "Category_Img": [{
                    "id": "attePhLm42f4IGJfN",
                    "url": "https://dl.airtable.com/.attachments/db82074299f3307440cfd6b98b28899b/31f9754b/categoria_papaya.jpg",
                    "filename": "categoria_papaya.jpg",
                    "size": 57967,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8569189101e17f688246a1101152461e/13062ac1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/370ba3dacf6468dc19193130c0c330f5/4f7db082",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2a15b49e95a3c54b554ab52d94dc5248/3277d948",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_papaya.jpg",
                "categoryName": "papaya",
                "varietyName": "selecta amarilla",
                "currency": "PEN",
                "price": 4.5,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attYhv8xQMLiydMIZ",
                    "url": "https://dl.airtable.com/.attachments/ceccc8a27d32e0e27a72762e51c2e76c/bc1cdcc7/papaya_selecta_amarilla.jpg",
                    "filename": "papaya_selecta_amarilla.jpg",
                    "size": 34322,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d2129cb41acfc3d1f6d5d3309511b3c6/38a963ce",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d031d05df79a70687824b6efb43c6000/2dab5ec3",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/448c51513299fba9faaf3c58b6613219/c82e3058",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:28:23.000Z"
        }, {
            "id": "recURI91H7LnlPmRT",
            "fields": {
                "_id": "platano copy copy",
                "varietyImageUrl": "platano_seda.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda",
                "currency": "PEN",
                "price": 0.5,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnLGMLA8XEVvpee",
                    "url": "https://dl.airtable.com/.attachments/50bd60c5d970a31071bb3a1bb16cf5b1/62fedcde/platano_seda.jpg",
                    "filename": "platano_seda.jpg",
                    "size": 105916,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/20ef0688e27eeb4e67a39c5147a62964/fedf8cdd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f568d76ffdcad8165041f8796f03be2/2704d6a8",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/169f8f86a180e8dfd55c769a8d3c7791/c01b97a0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attQVR8eOlQMazCkv",
                    "url": "https://dl.airtable.com/.attachments/17d260ff7f390ad3eadbb88a3b309849/fe89995b/platano_seda_comer_ya.jpg",
                    "filename": "platano_seda_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/355249f56d0c99bd3174255193b1bf08/891069d5",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b4acb1d191f340a0b3b4a295d861b151/f77db071",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/21c325c98a172e332c25bbc7989139f6/9662f44e",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-24T23:38:22.000Z"
        }, {
            "id": "recUlmTSDWUnbtx7F",
            "fields": {
                "_id": "sandia",
                "varietyImageUrl": "sandia_sullana.jpg",
                "Category_Img": [{
                    "id": "attHW8ggwVgnb5AVm",
                    "url": "https://dl.airtable.com/.attachments/9df516743166c0981532ef85adaff134/9a104897/categoria_sandia.jpeg",
                    "filename": "categoria_sandia.jpeg",
                    "size": 133236,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/23d032388ed58538852a3f11104deb87/eeaf41d1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/152f5aa9086f3683f0dd347255af2faa/d137ed4b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f85bd98ed207c46735d2bdddf3b636f7/bbfa9362",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_sandia.jpeg",
                "categoryName": "sandia",
                "varietyName": "sullana",
                "currency": "PEN",
                "price": 2,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attTgUzK4FT5dIq7o",
                    "url": "https://dl.airtable.com/.attachments/0114ebbdcd5954dcbb878bb9d28cd650/e20719ce/sandia_sullana.jpg",
                    "filename": "sandia_sullana.jpg",
                    "size": 68887,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d2705b42210feb00ccaa156701f226a6/3d2b28f2",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/28670918c3d35cfb18143facfd44aae6/a4643e52",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7d2facbdfd3a7d3222763630ffcc649c/bc130a32",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:16:10.000Z"
        }, {
            "id": "recUw3NaqVs3S6a5M",
            "fields": {
                "_id": "fresas copy copy",
                "varietyImageUrl": "fresa.jpg",
                "Category_Img": [{
                    "id": "attVzjQCS5ZtnLkvv",
                    "url": "https://dl.airtable.com/.attachments/88672583ebdcbc41f115ec2183a5b155/dd017ede/categoria_fresa.jpg",
                    "filename": "categoria_fresa.jpg",
                    "size": 75774,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8f4744b7acc259254b3b10637240c9c/39db988e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d78461a55ebae0cbbaba2ff507927831/3e90f60a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b2b51d0627d8d4631bc8e159e9a603d2/f5781568",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_fresa.jpg",
                "categoryName": "fresa",
                "varietyName": "-",
                "currency": "PEN",
                "price": 12,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att4CjjR5xYNdmwJx",
                    "url": "https://dl.airtable.com/.attachments/972220519cf44a74c55e2d5bf6adaf12/fa5e7add/fresa.jpg",
                    "filename": "fresa.jpg",
                    "size": 294008,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3cdd438bc2d17b72b7473621cf15c2f1/706a9ae1",
                            "width": 64,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e58ce5057362d2f64d48ccf8a54c2651/405a12af",
                            "width": 910,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2726761b6e770e54af7344b69af1856a/a6e29bfa",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:12:10.000Z"
        }, {
            "id": "recVmp4xnWIRZf4Fr",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_roja_americana.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "roja americana",
                "currency": "PEN",
                "price": 7.5,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attiCTYoU38EHskOB",
                    "url": "https://dl.airtable.com/.attachments/c832e3c9f0b626833c567976cdb3778e/60f67f7d/manzana_roja_americana.jpg",
                    "filename": "manzana_roja_americana.jpg",
                    "size": 65806,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/790378e00f5e2bdeec8fc92c1e99f92e/9d547a70",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1f262a4765b73516f0e89050bec5d93f/d5bfba54",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d4aaa9c7cb299fd8232f51c76ea6613d/f13b5935",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:22:10.000Z"
        }, {
            "id": "recY1TShN9ICsi3OP",
            "fields": {
                "_id": "platano",
                "varietyImageUrl": "platano_seda.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda",
                "currency": "PEN",
                "price": 0.5,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnLGMLA8XEVvpee",
                    "url": "https://dl.airtable.com/.attachments/50bd60c5d970a31071bb3a1bb16cf5b1/62fedcde/platano_seda.jpg",
                    "filename": "platano_seda.jpg",
                    "size": 105916,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/20ef0688e27eeb4e67a39c5147a62964/fedf8cdd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f568d76ffdcad8165041f8796f03be2/2704d6a8",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/169f8f86a180e8dfd55c769a8d3c7791/c01b97a0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att0yQHky2jxvI9lc",
                    "url": "https://dl.airtable.com/.attachments/479fa8a856470d8c22048df1668e325c/7818cfe0/platano_seda_inmaduro.jpg",
                    "filename": "platano_seda_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/55e7c3d8c75ce45e474c13de476c9e45/d9f68dfd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1701c4da77f855591cf892d678af0ec1/2b182ff3",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/93c0a84f62964aceb7c2d6fde87f882f/562ee7e8",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-24T23:09:30.000Z"
        }, {
            "id": "recZXNufp1DmUSobl",
            "fields": {
                "_id": "fresas copy copy copy",
                "varietyImageUrl": "fresa_especial_organica.jpg",
                "Category_Img": [{
                    "id": "attVzjQCS5ZtnLkvv",
                    "url": "https://dl.airtable.com/.attachments/88672583ebdcbc41f115ec2183a5b155/dd017ede/categoria_fresa.jpg",
                    "filename": "categoria_fresa.jpg",
                    "size": 75774,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8f4744b7acc259254b3b10637240c9c/39db988e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d78461a55ebae0cbbaba2ff507927831/3e90f60a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b2b51d0627d8d4631bc8e159e9a603d2/f5781568",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_fresa.jpg",
                "categoryName": "fresa",
                "varietyName": "especial",
                "currency": "PEN",
                "price": 14,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attSVOrNSvxnKAuFm",
                    "url": "https://dl.airtable.com/.attachments/1d5b9182d287fcd3f8a562067921776c/a47c1b25/fresa_especial_organica.jpg",
                    "filename": "fresa_especial_organica.jpg",
                    "size": 100959,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d87b58b8bd243c9b46ea8ae53eaad659/d187da6a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5329195b11ed3ad51e8f17940ff56e1b/46d70445",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0fee94f1c4d884ce4ac95c118ef90e6c/edd33bea",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "isOrganic": true
            },
            "createdTime": "2020-06-26T00:12:23.000Z"
        }, {
            "id": "recaqYkY2Zni1mIFc",
            "fields": {
                "_id": "uva copy",
                "varietyImageUrl": "uva_negra.jpg",
                "Category_Img": [{
                    "id": "attJWthOGhfBYOQo2",
                    "url": "https://dl.airtable.com/.attachments/49783e3bc7549cd714bb525556f68a62/185fe85b/categoria_uva.jpg",
                    "filename": "categoria_uva.jpg",
                    "size": 51995,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43f44c9732de1b4130b62e9d5c4ddc44/851816c4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f1e497b2568344d3f017a7d66f0fd2d/f96998c9",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/48b6d99e065eec40eac4a44d543dfec0/50a1849a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_uva.jpg",
                "categoryName": "uva",
                "varietyName": "negra s/p",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attRVHpnwWWXNek0m",
                    "url": "https://dl.airtable.com/.attachments/445289f5d025072b878dc5a2c47e5e87/c38e7e87/uva_negra.jpg",
                    "filename": "uva_negra.jpg",
                    "size": 90624,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/11b8db04ea041713823478491c502248/25ed11db",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/83b81af25f0387ac21378b0e2554db18/00586966",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f72939dddd746796aba42e5230236ec6/0a11f296",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:55:04.000Z"
        }, {
            "id": "recbNwz4GZVrftnWk",
            "fields": {
                "_id": "mango copy copy copy copy copy",
                "varietyImageUrl": "tuna_verde.jpg",
                "Category_Img": [{
                    "id": "attBXgtcDwsqZ2ObR",
                    "url": "https://dl.airtable.com/.attachments/64c393b0aad63b2706cbd4141b5caa08/f1579f3e/categoria_tuna.jpg",
                    "filename": "categoria_tuna.jpg",
                    "size": 37814,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/97507fb748a99049be7c93091fd90f0a/54668b4b",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d0e20b499505a9319f20d83a79e4b9ea/2e84812a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/547713be1a436f0be0893201096a7b12/802ab2c4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_tuna.jpg",
                "categoryName": "tuna",
                "varietyName": "verde",
                "currency": "PEN",
                "price": 6,
                "isMediumSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attUlqowk7J57bX43",
                    "url": "https://dl.airtable.com/.attachments/de1c21c159e82bd135847b5636dc6846/cea063bf/tuna_verde.jpg",
                    "filename": "tuna_verde.jpg",
                    "size": 66572,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d44b727fad5b8055e505d4ba3d7f252d/7e00c311",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/cc77dce405653fdabebde3c4723b62a7/97914bdb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/bcec77ae2a43066c227e7b1c3b12f654/b871f418",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T23:01:30.000Z"
        }, {
            "id": "recbVwo1b3ObScbje",
            "fields": {
                "_id": "naranja copy",
                "varietyImageUrl": "naranja_tangelo.jpg",
                "Category_Img": [{
                    "id": "attkw6UmTt8R5oHjv",
                    "url": "https://dl.airtable.com/.attachments/5d41341e9af4bc756af8b72cc2dafa6a/7c8ca4b4/categoria_naranja.jpg",
                    "filename": "categoria_naranja.jpg",
                    "size": 124947,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6a4bdbcac4bfcedb522f292cade68455/a40b60bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3156f4eec4e21c7832ae1da99bc09ff1/6debaa9f",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5dec30fba5613e00f014c1a23f69ac9/d31bb662",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_naranja.jpg",
                "categoryName": "naranja",
                "varietyName": "tangelo",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attctWjvoacofr1Q8",
                    "url": "https://dl.airtable.com/.attachments/3566c1b558bf1e9171b82f362db80780/48279c6f/naranja_tangelo.jpg",
                    "filename": "naranja_tangelo.jpg",
                    "size": 58046,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/cda00c1000ac3098798bb71bfbad90be/a9283065",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/420041e7f0ed1c1d4a6a5d3c436d8992/0269752d",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7eaf1623ce8584de87ce40ae8a1d68bf/3b9b0924",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T21:47:54.000Z"
        }, {
            "id": "recbqf9a0Y9QeFkrA",
            "fields": {
                "_id": "naranja",
                "varietyImageUrl": "naranja_de_jugo.jpg",
                "Category_Img": [{
                    "id": "attkw6UmTt8R5oHjv",
                    "url": "https://dl.airtable.com/.attachments/5d41341e9af4bc756af8b72cc2dafa6a/7c8ca4b4/categoria_naranja.jpg",
                    "filename": "categoria_naranja.jpg",
                    "size": 124947,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6a4bdbcac4bfcedb522f292cade68455/a40b60bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3156f4eec4e21c7832ae1da99bc09ff1/6debaa9f",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5dec30fba5613e00f014c1a23f69ac9/d31bb662",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_naranja.jpg",
                "categoryName": "naranja",
                "varietyName": "de jugo",
                "currency": "PEN",
                "price": 4,
                "isMediumSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attPNwFVFU4EGQfpG",
                    "url": "https://dl.airtable.com/.attachments/2a5d1d77b036c8f1b8c9408227330fba/4c6254f1/naranja_de_jugo.jpg",
                    "filename": "naranja_de_jugo.jpg",
                    "size": 101089,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0cb3171715c2814cfccbdf7ea14ee92f/2b870d56",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ef20d5a21fd003e6d588b3a4d9aebec3/af50afdc",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5968968ce437dd1bee4dfdc7ac6aa6c4/ddde3a57",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:12:27.000Z"
        }, {
            "id": "recdEyHMVbqcpvjm3",
            "fields": {
                "_id": "platano copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att3T8HQJKbUplk2t",
                    "url": "https://dl.airtable.com/.attachments/8dab0056bc266b45dad615402f6979a6/24bd16f7/platano_seda_organico_selecta_maduro.jpg",
                    "filename": "platano_seda_organico_selecta_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6f93cd0e9b028fe667293da5d2cc2fa9/86578a2a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b85c260a78d197da32a5a6685613f951/9d8b8bff",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/caa95e8a1d749df5e049edbafdff0c42/2f166219",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:12:35.000Z"
        }, {
            "id": "recdg0ofnntjHG1Lt",
            "fields": {
                "_id": "platano copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att3k9wGEZBWgfHqX",
                    "url": "https://dl.airtable.com/.attachments/ee4937c0e4b609a2a8ea0a89bbc3afc7/22754200/platano_seda_organico_selecta_inmaduro.jpg",
                    "filename": "platano_seda_organico_selecta_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5d9a79fc556ccda6ac14cb1c1a5ae6c0/4db1733f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e15dc19817b7322038e821523959c4b6/9ed60082",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/892a302029ace83d87b8415c7aea2cfc/9eb12132",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-24T23:49:54.000Z"
        }, {
            "id": "recdkpadBC1G15n8n",
            "fields": {
                "_id": "naranja",
                "varietyImageUrl": "naranja_de_mesa_nacional.jpg",
                "Category_Img": [{
                    "id": "attkw6UmTt8R5oHjv",
                    "url": "https://dl.airtable.com/.attachments/5d41341e9af4bc756af8b72cc2dafa6a/7c8ca4b4/categoria_naranja.jpg",
                    "filename": "categoria_naranja.jpg",
                    "size": 124947,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6a4bdbcac4bfcedb522f292cade68455/a40b60bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3156f4eec4e21c7832ae1da99bc09ff1/6debaa9f",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5dec30fba5613e00f014c1a23f69ac9/d31bb662",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_naranja.jpg",
                "categoryName": "naranja",
                "varietyName": "de mesa nacional",
                "currency": "PEN",
                "price": 8,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attQyjjCQmlFXNPat",
                    "url": "https://dl.airtable.com/.attachments/f61b6eb71a1387a5f1580f56dc86380b/c5967b7b/naranja_de_mesa_nacional.jpg",
                    "filename": "naranja_de_mesa_nacional.jpg",
                    "size": 84142,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/322042c018ecc6869fad1e838b00a3f5/245b84ee",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/db0dfb64940170d239cf8f3a4dde51da/e924ba04",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6b318cc56711d51ac67da78e6c50203b/f645e60d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:14:46.000Z"
        }, {
            "id": "recdurXK84B03ri9K",
            "fields": {
                "_id": "platano copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.7,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attkLoj6xrXHveuod",
                    "url": "https://dl.airtable.com/.attachments/925a34e70f6fe2626e334b4260a21e36/886b8c4d/platano_seda_organico_granel_semi_maduro.jpg",
                    "filename": "platano_seda_organico_granel_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/22a909d449c4a3494539a48c3d71f5b1/b82084c9",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6f0d80715c945ac28dc7ead702481fd4/84943412",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/183a4f7f863d2dd2790053d4afc858b6/0acf7ffd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:21:46.000Z"
        }, {
            "id": "receHtdEOtgHbSCK2",
            "fields": {
                "_id": "manzana copy copy",
                "varietyImageUrl": "manzana_de_agua.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "de agua",
                "currency": "PEN",
                "price": 3.5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "atto4NVTWabHvwYEY",
                    "url": "https://dl.airtable.com/.attachments/19878d686a1ffe92ea57ddb6baf545cd/77fa9fe4/manzana_de_agua.jpg",
                    "filename": "manzana_de_agua.jpg",
                    "size": 25162,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2aae22d6aab7f4ee7092dff5e3c35e60/d24d3cb1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8c1a6f93c77ec8e1e6e2b629fb81946c/b24331b6",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/65b04a50b3a0eda70df53c747764102e/882a9c33",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:03:05.000Z"
        }, {
            "id": "recegv7TFLwYCexEC",
            "fields": {
                "_id": "durazno",
                "varietyImageUrl": "durazno.jpg",
                "Category_Img": [{
                    "id": "attZ7BiSlVtV89wBT",
                    "url": "https://dl.airtable.com/.attachments/0ed0be0da7510c9f171025b9d7a07353/6da15713/categoria_durazno.jpg",
                    "filename": "categoria_durazno.jpg",
                    "size": 78824,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/655ea901ca8026e7da5172aa13d55b33/b176dca6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ecdc318a0529c2857418dc0e7e75bcac/634f1fc5",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/42feba97c7b3120d1220824959fece32/86d089af",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_durazno.jpg",
                "categoryName": "durazno",
                "varietyName": "-",
                "currency": "PEN",
                "price": 10,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "atto1qIEbwsUhye3H",
                    "url": "https://dl.airtable.com/.attachments/e7dfffc3f3f6217a5248842fd4816489/15a6ee73/durazno.jpg",
                    "filename": "durazno.jpg",
                    "size": 117601,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ac595ab6b0b4e8d105cad94d6f65834b/be948ec1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/246513f558f0609047649861eec19c1c/a349090c",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/104118beef6ee671d5b71fd2ff918e22/af73d4cb",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:59:53.000Z"
        }, {
            "id": "recfXPliySBSyRUk1",
            "fields": {
                "_id": "mango copy copy copy",
                "varietyImageUrl": "membrillo_serrano.jpg",
                "Category_Img": [{
                    "id": "attXb4XLDxpdmbU89",
                    "url": "https://dl.airtable.com/.attachments/22624bdf3eb87a46ef95c84bc7cbe64b/6d7fef6b/categoria_membrillo.jpg",
                    "filename": "categoria_membrillo.jpg",
                    "size": 157968,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/606f2f2e8a51140c99e7b6b6081e53f5/42fc6cb7",
                            "width": 61,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f7709c2baefda734215c32f3dcf63410/6adadf6e",
                            "width": 861,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0229d2931c1a2c5bea46dd437ed07916/707e1711",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_membrillo.jpg",
                "categoryName": "membrillo",
                "varietyName": "serrano",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attz24CeK57ECvieL",
                    "url": "https://dl.airtable.com/.attachments/b27aa0f436cc630194bad56e87f8761b/f0604b47/membrillo_serrano.jpg",
                    "filename": "membrillo_serrano.jpg",
                    "size": 59969,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0baebf5e8269bfdc6b954efe27582567/c5e4ba84",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/758f77a48eeaf81058844d223f3226dc/206f544b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e50d10a2f8c76c1f13411b9fae8ba440/ef0c5a75",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:46:01.000Z"
        }, {
            "id": "recg9oTbGxANc5x2V",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_bizcocho.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "bizcocho",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attA5XLPxeSmeP5cv",
                    "url": "https://dl.airtable.com/.attachments/95f1ac8e2593f22bc2da55c84fc8087d/42b85719/platano_bizcocho.jpg",
                    "filename": "platano_bizcocho.jpg",
                    "size": 194089,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0bd4ee4216fa3b010f91707f4b70791c/709590bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/61743339e4be7aa1f3a1973dd2aca711/bdbf8040",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/67417fb89184646028b29c45eb9ea5a2/66ab0078",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T00:58:52.000Z"
        }, {
            "id": "recgHtmXWc6k4ZhkI",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_royal_americana.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "royal americana",
                "currency": "PEN",
                "price": 8,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attlYl2vbs2NhYgxn",
                    "url": "https://dl.airtable.com/.attachments/d47593a252728628434972699358865e/46df9c9b/manzana_royal_americana.jpg",
                    "filename": "manzana_royal_americana.jpg",
                    "size": 86078,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f1440b7374036f2cbd4790fe5c4dda38/d524b6e8",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d20810d54569cedb967057e0571e9600/607bf3cb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a4e69b75a88bef4d908be430ddf70eac/09e71e9b",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:18:13.000Z"
        }, {
            "id": "recgI81H0RamneXOr",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_palillo.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "palillo",
                "currency": "PEN",
                "price": 0.8,
                "isBigSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attaI80BjllsauNnd",
                    "url": "https://dl.airtable.com/.attachments/5e759591bbd0e9a7dd645c898f4a469e/8ff5d44b/platano_palillo.jpg",
                    "filename": "platano_palillo.jpg",
                    "size": 35572,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/19d7e0a30c7cc5f7a238ec0b79b1a5fd/aee9713c",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/abb3c49c4bbd15dbc7ffe60ad65455c7/79613e2e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7ef001af251141d29857202501285029/39e2e0ba",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T00:54:31.000Z"
        }, {
            "id": "rechXTVxq0AQ9nqfn",
            "fields": {
                "_id": "mango copy copy copy copy",
                "varietyImageUrl": "tuna_roja.jpg",
                "Category_Img": [{
                    "id": "attBXgtcDwsqZ2ObR",
                    "url": "https://dl.airtable.com/.attachments/64c393b0aad63b2706cbd4141b5caa08/f1579f3e/categoria_tuna.jpg",
                    "filename": "categoria_tuna.jpg",
                    "size": 37814,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/97507fb748a99049be7c93091fd90f0a/54668b4b",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d0e20b499505a9319f20d83a79e4b9ea/2e84812a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/547713be1a436f0be0893201096a7b12/802ab2c4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_tuna.jpg",
                "categoryName": "tuna",
                "varietyName": "roja",
                "currency": "PEN",
                "price": 6,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attH6N9CX434QRRXN",
                    "url": "https://dl.airtable.com/.attachments/c87a042ff6f52fc600733ec8bb62a117/b302fd4e/tuna_roja.jpg",
                    "filename": "tuna_roja.jpg",
                    "size": 87534,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8003aed2f5d91b69872478d0ce57203/808d0ee0",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/142ab088aa2684a96bf3c43e59b39706/d71388a0",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c0f7a2c6976589a39f51649f06938198/65bbfabd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T23:01:14.000Z"
        }, {
            "id": "rechhYHAxcyc9Lk6q",
            "fields": {
                "_id": "mango copy copy copy",
                "varietyImageUrl": "mango_criollo.jpg",
                "Category_Img": [{
                    "id": "attY4RwwFJHEiKBEJ",
                    "url": "https://dl.airtable.com/.attachments/1905afb9dd09e61a9376a5ba5f7de25b/43ffa8c3/categoria_mango.jpg",
                    "filename": "categoria_mango.jpg",
                    "size": 72184,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c4b28f2f3518343bc466329df099d5a/7c06534f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e21a1c5758ed7b7e6201a2e51244901a/e6ab5672",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/accbed648154353508bc7b398cb9e526/ab97b263",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_mango.jpg",
                "categoryName": "mango",
                "varietyName": "criollo",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att45ceFVd9uxKqkN",
                    "url": "https://dl.airtable.com/.attachments/dc57e37d0f025ed593854f4226670f87/8399ecbd/mango_criollo.jpg",
                    "filename": "mango_criollo.jpg",
                    "size": 64131,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9676ca87e860aa55cb8da2d22098133d/7f0013f1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/baff2ecd405f9f28226ddfee7c74c428/cdddaf3b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f8d6d2e86715849e65924a42922d2701/85f08136",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:28:56.000Z"
        }, {
            "id": "reciDFl54f4MeQtRq",
            "fields": {
                "_id": "platano copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attkLoj6xrXHveuod",
                    "url": "https://dl.airtable.com/.attachments/925a34e70f6fe2626e334b4260a21e36/886b8c4d/platano_seda_organico_granel_semi_maduro.jpg",
                    "filename": "platano_seda_organico_granel_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/22a909d449c4a3494539a48c3d71f5b1/b82084c9",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6f0d80715c945ac28dc7ead702481fd4/84943412",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/183a4f7f863d2dd2790053d4afc858b6/0acf7ffd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:17:07.000Z"
        }, {
            "id": "reciKHuL7ISJsq0jS",
            "fields": {
                "_id": "platano copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attrOUgGDAhqjdQwE",
                    "url": "https://dl.airtable.com/.attachments/3c60e6a833f595cefa8ea5ef852c1393/0969ea65/platano_seda_organico_granel_inmaduro.jpg",
                    "filename": "platano_seda_organico_granel_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5d387d5d166d99db222859ad4bb747c8/91f1791a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/11644f336ec9a53513b83326086079fe/2e65ed2f",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ea5f69dd4431af12a43e4703424932d1/6e2d8e35",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:16:22.000Z"
        }, {
            "id": "reck4bifgHwNQWHZp",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "atth02tngyQQwqPb4",
                    "url": "https://dl.airtable.com/.attachments/4046b8c2bda1e4f3e1b60600b7880976/8a81c9b4/platano_seda_organico_granel_comer_ya.jpg",
                    "filename": "platano_seda_organico_granel_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0cf8acb0592eca9793688e1cb7573c74/859af66c",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c931a376fb299ac50bd4252b4d533bec/9d063300",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/96f2061442d58afd467bb1e8e7206bf4/25ba5df3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:17:07.000Z"
        }, {
            "id": "reclUpq9sxMaqjCDi",
            "fields": {
                "_id": "granadilla copy",
                "varietyImageUrl": "granadilla_selecta.jpeg",
                "Category_Img": [{
                    "id": "attkfrnNrkRRFUVP5",
                    "url": "https://dl.airtable.com/.attachments/f12899e2040f17c5b2126a8e6e14879d/ffc64a00/categoria_granadilla.jpeg",
                    "filename": "categoria_granadilla.jpeg",
                    "size": 9160,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/59cd842649b8f676b33692d46196d78c/fab4d06f",
                            "width": 43,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/14bbd4c97a293a10e8aa54b3b50a8812/1350dbd5",
                            "width": 337,
                            "height": 281
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76f52f478c2ccdb4219dcddf305504ae/81fc2f09",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_granadilla.jpeg",
                "categoryName": "granadilla",
                "varietyName": "selecta",
                "currency": "PEN",
                "price": 7,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attjh7cCWS5kQ17eF",
                    "url": "https://dl.airtable.com/.attachments/993c1b63b0b3a7361ab9cb7446eb75a1/699a3b2d/granadilla_selecta.jpeg",
                    "filename": "granadilla_selecta.jpeg",
                    "size": 21944,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/76fd2455b0b333e10b09aeb4cb986f63/a91f0dc5",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2bcaabe2aa3bc32f3944cebc6aa6ec70/69c9330b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d68e16eca76df6e1ee79eee97774ccef/f8ba9502",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T02:29:31.000Z"
        }, {
            "id": "recn0fc12BIKKIgT6",
            "fields": {
                "_id": "papaya",
                "varietyImageUrl": "papaya_roja.jpg",
                "Category_Img": [{
                    "id": "attePhLm42f4IGJfN",
                    "url": "https://dl.airtable.com/.attachments/db82074299f3307440cfd6b98b28899b/31f9754b/categoria_papaya.jpg",
                    "filename": "categoria_papaya.jpg",
                    "size": 57967,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8569189101e17f688246a1101152461e/13062ac1",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/370ba3dacf6468dc19193130c0c330f5/4f7db082",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2a15b49e95a3c54b554ab52d94dc5248/3277d948",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_papaya.jpg",
                "categoryName": "papaya",
                "varietyName": "roja",
                "currency": "PEN",
                "price": 6,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att32KXt2RRXRnn4h",
                    "url": "https://dl.airtable.com/.attachments/d0ffcf3cb9bdf72c3ca61a38e09ad03d/eda45159/papaya_roja.jpg",
                    "filename": "papaya_roja.jpg",
                    "size": 68242,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8fa521bcfe0d007c7182993e4b59a731/405ac03d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0f08e84f1939c9272886035451c21fef/0c843a1b",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a90c5b8a9b89c2ada9d1ea00a606036d/addc5e69",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:30:33.000Z"
        }, {
            "id": "recp3WyctiVUqwVEo",
            "fields": {
                "_id": "chirimoya",
                "varietyImageUrl": "chirimoya_cumbe.jpg",
                "Category_Img": [{
                    "id": "att9d8KHsoOkQwSPf",
                    "url": "https://dl.airtable.com/.attachments/1d6a2b040f4309af802ea6a0336edb4b/4c9fb514/categoria_chirimoya.jpg",
                    "filename": "categoria_chirimoya.jpg",
                    "size": 37592,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f52e7dd86387f65ca9b955211a358f04/ddba3ace",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3b2baa258e51382d858e27f35201cc7d/d0835e7e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/bb8adc273d650f91d232dd768d6423c8/fefafdec",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_chirimoya.jpg",
                "categoryName": "chirimoya",
                "varietyName": "cumbe",
                "currency": "PEN",
                "price": 8,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attEdiyDNlTN8wq1n",
                    "url": "https://dl.airtable.com/.attachments/5cc92dc3314f7d253e8cb5df76dc09cc/9802dccb/chirimoya_cumbe.jpg",
                    "filename": "chirimoya_cumbe.jpg",
                    "size": 737557,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/05262e70dd5c45a12b3bd12d0aec9446/e44cb1bb",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e6bf41cdbac1c2e9a63e1261a3d6539d/7c43c00d",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7335a1985bd17f511149cba22447bc59/4a937e0d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T01:02:29.000Z"
        }, {
            "id": "recpcBXLVIA2NjZL8",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_fuji_americana.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "fuji americana",
                "currency": "PEN",
                "price": 9,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att19jhb3Y8XiE0tz",
                    "url": "https://dl.airtable.com/.attachments/ea89c2652ee28531b4625c8661010496/ef551a8d/manaza_fuji.jpg",
                    "filename": "manzana_fuji_americana.jpg",
                    "size": 113498,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f0735ecfac73bbd10af2f315feca0433/b600b18c",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ae86cee614e12bfdf52e41faa220ef20/d4a16eb2",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9e89027b2e7efed7c955410364671447/ef00e201",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:18:16.000Z"
        }, {
            "id": "recpfmHgMoDp9dJcp",
            "fields": {
                "_id": "platano",
                "varietyImageUrl": "platano_seda.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda",
                "currency": "PEN",
                "price": 0.5,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnLGMLA8XEVvpee",
                    "url": "https://dl.airtable.com/.attachments/50bd60c5d970a31071bb3a1bb16cf5b1/62fedcde/platano_seda.jpg",
                    "filename": "platano_seda.jpg",
                    "size": 105916,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/20ef0688e27eeb4e67a39c5147a62964/fedf8cdd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f568d76ffdcad8165041f8796f03be2/2704d6a8",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/169f8f86a180e8dfd55c769a8d3c7791/c01b97a0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att5Z5eR2dLCbwWUI",
                    "url": "https://dl.airtable.com/.attachments/eb474f3e69949665311ac975288a6720/789bebaf/platano_seda_semi_maduro.jpg",
                    "filename": "platano_seda_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1133ae1219b87f2e379993d10a223995/90bd184d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c7a943b220aedd68132b5728b00c08fb/ccf10b55",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ede9501fe1f6d1644edb600a9f2bd096/cc6df1fa",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-24T23:36:48.000Z"
        }, {
            "id": "recq0fGA4JlwdzRYH",
            "fields": {
                "_id": "naranja",
                "varietyImageUrl": "naranja_de_jugo.jpg",
                "Category_Img": [{
                    "id": "attkw6UmTt8R5oHjv",
                    "url": "https://dl.airtable.com/.attachments/5d41341e9af4bc756af8b72cc2dafa6a/7c8ca4b4/categoria_naranja.jpg",
                    "filename": "categoria_naranja.jpg",
                    "size": 124947,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6a4bdbcac4bfcedb522f292cade68455/a40b60bf",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3156f4eec4e21c7832ae1da99bc09ff1/6debaa9f",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5dec30fba5613e00f014c1a23f69ac9/d31bb662",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_naranja.jpg",
                "categoryName": "naranja",
                "varietyName": "de jugo",
                "currency": "PEN",
                "price": 5,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attPNwFVFU4EGQfpG",
                    "url": "https://dl.airtable.com/.attachments/2a5d1d77b036c8f1b8c9408227330fba/4c6254f1/naranja_de_jugo.jpg",
                    "filename": "naranja_de_jugo.jpg",
                    "size": 101089,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0cb3171715c2814cfccbdf7ea14ee92f/2b870d56",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/ef20d5a21fd003e6d588b3a4d9aebec3/af50afdc",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5968968ce437dd1bee4dfdc7ac6aa6c4/ddde3a57",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:07:21.000Z"
        }, {
            "id": "recqEFgNiidgsj9cE",
            "fields": {
                "_id": "mango copy copy copy",
                "varietyImageUrl": "tuna_roja.jpg",
                "Category_Img": [{
                    "id": "attBXgtcDwsqZ2ObR",
                    "url": "https://dl.airtable.com/.attachments/64c393b0aad63b2706cbd4141b5caa08/f1579f3e/categoria_tuna.jpg",
                    "filename": "categoria_tuna.jpg",
                    "size": 37814,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/97507fb748a99049be7c93091fd90f0a/54668b4b",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d0e20b499505a9319f20d83a79e4b9ea/2e84812a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/547713be1a436f0be0893201096a7b12/802ab2c4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_tuna.jpg",
                "categoryName": "tuna",
                "varietyName": "roja",
                "currency": "PEN",
                "price": 4,
                "isSmallSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attH6N9CX434QRRXN",
                    "url": "https://dl.airtable.com/.attachments/c87a042ff6f52fc600733ec8bb62a117/b302fd4e/tuna_roja.jpg",
                    "filename": "tuna_roja.jpg",
                    "size": 87534,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8003aed2f5d91b69872478d0ce57203/808d0ee0",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/142ab088aa2684a96bf3c43e59b39706/d71388a0",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c0f7a2c6976589a39f51649f06938198/65bbfabd",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:46:36.000Z"
        }, {
            "id": "recqGMV7bOHQJ5vrh",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_isla_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "isla selecta",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_isla_selecta_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attx3QoCwVmACaffi",
                    "url": "https://dl.airtable.com/.attachments/1386de935c1aa5e66b7d99ab96e30a51/9ab1d323/platano_isla_selecta.jpg",
                    "filename": "platano_isla_selecta.jpg",
                    "size": 17866,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/425668f49c8e7da11acb1bc834b69674/463125e6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c07b23abeb135c9fb1eccabf76b0277/92261880",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/107ee1d38faecd6c45ffed27af832636/a57c30d4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attnxdZN0OdpDq2IL",
                    "url": "https://dl.airtable.com/.attachments/1abef1cf6877314f860bd8c150c4ffd4/71e5aab7/platano_isla_selecta_maduro.jpg",
                    "filename": "platano_isla_selecta_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0a63d8a878ab8380f45cf2ead968bfd2/8f6fb061",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f1cd37c626fd6f99e6c41e9c01071269/e8da2da1",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9c76c00590b2224c4af65c2d9c8200f8/61957482",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:33:39.000Z"
        }, {
            "id": "recqqICZEy8zocFnr",
            "fields": {
                "_id": "uva copy copy",
                "varietyImageUrl": "uva_italia_selecta.jpg",
                "Category_Img": [{
                    "id": "attJWthOGhfBYOQo2",
                    "url": "https://dl.airtable.com/.attachments/49783e3bc7549cd714bb525556f68a62/185fe85b/categoria_uva.jpg",
                    "filename": "categoria_uva.jpg",
                    "size": 51995,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/43f44c9732de1b4130b62e9d5c4ddc44/851816c4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f1e497b2568344d3f017a7d66f0fd2d/f96998c9",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/48b6d99e065eec40eac4a44d543dfec0/50a1849a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_uva.jpg",
                "categoryName": "uva",
                "varietyName": "italiana selecta c/p",
                "currency": "PEN",
                "price": 5,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attViz6bxufFIk3dR",
                    "url": "https://dl.airtable.com/.attachments/6a530db3d27819c2e0f2707e4cba8936/1b95f310/uva_italia_selecta.jpg",
                    "filename": "uva_italia_selecta.jpg",
                    "size": 89584,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b5da5ca93a78c4ea53a708206ac5e15b/d4c5cf41",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9bd9027ca2e44b4b3ab0eb2fa3c1fe3f/a55217c6",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/26bb799ebef57ec122c65947c9e62aeb/17aacf92",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T03:03:48.000Z"
        }, {
            "id": "recrENYSMjqzph4pO",
            "fields": {
                "_id": "maracuya",
                "varietyImageUrl": "maracuya.jpeg",
                "Category_Img": [{
                    "id": "attq6AKShiRQ2siyg",
                    "url": "https://dl.airtable.com/.attachments/df97b80f180704b611cb2173f1e14acc/295e06c0/categoria_maracuya.jpg",
                    "filename": "categoria_maracuya.jpg",
                    "size": 156580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e2da1dc5063fdcef5109f275a71a4156/85a8ee70",
                            "width": 38,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8a46fe70674e3889f7b4b5ec62145d2e/c3b732f2",
                            "width": 546,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5ae895c00330f6846bc4b1afe5a8890e/d70431c4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_maracuya.jpg",
                "categoryName": "maracuya",
                "varietyName": "norteño",
                "currency": "PEN",
                "price": 3,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attoIJLcIXvTWKNJG",
                    "url": "https://dl.airtable.com/.attachments/e8d657ff24fc464b6657cad8ec44e9ac/e4d9dfb2/maracuya.jpeg",
                    "filename": "maracuya.jpeg",
                    "size": 25486,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/98a610dc558f222498cfca9a570910b8/07b4a39f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fa0dd3e797480ab52105d83e944b0632/dd5a0910",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3cc6eb0df5714b00650a413ac8426981/5cdfadeb",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:52:30.000Z"
        }, {
            "id": "recrL98sWoaYlBQqy",
            "fields": {
                "_id": "platano copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_granel.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda granel",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_granel_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attmgK2LUkQmIsUF6",
                    "url": "https://dl.airtable.com/.attachments/362941012f908561e7cf10f70a9e4623/41a9e344/platano_seda_organico_granel.jpg",
                    "filename": "platano_seda_organico_granel.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/29a3a1a65097ff02fc29383e85b23320/df17441e",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d47f3afbf0d35c94621755dd0806ab88/a5ecacfb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b23d0ebd8db1e271ed72d694e48567c6/6e736cff",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attOqIvhMgOM7435o",
                    "url": "https://dl.airtable.com/.attachments/6cc2175d5a94ccec7345965ceda1b776/b37e66af/platano_seda_organico_granel_maduro.jpg",
                    "filename": "platano_seda_organico_granel_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/24aaea628e8a4d61728d5dd7b9efe609/df3a164f",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a4a12cdf98deda425bca2a271c441828/1f730de7",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/44a9e3382bdcba1b92f5291443e5da83/65b3fda1",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:17:07.000Z"
        }, {
            "id": "recsEGzlGFXs3n8o6",
            "fields": {
                "_id": "platano copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att3T8HQJKbUplk2t",
                    "url": "https://dl.airtable.com/.attachments/8dab0056bc266b45dad615402f6979a6/24bd16f7/platano_seda_organico_selecta_maduro.jpg",
                    "filename": "platano_seda_organico_selecta_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6f93cd0e9b028fe667293da5d2cc2fa9/86578a2a",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b85c260a78d197da32a5a6685613f951/9d8b8bff",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/caa95e8a1d749df5e049edbafdff0c42/2f166219",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:10:05.000Z"
        }, {
            "id": "recsTuJkBIS6LTFLE",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_delicia.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "delicia",
                "currency": "PEN",
                "price": 5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attVdn7tvCeQlz1NR",
                    "url": "https://dl.airtable.com/.attachments/e4bb8266a65326b78c8a511240f684b4/ce45da8c/manzana_delicia.jpg",
                    "filename": "manzana_delicia.jpg",
                    "size": 78136,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/db3702abec8a726bb7512a69b962e57b/edfa323d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8b07a090870d17abc87248eb51f423cc/8ec254c5",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/12f1b5fa7a1335df29000ce85f0f6e12/b8f578ad",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:53:37.000Z"
        }, {
            "id": "rectDjiasnQnYLIG8",
            "fields": {
                "_id": "platano copy",
                "varietyImageUrl": "platano_seda.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda",
                "currency": "PEN",
                "price": 0.5,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_maduro.jpg",
                "maturityName": "Maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attnLGMLA8XEVvpee",
                    "url": "https://dl.airtable.com/.attachments/50bd60c5d970a31071bb3a1bb16cf5b1/62fedcde/platano_seda.jpg",
                    "filename": "platano_seda.jpg",
                    "size": 105916,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/20ef0688e27eeb4e67a39c5147a62964/fedf8cdd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2f568d76ffdcad8165041f8796f03be2/2704d6a8",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/169f8f86a180e8dfd55c769a8d3c7791/c01b97a0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attHqKpu6WusdXKH8",
                    "url": "https://dl.airtable.com/.attachments/4644b766a1d47bb81e481dc984f0a366/1ab661b7/platano_seda_maduro.jpg",
                    "filename": "platano_seda_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/77f5ef0b5fefe708f40f76c296d8cc07/74ae87a2",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0e3cd72b87d7a50dcf619710aac06810/8e2b2eeb",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8c109ea808e2b92b0863858470181689/ad98e55d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-24T23:37:57.000Z"
        }, {
            "id": "recuZgQLYTwS0Yw7V",
            "fields": {
                "_id": "manzana",
                "varietyImageUrl": "manzana_roja_americana.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "roja americana",
                "currency": "PEN",
                "price": 8,
                "isBigSize": true,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attiCTYoU38EHskOB",
                    "url": "https://dl.airtable.com/.attachments/c832e3c9f0b626833c567976cdb3778e/60f67f7d/manzana_roja_americana.jpg",
                    "filename": "manzana_roja_americana.jpg",
                    "size": 65806,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/790378e00f5e2bdeec8fc92c1e99f92e/9d547a70",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1f262a4765b73516f0e89050bec5d93f/d5bfba54",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d4aaa9c7cb299fd8232f51c76ea6613d/f13b5935",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:36:21.000Z"
        }, {
            "id": "recumnvaVNmUteuco",
            "fields": {
                "_id": "carambola",
                "varietyImageUrl": "carambola.jpeg",
                "Category_Img": [{
                    "id": "attQG0qqam5h7j6XJ",
                    "url": "https://dl.airtable.com/.attachments/b28196947cdd7b81d6a84f790ce19e87/cbbbfa82/categoria_carambola.jpg",
                    "filename": "categoria_carambola.jpg",
                    "size": 138673,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9fbd6a3e05f438aa1a5166e6a799295/2f339f3c",
                            "width": 63,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1b88002b684a074b377ea9a41159a917/086fd75d",
                            "width": 899,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fc2334e2c0ae8a39cedd865a43030449/5ba76d8a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_carambola.jpg",
                "categoryName": "carambola",
                "varietyName": "norteño",
                "currency": "PEN",
                "price": 4,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "att3YEdmKQ9h5bDkq",
                    "url": "https://dl.airtable.com/.attachments/a5529c57155e41cb2c5917da78cdb6d9/05384d3c/carambola.jpeg",
                    "filename": "carambola.jpeg",
                    "size": 32726,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/07bc35f347f558a9898b765ad21b02e6/8eea2ed4",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7c69504a64e07cfefac9a4c8bacd9647/bfde5886",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e04b57f1a906b8963b3e82269852391/84ebfeb7",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:48:25.000Z"
        }, {
            "id": "recwS6Zg8vhx0pD4e",
            "fields": {
                "_id": "piña",
                "varietyImageUrl": "piña_golden.jpeg",
                "Category_Img": [{
                    "id": "attc35MNHgp67Il3B",
                    "url": "https://dl.airtable.com/.attachments/50fbef03fc82e24446bcf8695a7dbabd/5f3b4a57/categoria_pia.jpg",
                    "filename": "categoria_piña.jpg",
                    "size": 89318,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b8c93dd7a104264ca1adecd818420163/aab3dfe8",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a433ef4b4dcf329f6df71464451fac3e/98828a68",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/a324f7baca38ba0b5369847979bf27e4/89e253ba",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_piña.jpg",
                "categoryName": "piña",
                "varietyName": "golden",
                "currency": "PEN",
                "price": 3,
                "isSmallSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attezs2IUIfM4tvK1",
                    "url": "https://dl.airtable.com/.attachments/62430337e4e03ff8cee547a44822c8fe/f45ac1b1/pia_golden.jpeg",
                    "filename": "piña_golden.jpeg",
                    "size": 111454,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/596c23e3032f80a2f3f7e321c7eb310d/72312cc2",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e33d921cc90f98d6a39af382d669a390/7897e93e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/630e55b96d77a3b4cca9a9332267d097/9bf70f9d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-26T00:31:33.000Z"
        }, {
            "id": "recwzWhmtGXjwwQdK",
            "fields": {
                "_id": "platano copy copy copy copy copy copy copy",
                "varietyImageUrl": "platano_palillo.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "palillo",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attaI80BjllsauNnd",
                    "url": "https://dl.airtable.com/.attachments/5e759591bbd0e9a7dd645c898f4a469e/8ff5d44b/platano_palillo.jpg",
                    "filename": "platano_palillo.jpg",
                    "size": 35572,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/19d7e0a30c7cc5f7a238ec0b79b1a5fd/aee9713c",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/abb3c49c4bbd15dbc7ffe60ad65455c7/79613e2e",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7ef001af251141d29857202501285029/39e2e0ba",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T00:52:37.000Z"
        }, {
            "id": "recx37bthjhHX9ltx",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_isla_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "isla selecta",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_isla_selecta_inmaduro.jpg",
                "maturityName": "Inmaduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attx3QoCwVmACaffi",
                    "url": "https://dl.airtable.com/.attachments/1386de935c1aa5e66b7d99ab96e30a51/9ab1d323/platano_isla_selecta.jpg",
                    "filename": "platano_isla_selecta.jpg",
                    "size": 17866,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/425668f49c8e7da11acb1bc834b69674/463125e6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c07b23abeb135c9fb1eccabf76b0277/92261880",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/107ee1d38faecd6c45ffed27af832636/a57c30d4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attLFROMycXVK1COq",
                    "url": "https://dl.airtable.com/.attachments/a59231d3792da8d6b1de6dba24888f0e/53d34382/platano_isla_selecta_inmaduro.jpg",
                    "filename": "platano_isla_selecta_inmaduro.jpg",
                    "size": 1393,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c5ebd15df318a1cdd2ff3a7eb61d9cd3/531bd009",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/4d4824baca10fe2caf528fc8bbc2f7e7/26ca5862",
                            "width": 90,
                            "height": 90
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3cfac92cdb4509738e92f2ebf31938c9/74f8276d",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:22:24.000Z"
        }, {
            "id": "recx6axjEYP4rgB3S",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_seda_organico_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "seda selecta",
                "currency": "PEN",
                "price": 0.7,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_seda_organico_selecta_comer_ya.jpg",
                "maturityName": "Comer ya",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attHvnCAJTpFStFxT",
                    "url": "https://dl.airtable.com/.attachments/d3b83425f9af989819998858a8ceb3fa/52de86dd/platano_seda_organico_selecta.jpg",
                    "filename": "platano_seda_organico_selecta.jpg",
                    "size": 106319,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d341476e2eac2072ff9c058feac166be/d59e4fb6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/edaf5c15f2b5f3b905fccee4b3d0ec11/f396cf32",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e61e669b9bde5a18b338685867e9104b/c11d2471",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attPzSuFGO5UNpjc4",
                    "url": "https://dl.airtable.com/.attachments/ef4d8673af8ed7a5bdd9203e16d4c0eb/373c0f0b/platano_seda_organico_selecta_comer_ya.jpg",
                    "filename": "platano_seda_organico_selecta_comer_ya.jpg",
                    "size": 1580,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f5db65811151fb81444fdef91ea50ca3/f9c51dcb",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/06825fe0ccf14a10f02da8b2011cefda/af4aab27",
                            "width": 96,
                            "height": 96
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/034f17020809e35bff1a63160ce9b8fd/755a51dc",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isOrganic": true
            },
            "createdTime": "2020-06-25T00:10:41.000Z"
        }, {
            "id": "recxpud8tvDFvjzXl",
            "fields": {
                "_id": "manzana copy",
                "varietyImageUrl": "manzana_israel.jpg",
                "Category_Img": [{
                    "id": "attc0EM3oZVVpcVLk",
                    "url": "https://dl.airtable.com/.attachments/951c2225795fdbe8eaec28949bd9a152/10c83bbd/categoria_manzana.jpg",
                    "filename": "categoria_manzana.jpg",
                    "size": 59069,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fea070e9f2c059f3d621982300420962/a8bd5237",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2e8c4564400e6dde40c7e5641bc532f5/7de26d43",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e9d8850e0b4ac1d162bfa5f511a7518c/979f9004",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_manzana.jpg",
                "categoryName": "manzana",
                "varietyName": "israel",
                "currency": "PEN",
                "price": 3,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attJhhjZgLDKvHR0R",
                    "url": "https://dl.airtable.com/.attachments/203760ba19bbeffb7ad3c6e427b3e2c7/d2513663/manzana_israel.jpg",
                    "filename": "manzana_israel.jpg",
                    "size": 44443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9824d837a539e0027cf029ef28e51257/3ff291eb",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7bed4fb81d00a1be86b4d46de308539a/6eaec43a",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d22698648f45497ae87128bbe2213049/52627493",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T01:55:08.000Z"
        }, {
            "id": "recxqNg4WW4VGYj44",
            "fields": {
                "_id": "platano copy copy copy copy copy copy",
                "varietyImageUrl": "platano_isla_selecta.jpg",
                "Category_Img": [{
                    "id": "atthZs3mQCeW7uUzF",
                    "url": "https://dl.airtable.com/.attachments/887c9df08707c7be7f00593a083f52b5/d3cf81b4/categoria_platano.jpg",
                    "filename": "categoria_platano.jpg",
                    "size": 29116,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b901c92b26af26b7c03cc3627d7c6680/181eefc6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/63433fb19d3cce20e6e7850ff2ac58d7/e78c1d49",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/27028fd6e376471659345aaac092c1ef/27d3e7ef",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_platano.jpg",
                "categoryName": "plátano",
                "varietyName": "isla selecta",
                "currency": "PEN",
                "price": 0.6,
                "isMediumSize": true,
                "isUnit": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityImageUrl": "platano_isla_selecta_semi_maduro.jpg",
                "maturityName": "Semi-maduro",
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attx3QoCwVmACaffi",
                    "url": "https://dl.airtable.com/.attachments/1386de935c1aa5e66b7d99ab96e30a51/9ab1d323/platano_isla_selecta.jpg",
                    "filename": "platano_isla_selecta.jpg",
                    "size": 17866,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/425668f49c8e7da11acb1bc834b69674/463125e6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2c07b23abeb135c9fb1eccabf76b0277/92261880",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/107ee1d38faecd6c45ffed27af832636/a57c30d4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attgIYo9LZ4jXoUsq",
                    "url": "https://dl.airtable.com/.attachments/b020540817805c275c2e2e01931f6d68/fadfe6ae/platano_isla_selecta_semi_maduro.jpg",
                    "filename": "platano_isla_selecta_semi_maduro.jpg",
                    "size": 1443,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b0e2078f33cbdefd52ce44d5edcd9c6a/d20909dd",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8c81aa001669e5e0d6499f99509b52c8/08c6d2e0",
                            "width": 97,
                            "height": 97
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/40d989e77e4c40dd31cd961e1af91bfa/0ef75ea0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }]
            },
            "createdTime": "2020-06-25T00:33:33.000Z"
        }, {
            "id": "reczNGuBLdyL4SXuN",
            "fields": {
                "_id": "ciruela",
                "varietyImageUrl": "ciruela_criolla.jpg",
                "Category_Img": [{
                    "id": "attXsZ2fSXhiB46kp",
                    "url": "https://dl.airtable.com/.attachments/a8acc480a1cf224631ff6d1bc2a2c766/ef9aa701/categoria_ciruela.jpg",
                    "filename": "categoria_ciruela.jpg",
                    "size": 84976,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/730530fe4a9072fcd5ae13dd9b4c95e1/71a10db6",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c21433e7cee9e4e4990c872f00891506/a2086edb",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/298a1a5acff27f887f6c7f8a2c52111d/1bda7359",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "categoryImageUrl": "categoria_ciruela.jpg",
                "categoryName": "ciruela",
                "varietyName": "criolla",
                "currency": "PEN",
                "price": 3.5,
                "isKilo": true,
                "isSeasonal": true,
                "isMaturityDetails": true,
                "maturityInfo": "Imagen referencial del nivel de madurez de la fruta seleccionada. De la misma manera, las imágenes de categorías y variedades son referenciales.",
                "Variety_Img": [{
                    "id": "attkipsCK4rvrOTE8",
                    "url": "https://dl.airtable.com/.attachments/37f689a48ed10cf22d916a456a2786dc/fabe2f33/ciruela_criolla.jpg",
                    "filename": "ciruela_criolla.jpg",
                    "size": 79261,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/848f2efc08ee41655688747129f095fb/9ff3efb7",
                            "width": 49,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/68bf38f6ccb676262014ae0c7ae557c1/66a0ab27",
                            "width": 697,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1a520b1ed420a950a4f22274a2cf8a3a/717cd348",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityEatIn": 4,
                "maturityLastFor": 6,
                "isInStock": true
            },
            "createdTime": "2020-06-25T22:03:00.000Z"
        }]
    };
    let deserializedData  = new RootObject().deserialize(data);


    deserializedData.records.forEach(ele => {
        let product = new Product();

        product.varietyImageUrl = assetPath + ele.fields.varietyImageUrl;
        product.categoryImageUrl = assetPath + ele.fields.categoryImageUrl;
        product.categoryName = ele.fields.categoryName;

        product.varietyName = ele.fields.varietyName == "-" ? "normal" : ele.fields.varietyName

        product.currency = ele.fields.currency;
        product.price = ele.fields.price;
        product.isMediumSize = (ele.fields.isMediumSize) ? product.isMediumSize = true : product.isMediumSize = false;
        product.isUnit = (ele.fields.isUnit) ? product.isUnit = true : product.isUnit = false;
        product.isSeasonal = (ele.fields.isSeasonal) ? product.isSeasonal = true : product.isSeasonal = false;
        product.isMaturityDetails = (ele.fields.isMaturityDetails) ? product.isMaturityDetails = true : product.isMaturityDetails = false;
        product.maturityImageUrl = assetPath + ele.fields.maturityImageUrl;
        product.maturityName = ele.fields.maturityName;
        product.maturityInfo = ele.fields.maturityInfo;
        product.maturityEatIn = ele.fields.maturityEatIn.toString();
        product.maturityLastFor = ele.fields.maturityLastFor.toString();
        product.isInStock = (ele.fields.isInStock) ? product.isInStock = true : product.isInStock = false;
        product.isSmallSize = (ele.fields.isSmallSize) ? product.isSmallSize = true : product.isSmallSize = false;
        product.isKilo = (ele.fields.isKilo) ? product.isKilo = true : product.isKilo = false;
        product.isOrganic = (ele.fields.isOrganic) ? product.isOrganic = true : product.isOrganic = false;
        product.isBigSize = (ele.fields.isBigSize) ? product.isBigSize = true : product.isBigSize = false;

        productsList.push(product);
        
    });

    let json = JSON.stringify({ productsList: productsList });
    console.log("mockedAmanuallyRetrievedAritableDataritableData - deserialzedData", deserializedData);
    console.log("mockedAmanuallyRetrievedAritableDataritableData - deserialzedData", json);
    
}

