import { APP_CONFIG } from "../../app.config";

export const STORE_CONFIG = {
    request: {
        postStores: {
            name: 'postStore',
            url: `${APP_CONFIG.apiBaseUrl}/store`
        }
    },
    view_type: {
        storeView: "storeView",
        seasonalView: "seasonalView",
        categoryView: "categoryView",
        varietyView: "varietyView",
        maturityView: "maturityView"
    },
    question_view_type: {
        storeView: "Promociones 2 x 1",
        seasonalView: "Frutas de temporada",
        categoryView: "-",
        varietyView: "¿Qué tipo deseas?",
        maturityView: "¿Cuándo lo quieres comer?"
    }
}

