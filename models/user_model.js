const mongoose = require("mongoose");

const user_Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  like: {
    type: [Object],
  },
  book: {
    type: [Object],
  },
  buy: {
    type: [Object],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const user_model = mongoose.model("users", user_Schema);

module.exports = user_model;
