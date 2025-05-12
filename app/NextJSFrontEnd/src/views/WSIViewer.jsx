// src/views/WSIViewer.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OpenSeadragon from 'openseadragon';

const ZOOM_THRESHOLD = 5;          // >5 ⇒ show contours, else centroids
const API_ROOT      = 'http://localhost:5588/api/segmentation';
const DOT_SIZE      = 3;           // px radius for centroids




/**
 * Whole-Slide-Image Viewer page
 * – lets the user upload a .svs / .tif file,
 * – sends it to Flask /upload,
 * – then renders the image in an OpenSeadragon viewer.
 */
const WSIViewer = () => {
  const viewerDiv = useRef(null);       // DOM node for OpenSeadragon
  const svgRef    = useRef(null);
  const [viewer, setViewer] = useState(null);
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const filenameFromParam = params.get('file')

  useEffect(() => {
    if (filenameFromParam) {
      fetch(`http://localhost:5588/load/${filenameFromParam}`)
        .then(res => res.json())
        .then(data => {
          if (data.dimensions) {
            initViewer(data.dimensions)
            setFilename(filenameFromParam)
          }
        })
        .catch(err => setError('Failed to load slide from filename param'))
    }
  }, [filenameFromParam])
  

  /** when a user selects a file */
  const handleUpload = async (e) => {
    console.log('✅ handleUpload triggered!');
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5588/upload', { // Changed port to 5588
      method: 'POST',
      body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // data.dimensions = [[w0, h0], [w1, h1], ...]
      initViewer(data.dimensions);
      setFilename(data.filename);
    } catch (err) {
      setError(err.message);
    }
  };

    /* ---------- fetch helpers ---------- */
    const fetchSeg = async (type) => {
      const res  = await fetch(`${API_ROOT}?type=${type}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'fetch failed');
      return json.data;                  // array
    };

    /* ---------- draw helpers ----------- */
  const clearSVG = () => (svgRef.current.innerHTML = '');

  const drawCentroids = async () => {
    clearSVG();
    const pts = await fetchSeg('centroid');
    const g   = document.createElementNS('http://www.w3.org/2000/svg','g');
    pts.forEach(([x, y]) => {
      const vp   = viewer.viewport.imageToViewerElementCoordinates({x, y});
      const dot  = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('cx', vp.x);  dot.setAttribute('cy', vp.y);
      dot.setAttribute('r', DOT_SIZE);
      dot.setAttribute('fill', 'red');
      g.appendChild(dot);
    });
    svgRef.current.appendChild(g);
  };

  const drawContours = async () => {
    clearSVG();
    const polys = await fetchSeg('contour');      // [[ [x,y], …32 ] …]
    const g     = document.createElementNS('http://www.w3.org/2000/svg','g');
    polys.forEach((poly) => {
      const d = poly
        .map(([x,y],i) => {
          const vp = viewer.viewport.imageToViewerElementCoordinates({x,y});
          return `${i===0?'M':'L'}${vp.x} ${vp.y}`;
        }).join(' ') + ' Z';
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'lime');
      path.setAttribute('stroke-width', '1');
      g.appendChild(path);
    });
    svgRef.current.appendChild(g);
  };

  /* ---------- zoom handler ------------ */
  const refreshOverlay = () => {
    if (!viewer) return;
    const zoom = viewer.viewport.getZoom(true);
    if (zoom > ZOOM_THRESHOLD) drawContours();
    else                       drawCentroids();
  };

   /* ---------- initViewer (unchanged lines + svg) ---------- */
   const initViewer = (dims) => {
    if (viewer) { viewer.destroy(); setViewer(null); }
    if (!viewerDiv.current) return;

    const osd = OpenSeadragon({
      element: viewerDiv.current,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      showNavigator: true,
      debugMode: false,
      tileSources: { height: dims[0][1], width: dims[0][0], tileSize:512,minLevel: 0,
        maxLevel: dims.length - 1,
        getTileUrl:(l,x,y)=>`http://localhost:5588/slide/${l}/${x}_${y}.jpeg` }
    });

    osd.addHandler('zoom', refreshOverlay);
    osd.addHandler('pan',  refreshOverlay);
    setViewer(osd);

    /* mount empty SVG overlay */
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.style.position = 'absolute';
    svg.style.top = svg.style.left = 0;
    svg.style.width = '100%'; svg.style.height='100%';
    svgRef.current = svg;
    viewerDiv.current.appendChild(svg);
    console.log('📐 Viewer initialized with dims:', dims);

  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Whole-Slide-Image Viewer</h2>

      {/* upload control */}
      <input
        type="file"
        accept=".svs,.tif,.tiff"
        onChange={handleUpload}
        className="form-control mb-3"
      />

      {filename && (
        <p className="text-success">
          Loaded: <strong>{filename}</strong>
        </p>
      )}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* viewer container */}
      <div
        ref={viewerDiv}
        style={{ width: '100%', height: '600px', background: '#000' }}
      />
    </div>
  );
};

export default WSIViewer;
