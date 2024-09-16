
import React, { useContext, useEffect, useRef } from 'react';
import { ImageContext } from '../../context/ImageContext';

const ImagePreview: React.FC = () => {
  const { image, cropDimensions, brightness, contrast, saturation, grayscale, rotation } = useContext(ImageContext)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = cropDimensions.width;
      canvas.height = cropDimensions.height;

      ctx.filter = `
        brightness(${brightness})
        contrast(${contrast})
        saturate(${saturation})
        ${grayscale ? 'grayscale(100%)' : ''}
      `;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();
    };
  }, [image, cropDimensions, brightness, contrast, saturation, grayscale, rotation]);

  if (!image) return null;

  return <canvas ref={canvasRef} />;
};

export default ImagePreview;
