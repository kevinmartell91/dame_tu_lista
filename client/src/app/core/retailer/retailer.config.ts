import { APP_CONFIG } from 'src/app/app.config';
import { SortOrder } from 'src/app/app.constants';

export const RETAILER_CONFIG = {
    request: {
        getRetailer: {
            name: "getRetailer",
            url: `${APP_CONFIG.apiBaseUrl}/retailers/`
        },
        putRetailer: {
            name: "putRetailer",
            url: `${APP_CONFIG.apiBaseUrl}/retailers/`
        },
        deleteRetailer: {
            name: "deleteRetailer",
            url: `${APP_CONFIG.apiBaseUrl}/retailers/`
        },
        postRetailers: {
            name: "postRetailers",
            url: `${APP_CONFIG.apiBaseUrl}/retailers`
        },
        getRetailers: {
            name: "getRetailers",
            url: `${APP_CONFIG.apiBaseUrl}/getRetailers`
        },
        putRetailerStore: {
            name: "putRetailerStore",
            url: `${APP_CONFIG.apiBaseUrl}/retailer-store/`
        },
        postRetailerProductList: {
            name: "postRetailerProductList",
            url: `${APP_CONFIG.apiBaseUrl}/retailer-product-list/`
        },
        putRetailerProductList: {
            name: "putRetailerProductList",
            url: `${APP_CONFIG.apiBaseUrl}/retailer-product-list/`
        },
    },
    defaultSortField: 'seasonal',
    defaultSortOrder: SortOrder.Asc
}