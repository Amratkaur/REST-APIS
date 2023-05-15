const mongoose = require("mongoose");
const otherPlace = new mongoose.Schema({
  place: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const otherSchema = new mongoose.model("otherSchema", otherPlace);
module.exports = otherSchema;
