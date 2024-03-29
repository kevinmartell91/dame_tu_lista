// import {
//   getEmptyStr,
//   formatQuantityWeightType,
//   getNumerationAsEmoji,
//   getProductSizeStr,
//   getOrganicStr,
//   getQuantityFormat,
//   getTitleCenteredFormat,
//   getNameAndPriceFormat,
// } from '../../../shared/helpers/cart-product.helpers';
import { isEmpty } from 'lodash';
import { APP_CONFIG } from 'src/app/app.config';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { Order } from 'src/app/core/order/types/order';
import { ToppingSelected } from 'src/app/shared/components/topping/types/toppingSelected';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { environment } from '../../../../environments/environment';

const maxLenChar: number = 30;
const tab: string = String.fromCodePoint(parseInt('9', 16));
const printerEmptyChar = ' ';
const breakLine: string = '\n';
const emptyLine: string = '\n\n';
// https://apps.timwhitlock.info/emoji/tables/unicode
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

export const transformOrderToRawTextBaseFortmat = (order: Order): string => {
  let orderRawTxt: string = '';
  let title: string = '';
  let subTitle: string = '';
  let totalPrice: string = '';
  const verticalPipe = '';
  const corner = '';
  const priceGuideLine = ' · · · · · · · · · · · · · · · · ·  ';

  if (order != null) {
    console.log('order KEVIN', order);
    title = getTitleCenteredFormat('Nueva Order Entrante') + breakLine;
    subTitle = '*Lista de pedido* :' + breakLine;
    totalPrice = `Total a cobrar : *S/. ${order.payment.amount.toFixed(
      2
    )}* ${breakLine}`;

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;

    orderRawTxt += title;
    orderRawTxt += breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += 'Si desea puede ver su orden ingresando al siguiente link: ';
    orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem(
      'retailer_store_name'
    )}/orders/${order._id}`;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt += breakLine;

    order.cart.forEach((product, idx) => {
      let productName: string;
      let productMaturitName: string;
      let productFeatures: string;
      let isProductToppings: boolean;
      if (containtToppings(product.categoryName)) {
        //store with toppings
        productName = product.maturityName;
        productMaturitName = '';
        productFeatures = '';
        isProductToppings = true;
      } else {
        // regular store
        productName = getNameAndPriceFormat(
          product.categoryName + ' ' + product.varietyName,
          containtToppings(product.categoryName)
            ? product.totalAmount
            : product.totalPrice
        );
        productMaturitName = '- ' + getItalicFormat(product.maturityName);
        productFeatures =
          getProductSizeStr(product) + '    ' + getOrganicStr(product);
        isProductToppings = false;
      }

      // let productName =
      //   product.categoryName === 'Comida rápida'
      //     ? getNameAndPriceFormat(product.maturityName, product.totalPrice)
      //     : getNameAndPriceFormat(
      //         product.categoryName + ' ' + product.varietyName,
      //         product.totalPrice
      //       );

      // let productMaturitName =
      //   product.categoryName !== 'Comida rápida'
      //     ? '- ' + getItalicFormat(product.maturityName)
      //     : '';

      // let productFeatures =
      //   product.categoryName !== 'Comida rápida'
      //     ? getProductSizeStr(product) + '    ' + getOrganicStr(product)
      //     : '';

      // Numeration and product name
      orderRawTxt += `${(idx + 1).toString()}) `;
      orderRawTxt += `${productName}`;
      orderRawTxt += breakLine;

      const dual = containtToppings(product.categoryName)
        ? getPriceFormat(product.totalAmount)
        : productMaturitName;
      // quantity and weight
      orderRawTxt +=
        verticalPipe +
        tab +
        tab +
        'x ' +
        getQuantityFormat(product.quantity, product.isKilo) +
        ' ' +
        formatQuantityWeightType(product.isKilo) +
        '       ' +
        dual;
      orderRawTxt += breakLine;

      if (productFeatures !== '    ') {
        orderRawTxt += verticalPipe + tab + tab + productFeatures;
        orderRawTxt += breakLine;
      }

      if (isProductToppings && product.toppings !== undefined) {
        // order.cart.map((cartProduct) => {
        product.toppings.map((topping) => {
          orderRawTxt += getToppingFormatBaseFormat(topping);
          orderRawTxt += breakLine;
        });
      }

      let prodDetailsTitle = product.details !== '' ? '*Detalles:* ' : '';

      orderRawTxt += verticalPipe + tab + tab + prodDetailsTitle;
      orderRawTxt += breakLine;

      if (prodDetailsTitle !== '') {
        let multiplineProdNameAndDetails: string[] =
          formatLongTextTo20CharactersMiltipleLines(product.details);

        multiplineProdNameAndDetails.forEach((line, i) => {
          orderRawTxt += verticalPipe + tab + tab + tab + line;
        });
        orderRawTxt += breakLine;
      }

      orderRawTxt += breakLine;
    });
    orderRawTxt += breakLine;

    orderRawTxt += '📝 *Detalles de la orden :* ' + breakLine;
    orderRawTxt += breakLine;

    orderRawTxt += totalPrice;
    orderRawTxt += breakLine;

    let paymentType;

    switch (order.payment.method) {
      case 'pos_method_area':
        paymentType = '*POS/contra entrega*';
        break;
      case 'bank_deposit':
        paymentType = '*Deposito bancario*';
        break;
      case 'fast_transfer':
        paymentType = '*Yaple/Plin*';
        break;
      default:
        paymentType = '*Efectivo/contra entrega*';
        break;
    }

    orderRawTxt += `Pago : ${paymentType}` + breakLine;

    orderRawTxt += breakLine;

    let orderType =
      order.orderType === 'delivery' ? 'Delivery' : 'Recojo en tienda';

    orderRawTxt += `Tipo de entrega : *${orderType}*` + breakLine;

    if (order.orderType == 'delivery') {
      orderRawTxt += breakLine;
      orderRawTxt += `📍 *Entrega en* :` + breakLine;
      orderRawTxt += breakLine;

      if (
        order.shipping.address.streetName &&
        order.shipping.address.streetNumber
      ) {
        orderRawTxt +=
          `*Dirección* : ${order.shipping.address.streetName} ${order.shipping.address.streetNumber}` +
          breakLine;
      }

      if (order.shipping.address.apartmentNumber) {
        orderRawTxt +=
          `*Departamento* : ${order.shipping.address.apartmentNumber}` +
          breakLine;
      }

      if (order.shipping.address.district) {
        orderRawTxt += `${order.shipping.address.district}.` + breakLine;
      }

      if (order.shipping.address.details) {
        orderRawTxt +=
          `*Detalles adicionales* : ${order.shipping.address.details}` +
          breakLine;
      }

      if (order.shipping.address.reference) {
        orderRawTxt +=
          `*Referencia* : ${order.shipping.address.reference}` + breakLine;
      }
    }

    orderRawTxt += breakLine;
    orderRawTxt += '      *Hecho con mucho ❤️ en 🇵🇪*      ' + breakLine;

    // copy to clipboard

    // let copyToBluetoothPrinter = orderRawTxt.replace(/_/g, '');
    // copyToBluetoothPrinter = copyToBluetoothPrinter.replace(/\*/g, '');
    // console.log('copyToBluetoothPrinter', copyToBluetoothPrinter);
    // copyText(copyToBluetoothPrinter);
  }
  console.log('WHATSAPP FORMAT');
  console.log(orderRawTxt);
  return orderRawTxt;
};

export const transformOrderToRawTextBaseFortmatForThermalPrinterOnlyProductList =
  (order: CartProductOrder[]): string => {
    // (order: Order): string => {
    let orderRawTxt: string = '';
    let title: string = '';
    let totalPrice: string = '';
    const marginLeft = '';
    const corner = '';
    const priceGuideLine = ' · · · · · · · · · · · · · · · · ·  ';

    if (order != null) {
      console.log('order KEVIN', order);
      /* #region  Title of the thermal printer order */
      title = `${marginLeft}        ORDEN ENTRANTE        `;
      // title = `${marginLeft}        PO. ORDEN ENTRANTE   products only      `;
      orderRawTxt += title + breakLine;
      /* #endregion */

      order.forEach((product, idx) => {
        orderRawTxt += '================================' + breakLine;
        /* #region Setting Product name base on if topponing exist */
        let productName: string;
        let productMaturitName: string;
        let productFeatures: string;
        let isProductToppings: boolean;

        if (containtToppings(product.categoryName)) {
          //store with toppings
          productName = product.maturityName;
          productMaturitName = '';
          productFeatures = '';
          isProductToppings = true;
        } else {
          // regular store
          productName = getNameAndPriceFormat(
            product.categoryName + ' ' + product.varietyName,
            containtToppings(product.categoryName)
              ? product.totalAmount
              : product.totalPrice
          );
          productMaturitName = '- ' + product.maturityName;
          productFeatures =
            getProductSizeStr(product) + '    ' + getOrganicStr(product);
          isProductToppings = false;
        }
        /* #endregion */

        /* #region Getting numeration and product name in one line */
        // orderRawTxt += `${(idx + 1).toString()}) `;
        orderRawTxt += `${marginLeft}${productName.toUpperCase()}`;
        orderRawTxt += breakLine;
        /* #endregion */

        /* #region  Setting quantity, weight and price in one line */
        const dual = containtToppings(product.categoryName)
          ? getPriceFormat(product.totalAmount)
          : productMaturitName;
        // quantity and weight and price one line
        let quantityWeightPrice = (
          '' +
          getQuantityFormat(product.quantity, product.isKilo) +
          ' ' +
          formatQuantityWeightType(product.isKilo) +
          '       ' +
          dual
        )
          .replace(/_/g, '')
          .replace(/\*/g, '');

        if (containtToppings(product.categoryName)) {
          orderRawTxt +=
            marginLeft +
            getToppingsWithPriceAtNumCharactsOneLineFormat(
              quantityWeightPrice,
              32
            );
          orderRawTxt += breakLine;
        }

        /* #endregion */

        /* #region  If It has features such as Size and organic */
        if (productFeatures !== '    ') {
          orderRawTxt +=
            marginLeft + printerEmptyChar + printerEmptyChar + productFeatures;
          orderRawTxt += breakLine;
        }
        /* #endregion */

        /* #region Showing toppings */
        // orderRawTxt += emptyLine;
        console.log('topping KEVIN BRIAN', product.toppings);
        if (isProductToppings && product.toppings !== undefined) {
          product.toppings.map((topping) => {
            if (topping.isMultipleSelection) {
              orderRawTxt += breakLine;
            }
            orderRawTxt +=
              marginLeft + getToppingFormatBaseFormatThermalPrinter(topping);
          });
        }
        /* #endregion */

        /* #region Showing order details */
        orderRawTxt += breakLine;
        let prodDetailsTitle = product.details !== '' ? '------- ' : '';
        orderRawTxt += marginLeft + printerEmptyChar + prodDetailsTitle;
        orderRawTxt += breakLine;

        if (prodDetailsTitle !== '') {
          let multiplineProdNameAndDetails: string[] =
            formatLongTextToNNCharactersMiltipleLines(
              product.details,
              30 - marginLeft.length,
              ' '
            );

          multiplineProdNameAndDetails.forEach((line, i) => {
            orderRawTxt +=
              marginLeft + printerEmptyChar + printerEmptyChar + line;
          });
        }

        /* #endregion */
        orderRawTxt += emptyLine;
      });

      // /* #region  Payment, delivery, order link and total amount details */
      // let paymentType;
      // let cashPaymenyAmount: number = 0;
      // let cashBackAmount = 0;

      // /* #region  Setting Payment type */
      // switch (order.payment.method) {
      //   case 'pos_method_area':
      //     paymentType = 'POS/contra entrega';
      //     break;
      //   case 'bank_deposit':
      //     paymentType = 'Deposito bancario';
      //     break;
      //   case 'fast_transfer':
      //     paymentType = 'Yaple/Plin';
      //     break;
      //   default:
      //     paymentType = 'Efectivo/contra entrega';
      //     cashPaymenyAmount = order.payment.cashPaymentAmount;
      //     cashBackAmount = order.payment.cashBackAmount;
      //     break;
      // }
      // /* #endregion */

      // /* #region  Showing payment t */
      // // orderRawTxt += 'Detalles de la orden : ' + breakLine;
      // orderRawTxt += '================================' + breakLine;
      // orderRawTxt += `Pago : ${paymentType}` + breakLine;
      // /* #endregion */

      /* #region  Total price */
      // totalPrice = `Total a cobrar : S/. ${order.payment.amount.toFixed(2)} `;
      // totalPrice =
      //   getToppingsWithPriceAtNumCharactsOneLineFormat(totalPrice, 32) +
      //   breakLine;
      // orderRawTxt += totalPrice;
      // /* #endregion */

      // /* #region  Showing cash Paayment amount if selected */
      // if (cashPaymenyAmount > 0) {
      //   orderRawTxt += getCashPaymetAttibutesAtNNCharactersOneLineFomat(
      //     'Pagará con :' + 'S/. ' + cashPaymenyAmount.toFixed(2),
      //     32
      //   );
      //   orderRawTxt += breakLine;
      //   orderRawTxt += getCashPaymetAttibutesAtNNCharactersOneLineFomat(
      //     'Cambio :' + 'S/. ' + cashBackAmount.toFixed(2),
      //     32
      //   );
      // }
      /* #endregion */

      // /* #region Setting Deliver or pick up order */
      // orderRawTxt += emptyLine;

      // let orderType =
      //   order.orderType === 'delivery' ? 'Delivery' : 'Recojo en tienda';

      // orderRawTxt += `Tipo entrega : ${orderType}` + breakLine;

      // if (order.orderType == 'delivery') {
      //   orderRawTxt += breakLine;
      //   orderRawTxt += `Dirección:` + breakLine;
      //   // orderRawTxt += breakLine;

      //   // const apartment = order.shipping.address.apartmentNumber
      //   //   ? ', Dpto: ' + order.shipping.address.apartmentNumber
      //   //   : '';
      //   // const district = `, ${order.shipping.address.district}`;

      //   // let address = `${order.shipping.address.streetName} ${order.shipping.address.streetNumber} ${apartment} ${district}`;

      //   // let multipliAddressLine = formatLongTextToNNCharactersMiltipleLines(
      //   //   address,
      //   //   30 - marginLeft.length
      //   // );

      //   // multipliAddressLine.forEach((line) => {
      //   //   orderRawTxt += line + breakLine;
      //   // });
      //   // orderRawTxt += breakLine;

      //   if (order.shipping.address.details) {
      //     const multipleLineDetails = formatLongTextToNNCharactersMiltipleLines(
      //       order.shipping.address.details,
      //       32
      //     );
      //     multipleLineDetails.forEach((line) => {
      //       orderRawTxt += line;
      //     });
      //   }

      //   if (order.shipping.address.reference) {
      //     const multilineReference = formatLongTextToNNCharactersMiltipleLines(
      //       order.shipping.address.reference,
      //       32
      //     );
      //     multilineReference.forEach((line) => {
      //       orderRawTxt += line + breakLine;
      //     });

      //     orderRawTxt += breakLine;
      //   }

      //   orderRawTxt += breakLine;
      //   /* #endregion */
      // }

      // // orderRawTxt += 'Si desea puede ver su orden ingresando al siguiente link: ';
      // // orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem(
      // //   'retailer_store_name'
      // // )}/orders/${order._id}`;
      // // orderRawTxt += breakLine;

      // orderRawTxt += breakLine;
      // orderRawTxt += '      Hecho con mucho ❤️ en 🇵🇪      ' + breakLine;

      // copy to clipboard

      let copyToBluetoothPrinter = orderRawTxt.replace(/_/g, '');
      copyToBluetoothPrinter = copyToBluetoothPrinter.replace(/\*/g, '');
      orderRawTxt = copyToBluetoothPrinter;
      /* #endregion */
    }
    console.log('THERMAL PRINTER FORMAT (clipboard)');
    console.log(orderRawTxt);
    copyText(orderRawTxt);

    return orderRawTxt;
  };

export const transformOrderToRawTextBaseFortmatForThermalPrinterWithPrice = (
  order: Order
): string => {
  let orderRawTxt: string = '';
  let title: string = '';
  let totalPrice: string = '';
  const marginLeft = '';
  const corner = '';
  const priceGuideLine = ' · · · · · · · · · · · · · · · · ·  ';

  if (order != null) {
    // console.log('order KEVIN', order);
    /* #region  Title of the thermal printer order */
    title = `${marginLeft}        ORDEN ENTRANTE        `;
    // title = `${marginLeft}        W.P. ORDEN ENTRANTE  with price      `;
    orderRawTxt += title + breakLine;
    /* #endregion */

    order.cart.forEach((product, idx) => {
      orderRawTxt += '================================' + breakLine;
      /* #region Setting Product name base on if topponing exist */
      let productName: string;
      let productMaturitName: string;
      let productFeatures: string;
      let isProductToppings: boolean;

      if (containtToppings(product.categoryName)) {
        //store with toppings
        productName = product.maturityName;
        productMaturitName = '';
        productFeatures = '';
        isProductToppings = true;
      } else {
        // regular store
        productName = getNameAndPriceFormat(
          product.categoryName + ' ' + product.varietyName,
          containtToppings(product.categoryName)
            ? product.totalAmount
            : product.totalPrice
        );
        productMaturitName = '- ' + product.maturityName;
        productFeatures =
          getProductSizeStr(product) + '    ' + getOrganicStr(product);
        isProductToppings = false;
      }
      /* #endregion */

      /* #region Getting numeration and product name in one line */
      // orderRawTxt += `${(idx + 1).toString()}) `;
      orderRawTxt += `${marginLeft}${productName.toUpperCase()}`;
      orderRawTxt += breakLine;
      /* #endregion */

      /* #region  Setting quantity, weight and price in one line */
      const dual = containtToppings(product.categoryName)
        ? getPriceFormat(product.totalAmount)
        : productMaturitName;
      // quantity and weight and price one line
      let quantityWeightPrice = (
        '' +
        getQuantityFormat(product.quantity, product.isKilo) +
        ' ' +
        formatQuantityWeightType(product.isKilo) +
        '       ' +
        dual
      )
        .replace(/_/g, '')
        .replace(/\*/g, '');

      orderRawTxt +=
        marginLeft +
        getToppingsWithPriceAtNumCharactsOneLineFormat(quantityWeightPrice, 32);
      /* #endregion */

      /* #region  If It has features such as Size and organic */
      if (productFeatures !== '    ') {
        orderRawTxt +=
          marginLeft + printerEmptyChar + printerEmptyChar + productFeatures;
        orderRawTxt += breakLine;
      }
      /* #endregion */

      /* #region Showing toppings */
      // orderRawTxt += emptyLine;
      console.log('topping KEVIN', product.toppings);
      if (isProductToppings && product.toppings !== undefined) {
        product.toppings.map((topping) => {
          if (topping.isMultipleSelection) {
            orderRawTxt += breakLine;
          }
          orderRawTxt +=
            marginLeft + getToppingFormatBaseFormatThermalPrinter(topping);
        });
      }
      /* #endregion */

      /* #region Showing order details */
      orderRawTxt += breakLine;
      let prodDetailsTitle = product.details !== '' ? 'Detalles: ' : '';
      orderRawTxt += marginLeft + printerEmptyChar + prodDetailsTitle;
      orderRawTxt += breakLine;

      if (prodDetailsTitle !== '') {
        let multiplineProdNameAndDetails: string[] =
          formatLongTextToNNCharactersMiltipleLines(
            product.details,
            30 - marginLeft.length,
            ' '
          );

        multiplineProdNameAndDetails.forEach((line, i) => {
          orderRawTxt +=
            marginLeft + printerEmptyChar + printerEmptyChar + line;
        });
      }

      /* #endregion */
      // orderRawTxt += emptyLine;
    });

    /* #region  Payment, delivery, order link and total amount details */
    let paymentType;
    let cashPaymenyAmount: number = 0;
    let cashBackAmount = 0;

    /* #region  Setting Payment type */
    switch (order.payment.method) {
      case 'pos_method_area':
        paymentType = 'POS/contra entrega';
        break;
      case 'bank_deposit':
        paymentType = 'Deposito bancario';
        break;
      case 'fast_transfer':
        paymentType = 'Yaple/Plin';
        break;
      default:
        paymentType = 'Efectivo/contra entrega';
        cashPaymenyAmount = order.payment.cashPaymentAmount;
        cashBackAmount = order.payment.cashBackAmount;
        break;
    }
    /* #endregion */

    /* #region  Showing payment t */
    // orderRawTxt += 'Detalles de la orden : ' + breakLine;
    orderRawTxt += '================================' + breakLine;
    orderRawTxt += `Pago : ${paymentType}` + breakLine;
    /* #endregion */

    /* #region  Total price */
    totalPrice = `Total a cobrar : S/. ${order.payment.amount.toFixed(2)} `;
    totalPrice =
      getToppingsWithPriceAtNumCharactsOneLineFormat(totalPrice, 32) +
      breakLine;
    orderRawTxt += totalPrice;
    /* #endregion */

    /* #region  Showing cash Paayment amount if selected */
    if (cashPaymenyAmount > 0) {
      orderRawTxt += getCashPaymetAttibutesAtNNCharactersOneLineFomat(
        'Pagará con :' + 'S/. ' + cashPaymenyAmount.toFixed(2),
        32
      );
      orderRawTxt += breakLine;
      orderRawTxt += getCashPaymetAttibutesAtNNCharactersOneLineFomat(
        'Cambio :' + 'S/. ' + cashBackAmount.toFixed(2),
        32
      );
    }
    /* #endregion */

    /* #region Setting Deliver or pick up order */
    orderRawTxt += emptyLine;

    let orderType =
      order.orderType === 'delivery' ? 'Delivery' : 'Recojo en tienda';

    orderRawTxt += `Tipo entrega : ${orderType}` + breakLine;

    if (order.orderType == 'delivery') {
      orderRawTxt += breakLine;
      orderRawTxt += `Dirección:` + breakLine;
      // orderRawTxt += breakLine;

      // const apartment = order.shipping.address.apartmentNumber
      //   ? ', Dpto: ' + order.shipping.address.apartmentNumber
      //   : '';
      // const district = `, ${order.shipping.address.district}`;

      // let address = `${order.shipping.address.streetName} ${order.shipping.address.streetNumber} ${apartment} ${district}`;

      // let multipliAddressLine = formatLongTextToNNCharactersMiltipleLines(
      //   address,
      //   30 - marginLeft.length
      // );

      // multipliAddressLine.forEach((line) => {
      //   orderRawTxt += line + breakLine;
      // });
      // orderRawTxt += breakLine;

      if (order.shipping.address.details) {
        const multipleLineDetails = formatLongTextToNNCharactersMiltipleLines(
          order.shipping.address.details,
          32,
          ' '
        );
        multipleLineDetails.forEach((line) => {
          orderRawTxt += line;
        });
      }

      if (order.shipping.address.reference) {
        const multilineReference = formatLongTextToNNCharactersMiltipleLines(
          order.shipping.address.reference,
          32,
          ' '
        );
        multilineReference.forEach((line) => {
          orderRawTxt += line + breakLine;
        });

        orderRawTxt += breakLine;
      }

      orderRawTxt += breakLine;
      /* #endregion */
    }

    // orderRawTxt += 'Si desea puede ver su orden ingresando al siguiente link: ';
    // orderRawTxt += `${APP_CONFIG.appBaseUrl}/${localStorage.getItem(
    //   'retailer_store_name'
    // )}/orders/${order._id}`;
    // orderRawTxt += breakLine;

    orderRawTxt += breakLine;
    orderRawTxt += '      Hecho con mucho ❤️ en 🇵🇪      ' + breakLine;

    // copy to clipboard

    let copyToBluetoothPrinter = orderRawTxt.replace(/_/g, '');
    copyToBluetoothPrinter = copyToBluetoothPrinter.replace(/\*/g, '');
    orderRawTxt = copyToBluetoothPrinter;
    /* #endregion */
  }
  console.log('THERMAL PRINTER FORMAT (clipboard)');
  console.log(orderRawTxt);
  copyText(orderRawTxt);

  return orderRawTxt;
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
        const multiplineProdNameAndDetails: string[] =
          formatLongTextTo20CharactersMiltipleLines(productDetails);

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
      case 'fast_transfer':
        paymentType = '*Yaple/Plin*';
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

// To do: transformInvoiceIntoRawTextBaseFormat (remove old format with fuits)
export const transformInvoiceIntoRawTextBaseFormat = (
  order: Order,
  currentUser: string
): string => {
  const tab: string = String.fromCodePoint(parseInt('9', 16));
  const breakLine: string = '\n';
  let orderRawTxt: string = '';
  let title: string = '';
  let subTitle: string = '';
  let totalPrice: string = '';

  console.log('order.cart', order);

  if (currentUser) {
    title = '           *Cotización*          ' + breakLine;
    subTitle = '*Lista de productos* :' + breakLine;
    totalPrice =
      `Total de la cotización : *S/. ${order.payment.amount.toFixed(2)}* 🤑` +
      breakLine;
  }

  if (order != null) {
    // parse order data in Tab separated text

    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += title;
    orderRawTxt += breakLine;

    orderRawTxt += subTitle;
    orderRawTxt += breakLine;

    order.cart.forEach((product, idx) => {
      let productName: string;
      let productMaturitName: string;
      let productFeatures: string;
      let isProductToppings: boolean;
      const verticalPipe = '';

      if (containtToppings(product.categoryName)) {
        //store with toppings
        productName = product.maturityName;
        productMaturitName = '';
        productFeatures = '';
        isProductToppings = true;
      } else {
        // regular store
        productName = getNameAndPriceFormat(
          product.categoryName + ' ' + product.varietyName,
          containtToppings(product.categoryName)
            ? product.totalAmount
            : product.totalPrice
        );
        productMaturitName = '- ' + getItalicFormat(product.maturityName);
        productFeatures =
          getProductSizeStr(product) + '    ' + getOrganicStr(product);
        isProductToppings = false;
      }

      // let productName =
      //   product.categoryName === 'Comida rápida'
      //     ? getNameAndPriceFormat(product.maturityName, product.totalPrice)
      //     : getNameAndPriceFormat(
      //         product.categoryName + ' ' + product.varietyName,
      //         product.totalPrice
      //       );

      // let productMaturitName =
      //   product.categoryName !== 'Comida rápida'
      //     ? '- ' + getItalicFormat(product.maturityName)
      //     : '';

      // let productFeatures =
      //   product.categoryName !== 'Comida rápida'
      //     ? getProductSizeStr(product) + '    ' + getOrganicStr(product)
      //     : '';

      // Numeration and product name
      orderRawTxt += `${(idx + 1).toString()}) `;
      orderRawTxt += `${productName}`;
      orderRawTxt += breakLine;

      const dual = containtToppings(product.categoryName)
        ? getPriceFormat(product.totalAmount)
        : productMaturitName;
      // quantity and weight
      orderRawTxt +=
        verticalPipe +
        tab +
        tab +
        'x ' +
        getQuantityFormat(product.quantity, product.isKilo) +
        ' ' +
        formatQuantityWeightType(product.isKilo) +
        '       ' +
        dual;
      orderRawTxt += breakLine;

      if (productFeatures !== '    ') {
        orderRawTxt += verticalPipe + tab + tab + productFeatures;
        orderRawTxt += breakLine;
      }

      if (isProductToppings && product.toppings !== undefined) {
        // order.cart.map((cartProduct) => {
        product.toppings.map((topping) => {
          orderRawTxt += getToppingFormatBaseFormat(topping);
          orderRawTxt += breakLine;
        });
      }

      let prodDetailsTitle = product.details !== '' ? '*Detalles:* ' : '';

      orderRawTxt += verticalPipe + tab + tab + prodDetailsTitle;
      orderRawTxt += breakLine;

      if (prodDetailsTitle !== '') {
        let multiplineProdNameAndDetails: string[] =
          formatLongTextTo20CharactersMiltipleLines(product.details);

        multiplineProdNameAndDetails.forEach((line, i) => {
          orderRawTxt += verticalPipe + tab + tab + tab + line;
        });
        orderRawTxt += breakLine;
      }

      orderRawTxt += breakLine;
    });
    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += breakLine;
    orderRawTxt += '📝 *Detalles cotizacion* :' + breakLine;

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

export const formatLongTextTo20CharactersMiltipleLines = (
  longText: string
): string[] => {
  const maxLenTextByLine: number = maxLenChar;
  const breakLine = '\n';
  const tab: string = String.fromCodePoint(parseInt('9', 16));

  // const splitCharacter = `

  // `;
  const splitCharacter = ` `;
  const arrWords = longText.split(splitCharacter);
  console.log('arrWords', arrWords);
  let bufferMultilineText: string[] = [];
  let tempLine = '';

  arrWords.forEach((word) => {
    let text = getItalicFormat(word);
    if (tempLine.length + text.length < maxLenTextByLine) {
      tempLine += text + ' ';
    } else {
      tempLine += breakLine;
      bufferMultilineText.push(tempLine);
      tempLine = '';
      tempLine += text + ' ';
    }
  });
  // addinfg the left over words
  bufferMultilineText.push(tempLine);

  return bufferMultilineText;
};

export const formatLongTextToNNCharactersMiltipleLines = (
  longText: string,
  chars: number,
  splitCharacter: string
): string[] => {
  const maxLenTextByLine: number = chars;
  const breakLine = '\n';
  const tab: string = String.fromCodePoint(parseInt('9', 16));

  // const splitCharacter = `

  // `;
  // const splitCharacter = ` `;
  const arrWords = longText.split(splitCharacter);
  console.log('arrWords', arrWords);
  let bufferMultilineText: string[] = [];
  let tempLine = '';

  arrWords.forEach((word) => {
    if (!isEmpty(word)) {
      let text = word.trim();
      if (tempLine.length + text.length < maxLenTextByLine) {
        tempLine += text + ' ';
      } else {
        tempLine += breakLine;
        bufferMultilineText.push(tempLine);
        tempLine = '';
        tempLine += text + ' ';
      }
    }
  });
  // addinfg the left over words
  bufferMultilineText.push(tempLine);

  return bufferMultilineText;
};

/** WhatsApp helper methods  */
const getQuantityAsFractionFormat = (decimal: number): string => {
  if (decimal && decimal === Math.round(decimal)) return decimal.toFixed(0);

  let fraStr: string = '';

  const int: number = Math.floor(decimal);
  const decStr: string = (decimal - int).toFixed(2);
  if (+int > 0) fraStr += int.toFixed(0) + ' ';

  switch (decStr) {
    case '0.25':
      fraStr += '¼';
      break;
    case '0.50':
      fraStr += '½';
      break;
    // case '0.75':
    default:
      fraStr += '¾';
      break;
  }
  return `*${getItalicFormat(fraStr)}*`;
};

const getQuantityAsUnitFormat = (number: number): string => {
  const numIntArr: string[] = Array.from(number.toFixed(0));

  let unitStr = '';
  if (numIntArr.length === 1) {
    // '1' => 01
    unitStr = `0${numIntArr[0]}`;
  } else {
    // '10' => 10
    unitStr = number.toFixed(0);
  }
  return `*${getItalicFormat(unitStr)}*`;
};

const getQuantityFormat = (decimal: number, isKilo: boolean): string => {
  if (isKilo) {
    return getQuantityAsFractionFormat(decimal);
  } else {
    return getQuantityAsUnitFormat(decimal);
  }
};

const formatQuantityWeightType = (isKilo: boolean): string => {
  if (isKilo === undefined) return;
  return isKilo
    ? `*${getItalicFormat('Kg.')}*`
    : `*${getItalicFormat('Uni.')}*`;
};

const getProductSizeStr = (product: CartProductOrder): string => {
  // let sizeStr = '🟠';
  let sizeStr = '';
  if (product.isSmallSize)
    return '• ' + (sizeStr += getItalicFormat('Pequeño'));
  if (product.isMediumSize)
    return '• ' + (sizeStr += getItalicFormat('Mediano'));
  if (product.isBigSize) return '• ' + (sizeStr += getItalicFormat('Grande'));
  return '';
};

const getOrganicStr = (product: CartProductOrder): string => {
  // let organicStr = '🟢';
  let organicStr = '';
  if (product.isOrganic)
    return (organicStr += '• ' + getItalicFormat('Org.') + ' 🌱');
  return '';
};

const getNumerationAsEmoji = (num: number): string => {
  let numEmoji: string = '';
  Array.from(num.toString()).forEach((char) => {
    const charAsNum = +char;
    console.log('charAsNum', charAsNum);
    switch (charAsNum) {
      case 1:
        numEmoji += '1️⃣';
        break;
      case 2:
        numEmoji += '2️⃣';
        break;
      case 3:
        numEmoji += '3️⃣';
        break;
      case 4:
        numEmoji += '4️⃣';
        break;
      case 5:
        numEmoji += '5️⃣';
        break;
      case 6:
        numEmoji += '6️⃣';
        break;
      case 7:
        numEmoji += '7️⃣';
        break;
      case 8:
        numEmoji += '8️⃣';
        break;
      case 9:
        numEmoji += '9️⃣';
        break;
      default:
        numEmoji += '0️⃣';
    }
  });

  return numEmoji;
};

const getEmptyStr = (num: number): string => {
  let emptyStr = '';
  for (let i = 0; i < num; i++) {
    emptyStr += ' .';
  }
  return emptyStr;
};

/** Format up to maxLenChar chars */
const getTitleCenteredFormat = (title: string): string => {
  if (title.length === 0) return;

  title = `*${title}*`;
  const leftChars: number = maxLenChar - title.length;
  let sideMargin: number = 0;
  let result: string = '';

  if (leftChars > 0) {
    sideMargin =
      leftChars % 2 ? +(leftChars / 2).toFixed(0) - 1 : leftChars / 2;
  }

  /** filling both sides of the title with empty spaces */
  for (let side = 0; side < 2; side++) {
    if (side === 1) result += title;
    for (let i = 0; i < sideMargin; i++) {
      result += '  ';
    }
  }

  return result;
};

const getNameAndPriceFormat = (name: string, price: number): string => {
  const priceStr: string = ` S/. ${price.toFixed(2)}`;
  let result: string = '';

  if (priceStr.length + name.length >= maxLenChar) {
    return `*${name} ${priceStr}*`;
  } else {
    const emptyChars = maxLenChar - priceStr.length - name.length;
    result += `${name} ${getEmptyStr(emptyChars)}  ${priceStr}`;
  }

  return `*${result}*`;
};
const getPriceFormat = (price: number): string => {
  const priceStr: string = `S/. ${price.toFixed(2)}`;
  return `*${priceStr}*`;
};

const getItalicFormat = (text: string): string => {
  return `_${text}_`;
};

const getToppingFormatBaseFormat = (topping: ToppingSelected): string => {
  const indentationL1 = tab + tab;
  const indentationL2 = tab + tab + tab;
  let res = '';
  res = `${indentationL1}• ${getItalicFormat(
    topping.name.trim()
  )} :${breakLine}`;
  const hasPriceSign = topping.selected.includes('S/.');
  if (topping.isMultipleSelection) {
    topping.selected.split(',').map((toppinWithPrice) => {
      res += `${indentationL2}- ${getItalicFormat(
        toppinWithPrice.trim()
      )}${breakLine}`;
    });
  } else {
    // is only on topping selected
    res += `${indentationL2}- ${getItalicFormat(
      topping.selected.trim()
    )}${breakLine}`;
  }
  return res;
};
// const getToppingFormatBaseFormatThermalPrinter_OLD = (
//   topping: ToppingSelected
// ): string => {
//   const indentationL1 = printerEmptyChar; //!@$#%$#
//   const indentationL2 = printerEmptyChar;
//   let res = '';
//   if (topping.isMultipleSelection) {
//     // multple toppings selected
//     res = `${indentationL1}${topping.name.trim()} :${breakLine}`;
//     topping.selected.split(',').map((toppinWithPrice) => {
//       const hasPriceSign = toppinWithPrice.includes('S/.');
//       if (hasPriceSign) {
//         res += `${indentationL2}- ${getToppingsWithPriceAtNumCharactsOneLineFormat(
//           toppinWithPrice.trim(),
//           29
//         )}${breakLine}`;
//       } else {
//         res += `${indentationL2}- ${toppinWithPrice.trim()}${breakLine}`;
//       }
//     });
//   } else {
//     // only one topping selected
//     res += `${indentationL2}- ${topping.selected.trim()}${breakLine}`;
//   }
//   return res;
// };
const getToppingFormatBaseFormatThermalPrinter = (
  topping: ToppingSelected
): string => {
  const indentationL1 = printerEmptyChar; //!@$#%$#
  const indentationL2 = printerEmptyChar;
  const marginLeft = '';
  let arrtMultipleLines: string[] = [];
  let temp = '';
  const sign = '-';
  let res = '';

  //"May,K,Moz,Golf,Cei,Tar"

  // multiple toppings selected
  if (topping.isMultipleSelection) {
    // res = `${indentationL1}${topping.name.trim()} :${breakLine}`;
    topping.name_abbreviation.split(',').map((abbreviation) => {
      // short =>  - KET
      // long =>   - Chorizo Breat (otto kunz)

      if (!isEmpty(abbreviation.trim())) {
        console.log('not isEmpty- abbreviation:', abbreviation);
        temp += `${indentationL2}${sign}${sign} ${abbreviation.trim()}`;
      }
      // if (abbreviation.length > 10) res += `${breakLine}`;
    });
  } else {
    // only one topping selected
    temp += `${indentationL2}${sign}${sign} ${topping.name_abbreviation}`;
  }
  // res += `${breakLine}`;

  console.log('TEMP:', temp);
  //" -- May -- K -- Moz -- Golf"
  arrtMultipleLines = formatLongTextToNNCharactersMiltipleLines(
    temp,
    30 - marginLeft.length,
    `${indentationL2}${sign}`
  );
  arrtMultipleLines.forEach((line, i) => {
    console.log('temp - kecin - line:', line);
    res += line;
  });
  arrtMultipleLines = [];
  temp = '';
  return res;
};

const getToppingsWithPriceAtNumCharactsOneLineFormat = (
  text: string,
  chars: number
): string => {
  const priceSign = 'S/. ';
  const maxLen = chars - priceSign.length;
  // this character can not be printer by
  // the thermal printer
  // Called as empty string since it helps
  // to the indentation
  const emptyString = printerEmptyChar;
  let res = '';

  let wordsArr = text.trim().split(priceSign);
  const toppingName = wordsArr[0].trim();
  const toppingPrice = wordsArr[1].trim();

  const totalLen = toppingName.length + toppingPrice.length;

  if (totalLen >= maxLen) {
    // To do => shorting lenght
    res = text;
  } else {
    const emptyCharLen = maxLen - totalLen;
    res = toppingName;
    for (let i = 0; i < emptyCharLen; i++) {
      res += emptyString;
    }
    res += `${priceSign}${toppingPrice}`;
  }

  return res;
};

const getCashPaymetAttibutesAtNNCharactersOneLineFomat = (
  text: string,
  chars: number
): string => {
  const emptyString = printerEmptyChar;
  const semicolon = ' :';
  const wordsArr = text.split(semicolon);
  const title = wordsArr[0].trim();
  const price = wordsArr[1].trim();
  const emptyStrLen = chars - (title.length + price.length + semicolon.length);

  let res = title + semicolon;

  for (let i = 0; i < emptyStrLen; i++) {
    res += emptyString;
  }
  res += price;

  return res;
};
