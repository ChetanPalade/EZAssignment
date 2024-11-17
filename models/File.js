const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  file_type: { type: String, required: true },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  encrypted_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', FileSchema);
