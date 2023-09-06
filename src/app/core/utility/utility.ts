/** Download report using blob url */
export function downloadFileBlobURL(blobURL: string, responseType: string, fileName: string) {
  const blob: Blob = new Blob([blobURL], { type: responseType });
  if (window.navigator.msSaveOrOpenBlob) //IE & Edge
  {
    //msSaveBlob only available for IE & Edge
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    const url: string = objectURLFromBlob(blob);
    const fileCreate: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(fileCreate);
    fileCreate.setAttribute('style', 'display: none');
    fileCreate.href = url;
    fileCreate.download = fileName;
    fileCreate.click();
    window.URL.revokeObjectURL(url);
    fileCreate.remove();
  }
}

/** Create Object URL from blob */
export function objectURLFromBlob(blob: Blob): string {
  return window.URL.createObjectURL(blob);
}

/** Get group by array of object from single array */
export const groupByArray = (arr, key) => {
  const initialValue = {};
  return arr.reduce((acc, cval) => {
    const myAttribute = cval[key];
    acc[myAttribute] = [...(acc[myAttribute] || []), cval]
    return acc;
  }, initialValue);
};

export const deepCopy = (input) => {
  if (Array.isArray(input)) {
    const exportArray = [];
    input.forEach(res => {
      exportArray.push(Object.assign({}, res));
    })
    return exportArray;
  }
  else if (typeof input === "object") {
    return Object.assign({}, input);
  }
  else {
    return input;
  }
}

