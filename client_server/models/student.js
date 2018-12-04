'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hobbies: [{
    type: String,
    required: false
  }],
  photo: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  major: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
