let socket = io();
let btn = document.getElementById("btn");
socket.on("from_server", () => {
  const div = document.createElement("div");
  div.innerHTML = "New event from server";
  document.body.appendChild(div);
});