const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// Student submits answer
router.post("/submit", async (req, res) => {
  try {
    const { studentName, answer } = req.body;

    if (!studentName || !answer) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const saved = await Answer.create({
      studentName,
      answer,
      submittedAt: new Date()
    });

    res.json({
      success: true,
      message: "Answer saved",
      data: saved
    });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
});

module.exports = router;
