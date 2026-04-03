const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id:   { type: String, required: true },          // student id (string for dummy compat)
  receiver_id: { type: String, required: true },          // mentor id
  message:     { type: String, required: true },
  priority:    { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  timestamp:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
