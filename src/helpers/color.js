function getAverageRGB(imgEl) {
  console.log(imgEl.src);
  var blockSize = 200, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    log("context is falsy(undefined/null)", "error");
    return defaultRGB;
  }

  height = canvas.height = imgEl.height || imgEl.naturalHeight || imgEl.offsetHeight;
  width = canvas.width = imgEl.width || imgEl.naturalWidth || imgEl.offsetWidth;

  context.drawImage(imgEl, 0, 0);
  console.log(width, height);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    log(e, "error");
    return defaultRGB;
  }

  length = data.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
    // console.log("bruh don't");
  }
  console.log(count);

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
}

// const getPixels = require("get-pixels");
// const quantize = require("quantize");

// function createPixelArray(imgData, pixelCount, quality) {
//   const pixels = imgData;
//   const pixelArray = [];

//   for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
//     offset = i * 4;
//     r = pixels[offset + 0];
//     g = pixels[offset + 1];
//     b = pixels[offset + 2];
//     a = pixels[offset + 3];

//     // If pixel is mostly opaque and not white
//     if (typeof a === "undefined" || a >= 125) {
//       if (!(r > 250 && g > 250 && b > 250)) {
//         pixelArray.push([r, g, b]);
//       }
//     }
//   }
//   return pixelArray;
// }

// function validateOptions(options) {
//   let { colorCount, quality } = options;

//   if (typeof colorCount === "undefined" || !Number.isInteger(colorCount)) {
//     colorCount = 10;
//   } else if (colorCount === 1) {
//     throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
//   } else {
//     colorCount = Math.max(colorCount, 2);
//     colorCount = Math.min(colorCount, 20);
//   }

//   if (typeof quality === "undefined" || !Number.isInteger(quality) || quality < 1) {
//     quality = 10;
//   }

//   return {
//     colorCount,
//     quality,
//   };
// }

// function loadImg(img) {
//   return new Promise((resolve, reject) => {
//     getPixels(img, function (err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// function getColor(img, quality) {
//   return new Promise((resolve, reject) => {
//     getPalette(img, 5, quality)
//       .then((palette) => {
//         resolve(palette[0]);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// function getPalette(img, colorCount = 10, quality = 10) {
//   const options = validateOptions({
//     colorCount,
//     quality,
//   });

//   return new Promise((resolve, reject) => {
//     loadImg(img)
//       .then((imgData) => {
//         const pixelCount = imgData.shape[0] * imgData.shape[1];
//         const pixelArray = createPixelArray(imgData.data, pixelCount, options.quality);

//         const cmap = quantize(pixelArray, options.colorCount);
//         const palette = cmap ? cmap.palette() : null;

//         resolve(palette);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// module.exports = {
//   getColor,
//   getPalette,
// };
