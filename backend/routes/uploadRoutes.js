const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const DatauriParser = require('datauri/parser'); // ✅ Corrected import
const path = require('path');

const parser = new DatauriParser();

router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.image;

    // Convert file buffer to base64 Data URI
    const dataUri = parser.format(path.extname(file.name).toString(), file.data);

    const result = await cloudinary.uploader.upload(dataUri.content, {
      folder: 'uploads',
    });

    res.status(200).json({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

router.delete('/delete', async (req, res) => {
    const { public_id } = req.body;
  
    if (!public_id) {
      return res.status(400).json({ message: 'public_id is required' });
    }
  
    try {
      const result = await cloudinary.uploader.destroy(public_id);
  
      if (result.result === 'ok') {
        return res.status(200).json({ message: 'Image deleted successfully' });
      } else {
        return res.status(400).json({ message: 'Failed to delete image', result });
      }
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ message: 'Deletion failed', error: error.message });
    }
  });
  

module.exports = router;
