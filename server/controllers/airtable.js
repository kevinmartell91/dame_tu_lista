class Fields{
    _id: string;
    varietyImageUrl: string;
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
    maturityEatIn: number;
    maturityLastFor: number;
    isInStock: boolean;
    isSmallSize?: boolean;
    isKilo?: boolean;
    isOrganic?: boolean;
    isBigSize?: boolean;
    isProduction?: boolean;
}

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyNqSR6NoYacM8nC'
});
var base = Airtable.base('app90UT0ZXO2CSQwS');

const data = base("keyla_test_cases_kevin_modifications_completing_empty_fileds");

const all = data.select({view: "Grid view"});

all.firstPage((error, records) => {
    const _ids = records.map( record => 
        record.get("_id")
    )

    console.log(_ids);

});