const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Ops User', 'Client User'], required: true },
  email_verified: { type: Boolean, default: false },
  verification_code: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
