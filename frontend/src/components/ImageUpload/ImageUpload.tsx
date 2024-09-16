import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';
import './ImageUpload.css'; // Import the CSS file for styling

const ImageUpload: React.FC = () => {
  const { setImage } = useContext(ImageContext)!;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="file-input"
      />
      <label htmlFor="file-input" className="upload-button">
        Choose Image:🤳
      </label>
    </div>
  );
};

export default ImageUpload;
