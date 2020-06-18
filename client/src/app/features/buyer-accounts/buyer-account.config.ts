import { APP_CONFIG } from 'src/app/app.config';

export const BUYER_ACCOUNT_CONFIG = {
    request: {
        getBuyer: {
            name: "getBuyer",
            url: `${APP_CONFIG.apiBaseUrl}/buyer`
        },
        getBuyers: {
            name: "getBuyers",
            url: `${APP_CONFIG.apiBaseUrl}/buyers/`
        },
        patchFavoriteRetailer: {
            name: "patchFavoriteRetailer",
            url: `${APP_CONFIG.apiBaseUrl}/buyers-favorite-retailers/`
        }
        
    },
    
}