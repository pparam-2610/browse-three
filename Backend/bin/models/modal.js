const mongoose = require("mongoose");

const modalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  //   size: {
  //     type: Number,
  //     required: true,
  //   },
});

module.exports = mongoose.model("modal", modalSchema);
