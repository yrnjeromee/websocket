const input = document.getElementById("input");
const invio = document.getElementById("invio");
const chat = document.getElementById("chat");
const nomeInChat = document.getElementById("nomeInChat");
const salvaNome = document.getElementById("salvaNome");
const template = "<li class=\"list-group-item\">%MESSAGE</li>";

const messages = [];

const socket = io();
let userName = "";
const nameModal = new bootstrap.Modal(document.getElementById('nameModal'), {
  backdrop: 'static',
  keyboard: false
});
nameModal.show();

salvaNome.onclick = () => {
  const name = nomeInChat.value;
  if (name !== "") {
    userName = name;
    nameModal.hide();
  }
};

input.onkeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    invio.click();
  }
};

invio.onclick = () => {
  const text = input.value;
  if (userName && text !== "") {
    socket.emit("message", {
      name: userName,
      text: text
    });
    input.value = "";
  }
};

socket.on("chat", (data) => {
  const { name, text } = data;
  const message = `${name}: ${text}`;
  messages.push(message);
  render();
});

const render = () => {
  let html = "";
  messages.forEach((message) => {
    const row = template.replace("%MESSAGE", message);
    html += row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
};