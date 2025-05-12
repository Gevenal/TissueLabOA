import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilList, cilSchool, cilSettings } from '@coreui/icons'
import './Dashboard.css'
import FileUpload from './FileUpload'  // Ensure this path is correct

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [slideDimensions, setSlideDimensions] = useState(null);

  const handleFileSelect = (file) => {
    console.log('File selected in Dashboard:', file);
    setSelectedFile(file);
    // Add additional logic here if needed
  };

  const handleUploadComplete = (dimensions) => {
    console.log('Upload complete, dimensions:', dimensions);
    setSlideDimensions(dimensions);
    // Add any additional logic you want to perform after upload is complete
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <CCard className="widget">
          <CCardHeader>
            <CIcon icon={cilCloudUpload} className="me-2" />
            Start
          </CCardHeader>
          <CCardBody>
            <FileUpload onFileSelect={handleFileSelect} onUploadComplete={handleUploadComplete} />
            {selectedFile && <p>Selected file in Dashboard: {selectedFile.name}</p>}
            {slideDimensions && <p>Slide dimensions: {JSON.stringify(slideDimensions)}</p>}
          </CCardBody>
        </CCard>
        <CCard className="widget">
          <CCardHeader>
            <CIcon icon={cilList} className="me-2" />
            Example online files
          </CCardHeader>
          <CCardBody>
            <p>xxx xxx Table</p>
          </CCardBody>
        </CCard>

        <CCard className="widget history">
          <CCardHeader>
            <CIcon icon={cilSchool} className="me-2" />
            File history
          </CCardHeader>
          <CCardBody>
            <p>Some files...</p>
          </CCardBody>
        </CCard>

      </div>
    </div>
  )
}

export default Dashboard