// preload.js
const { contextBridge } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
    loadOpenSeadragon: () => {
        return path.join(__dirname, 'node_modules/openseadragon/build/openseadragon/openseadragon.min.js');
    }
});