import extractNameFromUrl from './extractNameFromUrl';
import randomId from './randomId';

const loadImage = (imageSrc, options = {}) =>
  new Promise((resolve, reject) => {
    const { noCrossOrigin, name, width, height, id } = options;
    const imageElement = new Image();
    if (!noCrossOrigin) {
      imageElement.crossOrigin = 'Anonymous';
    }
    imageElement.src = imageSrc;
    imageElement.name = name ?? extractNameFromUrl(imageSrc);
    imageElement.id = id || randomId('img-');
    imageElement.onload = () => {
      imageElement.width = width || imageElement.width;
      imageElement.height = height || imageElement.height;
      resolve(imageElement);
    };
    imageElement.onerror = () => {
      reject(
        new Error(
          `Error in loading the image with the provided url: ${imageSrc}`,
        ),
      );
    };
  });

export default loadImage;
