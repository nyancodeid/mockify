import domtoimage from "dom-to-image";

/**
 * @typedef {('png'|'jpeg')} ImageFormat
 * 
 * @typedef {Object} ImageExport
 * @property {Blob} blob
 * @property {String} filename
 */

const DEFAULT_OPTIONS = {
  style: { margin: "0", opacity: "1" },
};

/**
 * Convert Data URI to Blob
 * @param {String} uri 
 * @returns {Promise<Blob>}
 */
export const dataUriToBlob = async (uri) => {
  const res = await fetch(uri);
  
  return res.blob();
}

/**
 * Export DOM Element to Images
 * @param {HTMLElement} element 
 * @param {ImageFormat} format 
 * @returns {Promise<ImageExport | null>}
 */
export const exportTo = async (element, format) => {
  if (format === "png") {
    const uri = await domtoimage
      .toPng(element, DEFAULT_OPTIONS);

    const blob = await dataUriToBlob(uri);

    return {
      blob,
      filename: `mockify-${Date.now()}.png`
    };
  } else if (format === "jpeg") {
    const uri = await domtoimage
      .toJpeg(element, DEFAULT_OPTIONS);

    const blob = await dataUriToBlob(uri);

    return {
      blob,
      filename: `mockify-${Date.now()}.jpg`
    };
  } else {
    return null;
  }
}