import numpy as np
from PIL import Image, ImageOps
import cv2
import numpy as np
from skimage.color import rgb2hed
from skimage.filters import threshold_otsu
from skimage import morphology, measure


class PostProcess:
    def __init__(self, img, level, app) -> None:
        self.img = img
        self.img_np = np.array(self.img)
        self.level = level
        self.app = app
        
    def run(self):
        self.object_detector()
        #self.inverse() # inverse

    def inverse(self):
        self.img = Image.fromarray(self.img_np)
        self.img = ImageOps.invert(self.img)

    def object_detector(self, method="vanilla"):
        if method == "vanilla":
            # Step 1: Color Deconvolution
            hed = rgb2hed(self.img_np)
            hematoxylin_channel = hed[:, :, 0]  # Hematoxylin channel
            # Step 2: Enhance Contrast (optional)
            # You can adjust this step based on your image's contrast
            hematoxylin_enhanced = np.clip(hematoxylin_channel * 1.5, 0, 1)
            # Step 3: Thresholding
            thresh_val = threshold_otsu(hematoxylin_enhanced)
            binary_mask = hematoxylin_enhanced > thresh_val
            # Step 4: Morphological Operations
            cleaned_mask = morphology.remove_small_objects(binary_mask, min_size=50)
            cleaned_mask = morphology.closing(cleaned_mask, morphology.disk(3))
            # Step 5: Segmentation
            #labeled_nuclei = measure.label(cleaned_mask)
            # Find contours from the cleaned_mask
            contours, hierarchy = cv2.findContours((cleaned_mask * 255).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            # Draw contours on the original image
            cv2.drawContours(self.img_np, contours, -1, (255, 0, 0), 2)  # Drawing in blue with thickness of 2
            self.img = Image.fromarray(self.img_np)
