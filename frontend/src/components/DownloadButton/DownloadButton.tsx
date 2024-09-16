import React, { useContext } from 'react';
import axios from 'axios';
import { ImageContext } from '../../context/ImageContext';
import './DownloadButton.css'; // Import the CSS file for styling

const DownloadButton: React.FC = () => {
  const { image, cropDimensions, format, brightness, contrast, saturation, grayscale, rotation } = useContext(ImageContext)!;

  const handleDownload = async () => {
    const formData = new FormData();
    formData.append('image', image as Blob);
    formData.append('width', cropDimensions.width.toString());
    formData.append('height', cropDimensions.height.toString());
    formData.append('format', format);
    formData.append('brightness', brightness.toString());
    formData.append('contrast', contrast.toString());
    formData.append('saturation', saturation.toString());
    formData.append('grayscale', grayscale.toString());
    formData.append('rotation', rotation.toString());

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `edited_image.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return <button className="download-button" onClick={handleDownload}>⭐Download Edited Image⭐</button>;
};

export default DownloadButton;
