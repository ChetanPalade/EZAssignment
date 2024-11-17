const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .pptx, .docx, and .xlsx files are allowed'));
    }
  },
});

const router = express.Router();

router.post('/upload', authMiddleware, roleMiddleware(['Ops User']), upload.single('file'), uploadFile);
router.get('/list-files', authMiddleware, roleMiddleware(['Client User']), listFiles);
router.get('/download-file/:file_id', authMiddleware, roleMiddleware(['Client User']), downloadFile);

module.exports = router;
