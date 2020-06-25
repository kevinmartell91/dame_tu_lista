import { APP_CONFIG } from "../../app.config";

export const BUYER_CONFIG = {
    request: {
        getBuyer: {
            name: 'getBuyer',
            url: `${APP_CONFIG.apiBaseUrl}/buyers/`
        },
        putBuyer: {
            name: 'putBuyer',
            url: `${APP_CONFIG.apiBaseUrl}/buyers/`
        },
        deleteBuyer: {
            name: 'deleteBuyer',
            url: `${APP_CONFIG.apiBaseUrl}/buyers/`
        },
        postBuyers: {
            name: 'postBuyers',
            url: `${APP_CONFIG.apiBaseUrl}/buyers`
        },
        getBuyers: {
            name: 'getBuyers',
            url: `${APP_CONFIG.apiBaseUrl}/buyers`
        },
        patchBuyersFavoriteRetailer: {
            name: 'updateBuyerFavoriteRetailers',
            url: `${APP_CONFIG.apiBaseUrl}/updateBuyerFavoriteRetailers/`
        },
        updateBuyerAddress: {
            name: 'updateBuyerAddress',
            url: `${APP_CONFIG.apiBaseUrl}/buyers-address/`
        }
    },
    navegation: {
        accountView: "buyer_account_view",
        storeView: "buyer_store_view",
        categoryView: "buyer_category_view",
        varietyView: "buyer_variety_view",
        maturityView: "buyer_maturity_view",
        cartView: "buyer_cart_view"
    }
}
