import { APP_CONFIG } from 'src/app/app.config';
import { SortOrder } from 'src/app/app.constants';

export const RETAILER_STORES_CONFIG = {
  request: {
    getRetailer: {
      name: 'getRetailer',
      url: `${APP_CONFIG.apiBaseUrl}/retailers/`,
    },
    getRetailerByStoreName: {
      name: 'getRetailer',
      url: `${APP_CONFIG.apiBaseUrl}/`,
    },
    getRetailers: {
      name: 'getRetailers',
      url: `${APP_CONFIG.apiBaseUrl}/retailers`,
    },
    getAirTableDataByUrlAndApiKey: {
      name: 'getAirTableDataByUrlAndApiKey',
      url: `${APP_CONFIG.apiBaseUrl}/dtl-airtable-mongo`,
    },
  },
  defaultSortField: 'seasonal',
  defaultSortOrder: SortOrder.Asc,
};
