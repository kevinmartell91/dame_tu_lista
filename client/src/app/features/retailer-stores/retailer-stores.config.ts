import { APP_CONFIG } from 'src/app/app.config';
import { SortOrder } from 'src/app/app.constants';

export const RETAILER_STORES_CONFIG = {
    request: {
        getRetailer: {
            name: "getRetailer",
            url: `${APP_CONFIG.apiBaseUrl}/retailers/`
        },
        getRetailers: {
            name: "getRetailers",
            url: `${APP_CONFIG.apiBaseUrl}/retailers`
        }
    },
    defaultSortField: 'seasonal',
    defaultSortOrder: SortOrder.Asc
}