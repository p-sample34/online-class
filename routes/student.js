const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

router.post("/answer", async (req, res) => {
  const { studentName, answer } = req.body;
  
  if (!studentName || !answer) {
    return res.json({ success: false });
  }

  await Answer.create({ studentName, answer });
  res.json({ success: true });
});

module.exports = router;
