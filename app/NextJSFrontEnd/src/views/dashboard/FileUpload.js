import React, { useState } from 'react';
import { CButton, CSpinner } from '@coreui/react';

const FileUpload = ({ onFileSelect, onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (file) => {
    console.log('File selected:', file);
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleButtonClick = () => {
    console.log('Open file button clicked');
    document.getElementById('file-upload').click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadData = await uploadResponse.json();
      setUploadStatus('File uploaded successfully. Loading slide...');

      const loadResponse = await fetch(`http://127.0.0.1:5000/load/${uploadData.filename}`);
      if (!loadResponse.ok) {
        throw new Error('Failed to load slide');
      }

      const loadData = await loadResponse.json();
      setUploadStatus('Slide loaded successfully.');
      onUploadComplete(loadData.dimensions);
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus(`An error occurred: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e.target.files[0])}
        accept=".svs,.tif,.tiff"
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging ? '2px dashed #007bff' : '2px dashed #cccccc',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
          borderRadius: '5px',
          backgroundColor: dragging ? '#e9f7ff' : '#ffffff',
        }}
      >
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Drag & drop a file here, or <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleButtonClick}>browse</span> to select a file.</p>
        )}
      </div>
      {selectedFile && (
        <CButton color="success" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? <CSpinner size="sm" /> : 'Upload'}
        </CButton>
      )}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
