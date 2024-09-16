import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import './FilterControls.css'; // Import the CSS file for styling

const FilterControls: React.FC = () => {
  const {
    brightness, setBrightness,
    contrast, setContrast,
    saturation, setSaturation,
    grayscale, setGrayscale,
    rotation, setRotation,
    cropDimensions, setCropDimensions
  } = useContext(ImageContext)!;

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCropDimensions({ ...cropDimensions, width: Number(e.target.value) });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCropDimensions({ ...cropDimensions, height: Number(e.target.value) });
  };

  return (
    <div className="filter-controls">
      <div className="control-group">
        <label>Brightness:</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="slider brightness-slider"
        />
        <span className="slider-value">{Math.round(brightness * 50)}%</span>
      </div>

      <div className="control-group">
        <label>Contrast:</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          className="slider contrast-slider"
        />
        <span className="slider-value">{Math.round(contrast * 50)}%</span>
      </div>

      <div className="control-group">
        <label>Saturation:</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          className="slider saturation-slider"
        />
        <span className="slider-value">{Math.round(saturation * 50)}%</span>
      </div>

      <div className="control-group">
        <label>Grayscale:</label>
        <input
          type="checkbox"
          checked={grayscale}
          onChange={(e) => setGrayscale(e.target.checked)}
          className="checkbox"
        />
      </div>

      <div className="control-group">
        <label>Rotation:</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="slider rotation-slider"
        />
        <span className="slider-value">{rotation}°</span>
      </div>

      <div className="control-group">
        <label>Width:</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={cropDimensions.width}
          onChange={handleWidthChange}
          className="slider width-slider"
        />
        <span className="slider-value">{cropDimensions.width}px</span>
      </div>

      <div className="control-group">
        <label>Height:</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={cropDimensions.height}
          onChange={handleHeightChange}
          className="slider height-slider"
        />
        <span className="slider-value">{cropDimensions.height}px</span>
      </div>
    </div>
  );
};

export default FilterControls;
