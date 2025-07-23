const colors = {
  dark100: '#0f0f0f',
  dark200: '#1a1a1a',
  dark300: '#242424',
  dark400: '#2e2e2e',
  dark500: '#3a3a3a',

  white: '#FFF',
};

export default colors;

export const getDominantColorFromImage = (imageElement: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return '#000';

  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  context.drawImage(imageElement, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return `rgb(${r}, ${g}, ${b})`;
};
