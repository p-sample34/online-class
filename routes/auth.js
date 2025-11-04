const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/teacher", (req, res) => {
  const { name, password } = req.body;
  if (password === "ssvt-tutor-2018") return res.json({ success: true });
  res.status(401).json({ success: false, message: "Invalid password" });
});

router.post("/student", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  await Student.create({ name });
  res.json({ success: true });
});

module.exports = router;
