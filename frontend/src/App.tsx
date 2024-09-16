import React from 'react';
import { ImageProvider } from './context/ImageContext';
import ImageUpload from './components/ImageUpload/ImageUpload';
import ImagePreview from './components/ImagePreview/ImagePreview';
import FormatSelector from './components/FormatSelect/FormatSelector';
import DownloadButton from './components/DownloadButton/DownloadButton';
import FilterControls from './components/FilterApply/FilterControls';
import './App.css'; // Import the CSS file for styling

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="app-container">
        <h1>Welcome To Image Optimizer!👋</h1>
        <div className="box-container">
          <ImageUpload />
          <FilterControls />
          <ImagePreview />
          <FormatSelector />
          <DownloadButton />
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;


