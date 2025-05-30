import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CProgress,
  CProgressBar,
  CForm,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CCol
} from '@coreui/react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai'; // Import the dark theme
import 'ace-builds/src-noconflict/theme-dracula'; // Import the dark theme
import './SidebarMain.css';


const SidebarPythonScripts = () => {
  // Default Python script
  const defaultScript = `
# Example content of dynamic_script.py
from PIL import ImageOps

def process_tile(img):
    from PIL import ImageOps
    img = ImageOps.invert(img)
    # img = ImageOps.grayscale(img)
    return img
`;
  
  const [code, setCode] = useState(defaultScript);
  const [fontSize, setFontSize] = useState(14); // Initialize with default font size

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 3);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 3 ? prevSize - 3 : prevSize));
  };

  const handleSaveScript = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: code }), // 'code' is the state containing the script
      });
      if (response.ok) {
        console.log('Script updated successfully');
      } else {
        console.error('Failed to update script');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <CCard className="widget image-viewer-sidebar">
      <CCardHeader>
        <h4 style={{ margin: 0 }}>Python Scripts</h4>
      </CCardHeader>
      <CCardBody>
        <AceEditor
          mode="python"
          theme="monokai" // Dark theme
          value={code}
          onChange={handleCodeChange}
          name="python-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="400px"
          fontSize={fontSize} // Apply the dynamic font size
        />
        <CRow className="mb-3">
          Change font size
          <CCol>
            <CButton onClick={decreaseFontSize} color="primary">-</CButton>
            <CButton onClick={increaseFontSize} color="primary">+</CButton>
          </CCol>
        </CRow>
        <CButton onClick={handleSaveScript} color="success" className="mt-3">
          Update Tile Process Code
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default SidebarPythonScripts;