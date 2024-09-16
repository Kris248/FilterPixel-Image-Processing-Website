import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import './FormatSelector.css'; // Import the CSS file for styling

const FormatSelector: React.FC = () => {
  const { format, setFormat } = useContext(ImageContext)!;

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  return (
    <div className="format-selector">
      <label htmlFor="format">Choose Format:👇 </label>
      <select id="format" value={format} onChange={handleFormatChange} className="format-select">
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WebP</option>
        <option value="gif">GIF</option>
        <option value="tiff">TIFF</option>
      </select>
    </div>
  );
};

export default FormatSelector;
