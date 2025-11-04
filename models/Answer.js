const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
  studentName: String,
  answer: String,
  questionId: String,
  marks: Number
});
module.exports = mongoose.model("Answer", AnswerSchema);
