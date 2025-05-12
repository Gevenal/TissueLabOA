# 🧬 TissueLab - Whole Slide Image Viewer with Segmentation Overlay


## ✅ Implemented
- 📂 Upload `.svs` WSI files
- 🔍 Centroid and contour overlay switching based on zoom level
- 🖼️ OpenSeadragon-based viewer
- 📋 File management UI page with upload history
- 🔌 Flask backend APIs: `/upload`, `/slide/...`, `/api/segmentation`, `/list-files`
- 📦 Segmentation data loaded from `.h5` files and visualized on top of the image
- 🧠 Viewer state linked via URL (`/viewer?file=...`)
- 📄 `.gitignore` to prevent large file re-uploads

### 🕒 Partially / Not Implemented
- ❌ Migration to Next.js / TypeScript / Tailwind CSS
- ❌ Annotation and crop region editing
- ❌ Bonus features (user behavior chart, async SAM model)

---

## 🧪 Demo

📹 **Video walkthrough** (includes code explanation and feature demo):  
👉 [Google Drive Link]([https://your-google-drive-link.com](https://drive.google.com/file/d/1D-bqV9HTePo1dvbdafP2StwbQvmTl5Kh/view?usp=sharing)) 

---

## 💻 Getting Started

Clone and run the app locally:

```bash
# 1. Clone this repository
git clone https://github.com/Gevenal/TissueLabOA.git
cd TissueLabOA/app

# 2. Create Python backend environment
conda create -n tissuelab python=3.9
conda activate tissuelab
pip install -r python/requirements.txt

# 3. Install frontend and electron dependencies
npm install

# 4. Start the full stack (Flask + React + Electron)
npm start
