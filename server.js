const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Socket server is running");
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});