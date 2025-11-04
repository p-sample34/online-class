const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  question: String,
  timeLimit: Number
});
module.exports = mongoose.model("Question", QuestionSchema);
