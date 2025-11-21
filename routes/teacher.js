const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");

/* Add Question */
router.post("/add-question", async (req, res) => {
  try {
    const { question, timeLimit } = req.body;

    const q = await Question.create({
      question,
      timeLimit,
      createdAt: new Date()
    });

    res.json(q);
  } catch (err) {
    res.json({ error: true });
  }
});

/* Mark Answer */
router.post("/mark-answer", async (req, res) => {
  try {
    const { studentName, questionId, marks } = req.body;

    const ans = await Answer.findOneAndUpdate(
      { studentName, questionId },
      { marks },
      { new: true }
    );

    res.json({ success: true, ans });
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
