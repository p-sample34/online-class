const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: String,
  marks: { type: Number, default: 0 }
});
module.exports = mongoose.model("Student", StudentSchema);
