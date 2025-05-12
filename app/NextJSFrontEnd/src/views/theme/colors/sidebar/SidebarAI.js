import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CForm, CFormSelect, CFormLabel, CFormCheck, CButton, CFormTextarea, CInputGroup, CInputGroupText, CFormInput, CRow, CCol, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilMinus } from '@coreui/icons';
import './SidebarMain.css';

const MLSidebar = () => {
    const [classes, setClasses] = useState([
        { name: 'Pyramidal neuron', count: 28, color: '#FF0000' },
        { name: 'Granule neuron', count: 33, color: '#00FF00' },
        { name: 'Astrocyte', count: 36, color: '#0000FF' },
        { name: 'Oligodendrocyte', count: 27, color: '#00FFFF' },
        { name: 'Microglia', count: 50, color: '#FF00FF' }
    ]);

    const addClass = () => {
        const newClass = { name: 'New Class', count: 0, color: '#000000' };
        setClasses([...classes, newClass]);
    };

    const deleteClass = (index) => {
        setClasses(classes.filter((_, i) => i !== index));
    };

    const handleClassNameChange = (index, newName) => {
        const updatedClasses = classes.map((cls, i) => (i === index ? { ...cls, name: newName } : cls));
        setClasses(updatedClasses);
    };

    const handleClassColorChange = (index, newColor) => {
        const updatedClasses = classes.map((cls, i) => (i === index ? { ...cls, color: newColor } : cls));
        setClasses(updatedClasses);
    };

    const handleClassCountChange = (index, newCount) => {
        const updatedClasses = classes.map((cls, i) => (i === index ? { ...cls, count: newCount } : cls));
        setClasses(updatedClasses);
    };

    return (
        <CCard className="widget image-viewer-sidebar">
            <CCardHeader>
                Current Study
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CFormLabel>Select study:</CFormLabel>
                    <CFormSelect>
                        <option value="brain-wsi">Brain WSI</option>
                        {/* Add other options as needed */}
                    </CFormSelect>

                    <CFormLabel className="mt-3">Nuclei classes:</CFormLabel>
                    {classes.map((cls, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <CFormCheck className="me-2" />
                            <CFormSelect
                                value={cls.name}
                                onChange={(e) => handleClassNameChange(index, e.target.value)}
                                className="flex-grow-1 me-2"
                            >
                                <option>Pyramidal neuron</option>
                                <option>Granule neuron</option>
                                <option>Astrocyte</option>
                                <option>Oligodendrocyte</option>
                                <option>Microglia</option>
                            </CFormSelect>
                            <CFormInput
                                type="color"
                                value={cls.color}
                                onChange={(e) => handleClassColorChange(index, e.target.value)}
                                className="me-2"
                            />
                            <CFormInput
                                type="number"
                                value={cls.count}
                                onChange={(e) => handleClassCountChange(index, e.target.value)}
                                className="me-2"
                            />
                            <CButton color="danger" onClick={() => deleteClass(index)}><CIcon icon={cilMinus} /></CButton>
                        </div>
                    ))}
                    <CButton color="primary" className="mt-2" onClick={addClass}><CIcon icon={cilPlus} /> Add class</CButton>

                    <CFormLabel className="mt-3">Description:</CFormLabel>
                    <CFormTextarea rows="3" placeholder="Before sync, describe your work please."></CFormTextarea>

                    <CFormCheck className="mt-3" label="I wish to make this contribution public." />

                    <CButton color="success" className="mt-3">Apply to Case</CButton>
                    <CButton color="info" className="mt-3">Sync online</CButton>

                    <div className="mt-3">
                        <p>Number of targets: <CBadge color="primary">5</CBadge></p>
                        <p>Total nuclei: <CBadge color="primary">210</CBadge></p>
                        <p>Overall fitting accuracy: <CBadge color="success">88.33%</CBadge></p>
                        <p>Overall fitting accuracy: <CBadge color="success">88.33%</CBadge></p>
                        <p>Overall fitting accuracy: <CBadge color="success">88.33%</CBadge></p>
                        <p>Overall fitting accuracy: <CBadge color="success">88.33%</CBadge></p>
                        <p>Overall fitting accuracy: <CBadge color="success">88.33%</CBadge></p>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default MLSidebar;
