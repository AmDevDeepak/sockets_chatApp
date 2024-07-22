const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const Chat = require("./models/chat.js");

dotenv.config();

const connect = require("./config/database-config");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/chat/:roomId", async(req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomId,
  });
  res.render("index", {
    username: "xyz",
    roomId: req.params.roomId,
    chats: chats,
  });
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.roomId, () => {});
  });

  socket.on("msg_send", async (data) => {
    const chat = await Chat.create({
      content: data.msg,
      user: data.username,
      roomId: data.roomId,
    });
    io.to(data.roomId).emit("msg_received", data);
  });
});

server.listen(port, async () => {
  console.log("Server is running on port");
  await connect(); //
});
