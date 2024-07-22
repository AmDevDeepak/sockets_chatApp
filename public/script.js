let socket = io();
let sendBtn = document.getElementById("send-btn");
let inputMsg = document.getElementById("newMsg");
let msgList = document.getElementById("msgList");

sendBtn.onclick = () => {
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
  inputMsg.value = "";
}

socket.on('msg_received', ({msg}) => {
  let liMsg = document.createElement("li");
  liMsg.innerText = `${msg}`;
  msgList.appendChild(liMsg);
})