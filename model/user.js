const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  cardid: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = user = mongoose.model("user", userSchema);
