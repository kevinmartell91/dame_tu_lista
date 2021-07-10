import { APP_CONFIG } from '../../app.config';

export const STORE_CONFIG = {
  request: {
    postStores: {
      name: 'postStore',
      url: `${APP_CONFIG.apiBaseUrl}/store`,
    },
  },
  view_type: {
    storeView: 'storeView',
    seasonalView: 'seasonalView',
    categoryView: 'categoryView',
    varietyView: 'varietyView',
    maturityView: 'maturityView',
    cartView: 'cartView',
    rowView: 'rowView',
  },
  question_view_type: {
    storeView: 'Promociones 2 x 1',
    seasonalView: 'Frutas de temporada',
    categoryView: '-',
    varietyView: '¿Qué tipo deseas?',
    maturityView: 'Elije el que más te guste',
    cartView: 'Tu carrito de compras',
    rowView: 'Productos',
  },
  messages_view: {
    saleQuoteView: 'Editando cotización',
    orderInProcessView: 'Tu órden ya fue enviada',
    // buttonMessage_SalesQuote: 'Confirmar',
    buttonMessage_ConfimOrder: 'Confirmar',
    buttonMessage_ProcessingOrder: 'En atención',
    buttonMessage_DispatchedOrder: 'En camino',
    buttonMessage_SendOrder: 'Su orden ya fue enviada',
    buttonMessage_SendSaleQuote: 'Cotización enviada',
    buttonMessage_SaleQuote: 'Cotización',
    buttonMessage_SendViaWhatsApp: 'WhatsApp',
  },
};
