import { APP_CONFIG } from "../../app.config";

export const BUYER_CONFIG = {
    request: {
        postBuyers: {
            name: 'postBuyer',
            url: `${APP_CONFIG.apiBaseUrl}/buyer`
        }
    },
    navegation: {
        accountView: "buyer_account_view",
        storeView: "buyer_store_view",
        categoryView: "buyer_category_view",
        maturityView: "buyer_maturity_view"
    }
}
