const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;

app.use("/", express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("msg_send", ({msg}) => {
    io.emit("msg_received", {msg: msg});
  });
});

server.listen(port, () => {
  console.log("Server is running on port");
});
