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
                Chatbot
            </CCardHeader>
            <CCardBody>

            </CCardBody>
        </CCard>
    );
};

export default MLSidebar;
