import { APP_CONFIG } from "../../app.config";

export const LOGIN_CONFIG = {
    request: {
        postAuthentication : {
            name: 'postAuthentication',
            url: `${APP_CONFIG.apiBaseUrl}/authenticate`
        }
    },
    loginType: {
        buyer: "buyer",
        retailer: "retailer"
    },
    loginUserStorage: "currentUser",
    loginUserBuyerType: "buyer",
    loginUserCompradorType: "comprador",
    loginUserRetailerType: "retailer"
}