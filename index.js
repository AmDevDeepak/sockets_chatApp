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
  setInterval(() => {
    socket.emit("from_server");
  }, 2000);
});

server.listen(port, () => {
  console.log("Server is running on port");
});
