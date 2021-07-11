export function getStoreNameDashFormat(storeName: string): string {
  let storeNameDashFormat = '';
  console.log('object', storeName, storeNameDashFormat);
  if (storeName == '') return storeNameDashFormat;

  let storeNameWords = storeName.trim().split(' ');
  storeNameWords.forEach((word) => {
    storeNameDashFormat += word;
    if (word != storeNameWords[storeNameWords.length - 1]) {
      storeNameDashFormat += '-';
    }
  });

  return storeNameDashFormat.toLowerCase();
}
