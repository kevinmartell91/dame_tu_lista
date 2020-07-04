import { APP_CONFIG } from 'src/app/app.config';

export const ORDER_CONFIG = {
    request: {
        getOrder: {
            name: "getOrder",
            url: `${APP_CONFIG.apiBaseUrl}/orders/`
        },
        putOrder: {
            name: "putOrder",
            url: `${APP_CONFIG.apiBaseUrl}/orders/`
        },
        deleteOrder: {
            name: "deleteOrder",
            url: `${APP_CONFIG.apiBaseUrl}/orders/`
        },
        postOrders: {
            name: "postOrders",
            url: `${APP_CONFIG.apiBaseUrl}/orders`
        },
        getOrders: {
            name: "getOrders",
            url: `${APP_CONFIG.apiBaseUrl}/orders`
        }  
    }
}