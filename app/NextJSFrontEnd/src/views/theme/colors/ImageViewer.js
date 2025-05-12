import React, { useEffect, useRef, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react';
import { DocsLink } from 'src/components';
import dynamic from 'next/dynamic';
import './ImageViewer.css';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faMicroscope, faCog, faMessage, faLaptopCode, faCode, faFingerprint, faToggleOff, faHourglass } from '@fortawesome/free-solid-svg-icons';

import SidebarMain from './sidebar/SidebarMain';  // Import the MLSidebar component
import SidebarAI from './sidebar/SidebarAI';  // Import the MLSidebar component
import SidebarEyeTracker from './sidebar/SidebarEyeTracker';  // Import the MLSidebar component
import SidebarChat from './sidebar/SidebarChat';  // Import the MLSidebar component
import SidebarViewerSetting from './sidebar/SidebarViewerSetting';  // Import the MLSidebar component
import SidebarPreprocess from './sidebar/SidebarPreprocess';  // Import the MLSidebar component
import SidebarPythonScripts from './sidebar/SidebarPythonScripts';  // Import the MLSidebar component


// Dynamically import OpenSeadragon only on the client side
const OpenSeadragon = dynamic(() => import('openseadragon'), { ssr: false });

const ImageViewer = () => {
  const viewerRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  // Sidebar visibility state
  const [sidebarContent, setSidebarContent] = useState(null);

  useEffect(() => {
    const initOpenSeadragon = async () => {
      if (typeof window !== 'undefined' && viewerRef.current) {
        const OSD = await import('openseadragon');

        // CustomTileSource function
        function CustomTileSource(width, height, tileSize, tileOverlap, minLevel, maxLevel, baseURL) {
          OSD.TileSource.call(this, {
            width: width,
            height: height,
            tileSize: tileSize,
            tileOverlap: tileOverlap,
            minLevel: minLevel,
            maxLevel: maxLevel,
          });
          this.baseURL = baseURL;
        }

        CustomTileSource.prototype = Object.create(OSD.TileSource.prototype);
        CustomTileSource.prototype.getTileUrl = function(level, x, y) {
          return `${this.baseURL}/${level}/${x}_${y}.jpeg`;
        };

        // Function to initialize OpenSeadragon
        function load_OpenSeadragon(svs_width, svs_height, tile_size, maxLevel) {
          const viewer = OSD.default({
            id: viewerRef.current.id,
            showNavigator: true,
            wrapHorizontal: false,
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: new CustomTileSource(
              /* width */ svs_width / 2**(6-maxLevel),
              /* height */ svs_height / 2**(6-maxLevel),
              /* tileSize */ tile_size,
              /* tileOverlap */ 0,
              /* minLevel */ 0,
              /* maxLevel */ maxLevel,
              /* baseURL */ "http://127.0.0.1:5000/slide"
            ),
            mouseTracker: new OSD.MouseTracker({
              element: viewerRef.current
            }),
            gestureSettingsMouse: {
              flickEnabled: true,
              clickToZoom: true,
              dblClickToZoom: false
            },
            showRotationControl: true,
            rotationIncrement: 30,
            gestureSettingsTouch: {
              pinchRotate: true
            },
            animationTime: 0,
            springStiffness: 100,
            zoomPerSecond: 1,
            zoomPerScroll: 1.5,
            loadTilesWithAjax: true,
            timeout: 1000000,
          });

          viewer.mouseTracker.moveHandler = function(event) {
            var webPoint = event.position;
            var viewportPoint = viewer.viewport.pointFromPixel(webPoint);
            var imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);
          };

          viewer.addHandler('canvas-enter', function(event) {
            var webPoint = event.position;
            var viewportPoint = viewer.viewport.pointFromPixel(webPoint);
            var imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);
          });
        }

        // Use setTimeout to wait for the Flask server to start.
        setTimeout(function() {
          // svs_width = 460000(dimension of the image) * 4
          // svs_height = 329914(dimension of the image) * 4
          const svs_width = 184000;
          const svs_height = 131656;
          const tile_size = 512;
          const maxLevel = 8;
          load_OpenSeadragon(svs_width, svs_height, tile_size, maxLevel);
        }, 2000);
      }
    };

    initOpenSeadragon();
  }, []);

  const toggleSidebar = (content) => {
    if (sidebarContent === content) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setSidebarContent(content);
      setIsSidebarVisible(true);
    }
  };

  return (
    <div className="image-viewer-container">
      <div className={`image-viewer-main ${isSidebarVisible ? '' : 'full-width'}`}>
        <div id="osd-toolbar" style={{ marginBottom: '0px' }}></div>
        <div
          id="openseadragon1"
          ref={viewerRef}
          style={{ width: '100%', height: 'calc(100vh - 66px)', border: '0px solid #5c5c5c69', backgroundColor: 'darkgrey' }}
        ></div>
      </div>

      <div style={{ backgroundColor: '#323a49', padding: '2px' }}>
        <CButton onClick={() => toggleSidebar('SidebarMain')} className="sidebar-icon-button" style={{ backgroundColor: '#cfcfcf', color: '#000'}}>
          <FontAwesomeIcon icon={faBars} className="icon" />
          <span className="text">Main</span>
        </CButton>

        <hr style={{ margin: '8px auto', borderColor: 'rgba(255, 255, 255, 0.8)', borderWidth: '1px', width: '80%' }} />

        <CButton onClick={() => toggleSidebar('SidebarPreprocess')} className="sidebar-icon-button" style={{ backgroundColor: '#3b49e3'}} >
          <FontAwesomeIcon icon={faHourglass} className="icon" />
          <span className="text">Prep</span>
        </CButton>

        <CButton onClick={() => toggleSidebar('SidebarAI')} className="sidebar-icon-button" style={{ backgroundColor: '#cc1f87'}} >
          <FontAwesomeIcon icon={faMicroscope} className="icon" />
          <span className="text">AI</span>
        </CButton>

        <CButton onClick={() => toggleSidebar('SidebarEyeTracker')} className="sidebar-icon-button" style={{ backgroundColor: '#ad84f0'}} >
          <FontAwesomeIcon icon={faEye} className="icon" />
          <span className="text">Tracker</span>
        </CButton>

        <CButton onClick={() => toggleSidebar('SidebarPythonScripts')} className="sidebar-icon-button" style={{ backgroundColor: '#bd945b'}} >
          <FontAwesomeIcon icon={faCode} className="icon" />
          <span className="text">Python</span>
        </CButton>

        <CButton onClick={() => toggleSidebar('SidebarChat')} className="sidebar-icon-button" style={{ backgroundColor: '#629e60'}} >
          <FontAwesomeIcon icon={faMessage} className="icon" />
          <span className="text">Chat</span>
        </CButton>

        

        <CButton onClick={() => toggleSidebar('SidebarViewerSetting')} className="sidebar-icon-button" style={{ backgroundColor: '#cfcfcf', color: '#000', position: 'absolute', bottom: '0'}}>
          <FontAwesomeIcon icon={faCog} className="icon" />
          <span className="text">Viewer</span>
        </CButton>
        
      </div>

      {isSidebarVisible && (
        <div style={{ height: 'calc(100vh - 66px)', overflowY: 'auto' }}>
          {sidebarContent === 'SidebarMain' && <SidebarMain />}
          {sidebarContent === 'SidebarPreprocess' && <SidebarPreprocess />}
          {sidebarContent === 'SidebarAI' && <SidebarAI />}
          {sidebarContent === 'SidebarEyeTracker' && <SidebarEyeTracker />}
          {sidebarContent === 'SidebarPythonScripts' && <SidebarPythonScripts />}
          {sidebarContent === 'SidebarChat' && <SidebarChat />}
          {sidebarContent === 'SidebarViewerSetting' && <SidebarViewerSetting />}
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
