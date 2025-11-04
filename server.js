const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Allow frontend from GitHub Pages
const allowedOrigins = ["https://p-sample34.github.io", "http://localhost:5500"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

// ✅ Socket.io with CORS setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Import Models
const Student = require("./models/Student");
const Question = require("./models/Question");
const Answer = require("./models/Answer");

// ✅ Routes
app.use("/auth", require("./routes/auth"));
app.use("/teacher", require("./routes/teacher"));
app.use("/student", require("./routes/student"));

// ✅ Socket.io Real-time Features
io.on("connection", (socket) => {
  console.log("🟢 New connection:", socket.id);

  socket.on("teacher-question", (data) => {
    io.emit("new-question", data); // broadcast to all students
  });

  socket.on("student-answer", (data) => {
    io.emit("student-answer", data); // send back to teacher
  });

  socket.on("webrtc-offer", (data) => socket.broadcast.emit("webrtc-offer", data));
  socket.on("webrtc-answer", (data) => socket.broadcast.emit("webrtc-answer", data));
  socket.on("webrtc-candidate", (data) => socket.broadcast.emit("webrtc-candidate", data));

  socket.on("disconnect", () => console.log("🔴 Disconnected:", socket.id));
});

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ Server is running and CORS is configured properly.");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
