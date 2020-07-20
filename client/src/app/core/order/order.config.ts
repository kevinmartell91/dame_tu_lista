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
        },  
        getOrdersByRetailerId: {
            name: "getOrdersByRetailerId",
            url: `${APP_CONFIG.apiBaseUrl}/orders-by-retailer-id/`
        },  
        getOrdersByBuyerId: {
            name: "getOrdersByBuyerId",
            url: `${APP_CONFIG.apiBaseUrl}/buyer-order-history/`
        }  
    },
    orderStatus: {
        generated_by_buyer: "generated_by_buyer",
        seen_by_retailer: "seen_by_retailer",
        packaged_by_retailer: "packaged_by_retailer",
        received_by_driver: "received_by_driver",
        ontrack_by_driver: "ontrack_by_driver",
        delivered_by_driver: "delivered_by_driver",
        order_finished: "order_finished",

    }

}