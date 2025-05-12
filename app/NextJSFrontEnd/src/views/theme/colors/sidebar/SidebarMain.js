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
                Main
            </CCardHeader>
            <CCardBody>
                <h5>Metadata</h5>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #e9ecef' }}>Image Size</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e9ecef' }}>102524 x 76845</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #e9ecef' }}>File size</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e9ecef' }}>3.12GB</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #e9ecef' }}>MPP</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e9ecef' }}>0.25 µm</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #e9ecef' }}>Magnification</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e9ecef' }}>40x</td>
                        </tr>
                    </tbody>
                </table>
            </CCardBody>
        </CCard>
    );
};

export default MLSidebar;
