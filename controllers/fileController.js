const File = require('../models/File');
const crypto = require('crypto');
const apiUrl = "http://localhost:5000/api/files"

// Upload File
exports.uploadFile = async (req, res) => {
  const encryptedUrl = crypto.randomBytes(16).toString('hex');

  const file = new File({
    file_name: req.file.originalname,
    file_type: req.file.mimetype,
    uploaded_by: req.user.id,
    encrypted_url: encryptedUrl,
  });

  await file.save();
  res.status(201).send({ message: 'File uploaded successfully' });
};

// List Files
exports.listFiles = async (req, res) => {
  const files = await File.find();
  res.send(files);
};

// Download File
exports.downloadFile = async (req, res) => {
  const { file_id } = req.params;
  const file = await File.findById(file_id);

  if (!file) return res.status(404).send('File not found');

  res.send({
    'download-link': `${apiUrl}/files/${file.encrypted_url}`,
    message: 'success',
  });
};
