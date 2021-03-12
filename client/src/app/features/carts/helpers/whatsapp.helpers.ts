import {
  getEmptyStr,
  formatQuantityWeightType,
  getNumerationAsEmoji,
  getProductSizeStr,
  getOrganicStr,
  getQuantityFormat,
} from '../../../shared/helpers/cart-product.helpers';
import { environment } from '../../../../environments/environment';
import { Order } from 'src/app/core/order/types/order';
import { APP_CONFIG } from 'src/app/app.config';

// 💰💳💸💵⚖️📥📤🛒📝✅💲✔️🟡🟢🔵🟣⚫⚪🟤🏁🏁🇵🇪🛵
// 🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🌿🌱🌴🐓👍🤠🤝🙏👏
// 📦✏️📝📌🛒

export const sendViaWhatsApp = (
  textMessageOrder: string,
  phoneNumber: string
): void => {
  console.log('WHATASPP:', phoneNumber);
  let link = `//api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI(
    textMessageOrder
  )}`;
  if (environment.production) window.location.href = link;
};

export const transformOrderToRawText = (order: Order): string => {
  const tab: string = String.fromCodePoint(parseInt('9', 16));
  const breakLine: string = '\n';
  let orderRawTxt: string = '';
  let title: string = '';
  let subTitle: string = '';
  let totalPrice: string = '';
  const verticalPipe = ' ║ ';
  const corner = ' ╚> ';
  const priceGuideLine = ' · · · · · · · · · · · · · · · · ·  ';

  title = '🏁           *Nueva orden entrante*          🏁' + breakLine;
  subTitle = '📥 *Pedido* :' + breakLine;
  totalPrice =
    `Total a cobrar : *S/. ${order.payment.amount.toFixed(2)}* 🤑` + breakLine;

  if (order != null) {
    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += '🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️' + breakLine;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt +=
      '⚖️Cant.' +
      tab +
      tab +
      tab +
      '📌Productos ' +
      tab +
      tab +
      tab +
      ' 💰Precio' +
      breakLine;
    orderRawTxt += '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + breakLine;

    order.cart.forEach((product, idx) => {
      let productName =
        product.categoryName === 'Comida rápida'
          ? product.maturityName
          : product.categoryName + ' ' + product.varietyName;

      let productDetails =
        product.details !== '' ? '🙌 ' + product.details : '';

      let productMaturitName =
        product.maturityName !== '' ? '- ' + product.maturityName : '';

      // Numeration and product name
      orderRawTxt += getNumerationAsEmoji(idx + 1) + ' ';
      orderRawTxt += productName;
      orderRawTxt += breakLine;

      // quantity and weight
      orderRawTxt +=
        verticalPipe +
        tab +
        tab +
        getQuantityFormat(product.quantity, product.isKilo) +
        ' ' +
        formatQuantityWeightType(product.isKilo) +
        ' ' +
        productMaturitName;
      orderRawTxt += breakLine;

      orderRawTxt +=
        verticalPipe +
        tab +
        tab +
        getProductSizeStr(product) +
        ' ' +
        getOrganicStr(product);
      orderRawTxt += breakLine;

      if (productDetails !== '') {
        const multiplineProdNameAndDetails: string[] = formatProductNameTo20CharactersMiltipleLines(
          productDetails
        );

        multiplineProdNameAndDetails.forEach((line) => {
          orderRawTxt += verticalPipe + tab + tab + line;
        });
        orderRawTxt += breakLine;
      }

      orderRawTxt +=
        corner + priceGuideLine + 'S/. ' + (+product.totalPrice).toFixed(2);
      orderRawTxt += breakLine;
      orderRawTxt += breakLine;
    });

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;

    orderRawTxt += '📝 *Detalles* :' + breakLine;
    orderRawTxt += '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + breakLine;

    orderRawTxt += breakLine;

    orderRawTxt += totalPrice;

    orderRawTxt += breakLine;

    let paymentType;

    switch (order.payment.method) {
      case 'pos_method_area':
        paymentType = '*POS/contra entrega* 🤝💳';
        break;
      case 'bank_deposit':
        paymentType = '*Deposito bancario* 🏦';
        break;

      default:
        paymentType = '*Efectivo/contra entrega* 🤝💵';
        break;
    }

    orderRawTxt += `Pago : ${paymentType}` + breakLine;

    orderRawTxt += breakLine;

    let orderType =
      order.orderType === 'delivery' ? 'Delivery 🛵.' : 'Recojo en tienda 🏪.';

    orderRawTxt += `Tipo de entrega : *${orderType}*` + breakLine;

    if (order.orderType == 'delivery') {
      orderRawTxt += breakLine;
      orderRawTxt += `📍 *Entrega en* :` + breakLine;
      orderRawTxt += '~~~~~~~~~~~~~~~~~~~' + breakLine;

      orderRawTxt +=
        `*Dirección* : ${order.shipping.address.streetName} ${order.shipping.address.streetNumber}` +
        breakLine;

      if (order.shipping.address.apartmentNumber) {
        orderRawTxt +=
          `*Departamento* : ${order.shipping.address.apartmentNumber}` +
          breakLine;
      }

      orderRawTxt += `${order.shipping.address.district}.` + breakLine;

      if (order.shipping.address.reference) {
        orderRawTxt +=
          `*Referencia* : ${order.shipping.address.reference}` + breakLine;
      }

      if (order.shipping.address.details) {
        orderRawTxt +=
          `*Detalles adicionales* : ${order.shipping.address.details}` +
          breakLine;
      }
    }

    orderRawTxt += breakLine;
    orderRawTxt += 'Si desea puede ver su orden ingresando al siguiente link: ';
    orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem(
      'retailer_store_name'
    )}/orders/${order._id}`;
    orderRawTxt += breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += '       *Hecho con mucho ❤️ en 🇵🇪*       ' + breakLine;
    orderRawTxt += '🥑🌿🍇🍓🍈🍒🍑🥭🥑🌿🌱🌴' + breakLine;

    // copy to clipboard
    copyText(orderRawTxt);
  }

  return orderRawTxt;
};

export const transformInvoiceIntoRawText = (
  order: Order,
  currentUser: string
): string => {
  const tab: string = String.fromCodePoint(parseInt('9', 16));
  const breakLine: string = '\n';
  let orderRawTxt: string = '';
  let title: string = '';
  let subTitle: string = '';
  let totalPrice: string = '';

  if (currentUser) {
    title = '🏁           *Cotización*          🏁' + breakLine;
    subTitle = '🛒 *Lista de productos* :' + breakLine;
    totalPrice =
      `Total de la cotización : *S/. ${order.payment.amount.toFixed(2)}* 🤑` +
      breakLine;
  }

  if (order != null) {
    // parse order data in Tab separated text
    console.log('order.cart', order);

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += '🍏🍎🍐🍊🥝🍅🍆🥑🥦🥬🥒🌶️' + breakLine;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt +=
      '⚖️Cant.' +
      tab +
      tab +
      tab +
      '📌Productos ' +
      tab +
      tab +
      tab +
      ' 💰Precio' +
      breakLine;
    orderRawTxt += '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + breakLine;

    order.cart.forEach((product) => {
      orderRawTxt +=
        breakLine +
        ' ' +
        product.quantity.toFixed(2) +
        tab +
        formatQuantityWeightType(product.isKilo) +
        tab +
        // product.categoryName + " " + product.varietyName;
        formatProductNameTo20Characters(
          product.categoryName + ' ' + product.varietyName
        ) +
        tab +
        tab +
        'S/.' +
        product.totalPrice.toFixed(2);
    });

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    // [7:29 PM, 9/25/2020] Kevin Martell: 💰💳💸💵⚖️📥📤🛒📝✅💲✔️🟡🟢🔵🟣⚫⚪🟤🏁🏁🇵🇪🛵🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🌽🥕🧄🧅🌿🌱🌴🐓👍🤠🤝🙏👏
    // [7:30 PM, 9/25/2020] Kevin Martell: 📦✏️📝📌🛒
    orderRawTxt += '📝 *Detalles cotizacion* :' + breakLine;
    orderRawTxt += '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + breakLine;

    orderRawTxt += breakLine;

    orderRawTxt += totalPrice;

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;

    orderRawTxt +=
      'Si desea puede editar la cotización ingresando al siguiente link: ';
    orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem(
      'retailer_store_name'
    )}/cotizacion/${order._id}`;
    orderRawTxt += breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += '       *Hecho con mucho ❤️ en 🇵🇪*       ' + breakLine;
    orderRawTxt += '🥑🌿🍇🍓🍈🍒🍑🥭🥑🌿🌱🌴' + breakLine;

    copyText(orderRawTxt);
    console.log(orderRawTxt);
    // copy text in the clipboard
  }

  return orderRawTxt;
};

/* To copy any Text */
export const copyText = (val: string): void => {
  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

export const formatProductNameTo20Characters = (term: string): string => {
  const maxLenght: number = 18;
  const threePointsLenght: number = 3;

  if (term == null || term == '') return;

  if (term.length < maxLenght) {
    //print null string
    const num = maxLenght - term.length;
    return term + getEmptyStr(num);
  }

  return term.slice(0, maxLenght - threePointsLenght) + ' . . .';
};

export const formatProductNameTo20CharactersMiltipleLines = (
  productName: string
): string[] => {
  const maxLenTextByLine: number = 27;
  const breakLine = '\n';

  const arrWords = productName.split(' ');
  let bufferMultilineText: string[] = [];
  let tempLine = '';

  arrWords.forEach((word) => {
    if (tempLine.length + word.length < maxLenTextByLine) {
      tempLine += word + ' ';
    } else {
      tempLine += breakLine;
      bufferMultilineText.push(tempLine);
      tempLine = '';
      tempLine += word + ' ';
    }
  });
  // addinfg the left over words
  bufferMultilineText.push(tempLine);

  return bufferMultilineText;
};
