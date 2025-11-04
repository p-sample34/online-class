const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

router.post("/submit-answer", async (req, res) => {
  const ans = await Answer.create(req.body);
  res.json(ans);
});

module.exports = router;
