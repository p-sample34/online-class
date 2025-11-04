const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const generatePDF = require("../utils/generatePDF");

router.post("/add-question", async (req, res) => {
  const q = await Question.create(req.body);
  res.json(q);
});

router.post("/mark-answer", async (req, res) => {
  const { studentName, questionId, marks } = req.body;
  await Answer.findOneAndUpdate({ studentName, questionId }, { marks });
  res.json({ success: true });
});

router.get("/generate-report", async (req, res) => {
  const answers = await Answer.find();
  const pdfPath = await generatePDF(answers);
  res.download(pdfPath);
});

module.exports = router;
