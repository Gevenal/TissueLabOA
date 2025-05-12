# TissueLab

A Python-programmable Pathology Image Viewer and AI Platform.

The purpose of this initiative is aim to create an open-source platform that enables doctors to perform tasks like cell segmentation, image analysis, and AI diagnosis, while also integrating with large language models for tasks such as medical report writing. Unlike existing web-based solutions, which struggle with securely handling large, sensitive medical images, our cross-platform software will operate within hospital firewalls. We are excited to develop a next-generation tool that overcomes the limitations of current desktop platforms and drives innovation in medical imaging.

## Pre-requisite

Initialize Git LFS.
In this repository, we have some example WSI data which are stored using `git-lfs`. If this is your first time using `git-lfs`, please follow this tutorial: https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage.

You may want to use `git lfs fetch` and `git lfs pull` to retrieve the actual files inside `example_WSI/`.

Step 1. Install electron

Install node.js from ```https://nodejs.org/en/download/``` (use version `v20.16.0`).

On Mac OS or Ubuntu:

1. To download and install [electron](https://electron.atom.io) ( OS X or Linux ) you have to download it from [npm-electron](https://www.npmjs.com/package/electron) using :

   ```
   npm install electron --save-dev
   ```

   ```
   npm install -g electron
   ```

   ( if you don't have npm installed use this [link](https://nodejs.org/en/download/) to download it. )

2. Clone this repository:
   ```
   git clone https://github.com/keybraker/python-gui-electron.git
   ```

## Initialize
1. Open `app`: `cd app`.
2. Initialize the electron application (first-time): `npm i`.
3. Run the electron application `npm start`.


## Install packages
npm:

Openseadragon
`npm install @types/openseadragon`
`npm install --save-dev concurrently`

python:
```
conda create -n tissuelab python=3.9
conda activate tissuelab
pip install -r requirements.txt
```


## Useful tutorials
Display .SVS images using OpenSeaDragon in a React.js and Flask application

https://medium.com/@Chitturi_Teja/display-svs-images-using-openseadragon-in-a-react-js-and-flask-application-ad5e35aa125

Serving Digital pathology whole slide image tiles without a server.

https://github.com/episphere/imagebox3


## Build app that can be used across platforms (Mac OS, Windows, Linux)

```npx electron-builder -mwl```