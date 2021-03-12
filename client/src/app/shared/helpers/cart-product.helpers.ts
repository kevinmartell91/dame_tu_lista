import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';

const getQuantityAsFractionFormat = (decimal: number): string => {
  if (decimal && decimal === Math.round(decimal)) return decimal.toFixed(2);

  let fraStr: string = '';
  const intStr: string = decimal.toFixed(0);
  const decStr: string = (decimal - +intStr).toFixed(2);

  if (+intStr > 0) fraStr += intStr + ' ';

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
  }

  return fraStr;
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
  return unitStr;
};

export const getQuantityFormat = (
  decimal: number,
  isKilo: boolean
): string => {
  if (isKilo) {
    return getQuantityAsFractionFormat(decimal);
  } else {
    return getQuantityAsUnitFormat(decimal);
  }
};

export const formatQuantityWeightType = (isKilo: boolean): string => {
  if (isKilo === undefined) return;
  return isKilo ? 'Kg.' : 'Uni.';
};

export const getProductSizeStr = (product: CartProductOrder): string => {
  let sizeStr = '🟠';
  if (product.isSmallSize) return (sizeStr += 'Peq.');
  if (product.isMediumSize) return (sizeStr += 'Med.');
  if (product.isBigSize) return (sizeStr += 'Gra.');
  return '';
};

export const getOrganicStr = (product: CartProductOrder): string => {
  let organicStr = '🟢';
  if (product.isOrganic) return (organicStr += 'Org.');
  return '';
};

export const getNumerationAsEmoji = (num: number): string => {
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

export const getEmptyStr = (num: number): string => {
  let emptyStr = '';
  for (let i = 0; i < num; i++) {
    emptyStr += ' .';
  }
  return emptyStr;
};
