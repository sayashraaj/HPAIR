const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  todo: String,
  phone: String
});

mongoose.model('todo', todoSchema);
