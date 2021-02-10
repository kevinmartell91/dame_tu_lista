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

export class Fields implements Deserializable {
    _id: string;

    type: string;
    isVisible: boolean;

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
        return this;
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

export function manuallyRetrievedAritableData(payload: string): any {

    let productsList: Product[] = [];

    let data = {
        "records": [{
            "id": "rec1b06Wyl67p3Zc2",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 10.5,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attgHmcPAZU0YwZIv",
                    "url": "https://dl.airtable.com/.attachments/7b6b4b1f35d9f891083d398504cf92bb/4cfa12b5/wawito_royal.png",
                    "filename": "wawito_royal.png",
                    "size": 696595,
                    "type": "image/png",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0c6b3610e09d0a6e40b5ea99d7c394cc/239a27c8",
                            "width": 46,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/0a9403641dd1180bb2ba7f5c277ba14f/3c17b31a",
                            "width": 649,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b4c0504e2ddd9bdd59a7a71973032533/52b61122",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "wawito royal",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "hamburguesas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T22:04:43.000Z"
        }, {
            "id": "recCm5WERyHlt1ohx",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 12,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "att71lMl25ufpMPp7",
                    "url": "https://dl.airtable.com/.attachments/6777392cd92c502cf4fc88e01f433f76/b05df8de/wawito_lechon_de_lena.png",
                    "filename": "wawito_lechon_de_lena.png",
                    "size": 1458229,
                    "type": "image/png",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/e81f65681038e4ef55403eebc00b25b0/5c1aeeba",
                            "width": 43,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/f179575ebe2d9b9a65c69b7c0f1875d8/e046aaca",
                            "width": 605,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/70ca46b6adada8871abd4264b1f72c07/c8fa9923",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "lecho de leña",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "lechón",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T21:54:53.000Z"
        }, {
            "id": "recDic36I0XIY1ITj",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 10,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "atts1v37srQSNW0Ft",
                    "url": "https://dl.airtable.com/.attachments/ed130c957141d00d01e4b6a4718e6584/1fe77784/wawito_tropical.jpg",
                    "filename": "wawito_tropical.jpg",
                    "size": 33887,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/1480e96bcd9b1e15dfadb6a6f45602dd/73430ac8",
                            "width": 54,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/af1bb20719e8400f31d4921c32945e81/3116f344",
                            "width": 768,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/54d057b070b5059adb904122cd7a059d/d385edc4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "wawito tropical",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "hamburguesas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T21:23:13.000Z"
        }, {
            "id": "recPVsGPU6bWDWU8c",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 10.5,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attQSUVbawDH0uzPV",
                    "url": "https://dl.airtable.com/.attachments/901c45b08070eb7b38f7e556d95f170f/fd880503/wawito_super_royal.jpg",
                    "filename": "wawito_super_royal.jpg",
                    "size": 37908,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/fd5c6d6e57d93c26f899538eb7b4fb44/d0d3784b",
                            "width": 54,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/066ecc300b4167fcc4c650e1e75a274c/f8ad9c97",
                            "width": 768,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/d53c9165a0049c2b9db2b22e47426670/f6dd0e1c",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "wawito super royal",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "hamburguesas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T21:23:13.000Z"
        }, {
            "id": "recS4e1kRupyuj3V1",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 7,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attewUF0Tetnh6qen",
                    "url": "https://dl.airtable.com/.attachments/de389f4567dafb591323f2e1f1c7937b/0c98abe9/wawito_clasica.jpg",
                    "filename": "wawito_clasica.jpg",
                    "size": 39120,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/9400832dbfda0550b5adb69e13166a86/17d2e292",
                            "width": 54,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/bb7bf03f576ea86b02a161638c998275/3c77dfa5",
                            "width": 768,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/2658708ad9fa71cde876759c4519104c/fd9a2de3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "wawito clasica",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "hamburguesas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T21:23:13.000Z"
        }, {
            "id": "recWVV8lfF2RliOji",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 8,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attdHVZF1SdnqnJVu",
                    "url": "https://dl.airtable.com/.attachments/720f46455816f66fb914b0e48701a931/fbb4a80d/wawito_super_wawito.jpg",
                    "filename": "wawito_super_wawito.jpg",
                    "size": 61242,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7d7e46c61abfc91e1b66d2a8f95535ca/ea1c933c",
                            "width": 41,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/7ba16f5058cbc5ad5781845ac9dd2b84/5bc19cf5",
                            "width": 587,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/4f790e6418a9e0d9d0434d68bab9442a/892fa6df",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "super wawito",
                "Variety_Img": [{
                    "id": "attEcLUU3dYarBDrN",
                    "url": "https://dl.airtable.com/.attachments/9ed7b8ed0cd88eab7685dc348693d71d/4bbefec6/icon_hamburguer.jpeg",
                    "filename": "icon_hamburguer.jpeg",
                    "size": 8964,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/73cfd6a186a754b27daeac1687405ba4/ca784b63",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/45b7d06317cf71b339079a95ae23fe6f/486174fe",
                            "width": 225,
                            "height": 225
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/84379289f8ceb15fc4c443374abd065c/14ee8af4",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "hamburguesas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T22:04:45.000Z"
        }, {
            "id": "recWqf5oDex4m7MOM",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 10,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attfYVvff2mZDHVFT",
                    "url": "https://dl.airtable.com/.attachments/5b30c98c74b327b7a214fa66447ab8ba/ebeaa47f/wawito_salchipapa.png",
                    "filename": "wawito_salchipapa.png",
                    "size": 592571,
                    "type": "image/png",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/c1877da31f3604fde1dad7d509de6f14/fec2d86a",
                            "width": 42,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/b9aad4d4857b3351c1d3bc000503b3f9/3bbbf1ec",
                            "width": 599,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5767dbb249dc0d41ea267e908e6a940e/89ed5ddc",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "salchipapa",
                "Variety_Img": [{
                    "id": "attFzSXk0l1d5xIb8",
                    "url": "https://dl.airtable.com/.attachments/0fb672c20a12418772ec1ec1f5e8190a/7c520e5e/icon_salchipapas_2.jpg",
                    "filename": "icon_salchipapas_2.jpg",
                    "size": 148025,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/716e4615c7f92e0d04ce1fe1b9326b74/cda2d998",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/445047824cd7110f0ee47fd486352049/fb67da66",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/085111936984afaf60a9973819e2d25e/9908dc56",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "salchipapas",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T21:54:20.000Z"
        }, {
            "id": "recgTN1ihdZK4jhDb",
            "fields": {
                "categoryName": "comida rápida",
                "isProduction": true,
                "Category_Img": [{
                    "id": "attMIxzEc1M90X6DV",
                    "url": "https://dl.airtable.com/.attachments/055f1d2289900641622dda07b1ff3b54/303ff8b1/icon_fastfood.jpg",
                    "filename": "icon_fastfood.jpg",
                    "size": 169356,
                    "type": "image/jpeg",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/6ebbd9e6db3a1f5263cb9df26d7d0dca/5a2bd41d",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/5af37179599a6fb9e86b478f708a87a3/1661d5fa",
                            "width": 512,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/116f3aefc636ab793b045624c33fe8c6/58f75db3",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "price": 10,
                "isSeasonal": true,
                "isVisible": true,
                "isMediumSize": true,
                "isInStock": true,
                "Maturity_Img": [{
                    "id": "attdyobue52rLqMqU",
                    "url": "https://dl.airtable.com/.attachments/a239fb48200802beea092b4117da8d1c/a87e62af/club_sandwich.png",
                    "filename": "club_sandwich.png",
                    "size": 661096,
                    "type": "image/png",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3f4f98ccf8d36ef788142aa9c70047af/14495854",
                            "width": 38,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/3c35a1cafa33bd8f6410edbe8e131bb3/f511eaa5",
                            "width": 540,
                            "height": 512
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8eebb1bca45b147736b8ffa39d425c81/7d6a8ce0",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "isMaturityDetails": true,
                "maturityName": "club sandwich",
                "Variety_Img": [{
                    "id": "attP2CXe2HC8HxeeO",
                    "url": "https://dl.airtable.com/.attachments/75aed368251b1373119edbd3b65bf44d/8f481d45/icon_sandwich.png",
                    "filename": "icon_sandwich.png",
                    "size": 17206,
                    "type": "image/png",
                    "thumbnails": {
                        "small": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/99295b728a23c566a59ccb862e8c787e/a8ebe9c5",
                            "width": 36,
                            "height": 36
                        },
                        "large": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/980302780cdfdf61c2dcd7c0b6eac1eb/1cde0e70",
                            "width": 128,
                            "height": 128
                        },
                        "full": {
                            "url": "https://dl.airtable.com/.attachmentThumbnails/8eeabb08bb387f2d188b254c5f6deba4/7579196a",
                            "width": 3000,
                            "height": 3000
                        }
                    }
                }],
                "maturityInfo": "Imágenes referenciales. Estas pueden diferir del producto que usted pueda adquirir por medio de su vendedor. ",
                "isUnit": true,
                "_id": "comida",
                "varietyName": "sandwichs",
                "currency": "PEN",
                "type": "food"
            },
            "createdTime": "2021-02-09T22:04:44.000Z"
        }]
    }

    let deserializedData = new RootObject().deserialize(data);

    deserializedData.records.forEach(ele => {
        let AT = ele.fields;

        if (AT.isProduction) {

            let product = new Product();

            product.varietyImageUrl = AT.Variety_Img[0].thumbnails.large.url;
            product.categoryImageUrl = AT.Category_Img[0].thumbnails.large.url;
            product.maturityImageUrl = AT.Maturity_Img[0].thumbnails.large.url;

            product.type = AT.type;
            product.isVisible = AT.isVisible;

            product.categoryName = CapitalizedFirstChar(AT.categoryName);

            product.varietyName = AT.varietyName == "-" ? "Normal" : CapitalizedFirstChar(AT.varietyName);

            product.currency = AT.currency;
            product.price = AT.price;
            product.isMediumSize = (AT.isMediumSize) ? product.isMediumSize = true : product.isMediumSize = false;
            product.isUnit = (AT.isUnit) ? product.isUnit = true : product.isUnit = false;
            product.isSeasonal = (AT.isSeasonal) ? product.isSeasonal = true : product.isSeasonal = false;
            product.isMaturityDetails = (AT.isMaturityDetails) ? product.isMaturityDetails = true : product.isMaturityDetails = false;
            product.maturityName = CapitalizedFirstChar(AT.maturityName);
            product.maturityInfo = AT.maturityInfo;
            product.maturityEatIn = (AT.maturityEatIn !== undefined) ? AT.maturityEatIn.toString() : "0";
            product.maturityLastFor = (AT.maturityLastFor !== undefined) ? AT.maturityLastFor.toString() : "0";
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
    console.log("mockedAmanuallyRetrievedAritableDataritableData - deserialzedData", json);



}

export function CapitalizedFirstChar(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
