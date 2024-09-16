import React, { createContext, useState, ReactNode } from 'react';

interface ImageContextProps {
  image: File | null;
  setImage: (file: File) => void;
  cropDimensions: { width: number, height: number };
  setCropDimensions: (dimensions: { width: number, height: number }) => void;
  format: string;
  setFormat: (format: string) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  grayscale: boolean;
  setGrayscale: (value: boolean) => void;
  rotation: number;
  setRotation: (value: number) => void;
}

export const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<File | null>(null);
  const [cropDimensions, setCropDimensions] = useState({ width: 100, height: 100 });
  const [format, setFormat] = useState('jpeg');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [rotation, setRotation] = useState(0);

  return (
    <ImageContext.Provider value={{
      image, setImage, cropDimensions, setCropDimensions, format, setFormat,
      brightness, setBrightness, contrast, setContrast, saturation, setSaturation,
      grayscale, setGrayscale, rotation, setRotation
    }}>
      {children}
    </ImageContext.Provider>
  );
};
