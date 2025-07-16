const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },  // ✅ NEW
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type:{type:String,enum:['user','admin'],default:'user'}
});

module.exports = mongoose.model('User', UserSchema);
