import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CProgress,
  CProgressBar,
  CFormSelect,
  CFormInput,
  CRow,
  CCol
} from '@coreui/react';
import './SidebarMain.css';

const SidebarPreprocess = () => {
  const [progress, setProgress] = useState(0);
  const [model, setModel] = useState('stardist');
  const [magnification, setMagnification] = useState('auto');
  const [manualMagnification, setManualMagnification] = useState('');
  const [numberOfNuclei, setNumberOfNuclei] = useState(null); // State to hold the number of nuclei

  const checkProgress = async () => {
    const progressResponse = await fetch('http://localhost:5000/get-progress');
    const progressData = await progressResponse.json();
    setProgress(progressData.progress);

    if (progressData.progress < 100) {
      setTimeout(checkProgress, 1000); // Check again in 1 second
    } else {
      const resultResponse = await fetch('http://localhost:5000/get-result');
      const resultData = await resultResponse.json();
      setNumberOfNuclei(resultData.number_of_nuclei);
    }
  };

  const handleRunButtonClick = async () => {
    const params = {
      model: model,
      magnification: magnification === 'manual' ? manualMagnification : magnification,
    };

    const response = await fetch('http://localhost:5000/run-preprocess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params: params }),
    });

    if (response.ok) {
      // Start polling for progress
      checkProgress();
    } else {
      console.error('Failed to run preprocess');
    }
  };

  return (
    <CCard className="widget image-viewer-sidebar">
      <CCardHeader>
        <h4 style={{ margin: 0 }}>Preprocess</h4>
      </CCardHeader>
      <CCardBody>
        <p>
          To better enable some AI functions, such as real-time nuclei classification, we need to preprocess the image data.
        </p>
        <h5 style={{ marginBottom: '15px' }}>Nuclei Segmentation and Basic Statistics</h5>

        <div style={{ marginBottom: '10px' }}>
          <strong>Model:</strong>
          <CFormSelect
            value={model}
            onChange={(e) => setModel(e.target.value)}
            aria-label="Select Model"
            style={{ marginBottom: '10px' }}
          >
            <option value="stardist">Stardist</option>
            <option value="cellvit">CellVit</option>
            <option value="fast-color-threshold">Fast Color Threshold</option>
          </CFormSelect>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Magnification:</strong>
          <CFormSelect
            value={magnification}
            onChange={(e) => setMagnification(e.target.value)}
            aria-label="Select Magnification"
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </CFormSelect>
        </div>

        {magnification === 'manual' && (
          <div style={{ marginBottom: '20px' }}>
            <CFormInput
              type="number"
              placeholder="Enter Magnification Value"
              value={manualMagnification}
              onChange={(e) => setManualMagnification(e.target.value)}
            />
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <CButton color="primary" onClick={handleRunButtonClick}>
            Run
          </CButton>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <CProgress>
            <CProgressBar value={progress} color="info">
              {progress}% Complete
            </CProgressBar>
          </CProgress>
        </div>

        {progress > 0 && (
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Processing nuclei segmentation and calculating basic statistics. Please wait...
          </div>
        )}

        {numberOfNuclei !== null && (
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#28a745' }}>
            Number of Nuclei Detected: {numberOfNuclei}
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default SidebarPreprocess;
