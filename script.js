var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload() {
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  connectBttn = document.getElementById("ConnectButton");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");


  messageInput.disabled = true;
  usernameInput.disabled = false;
  chatIDInput.disabled = false;
  connectBttn.disabled = false;

  socket.on("join", function(room) {
    chatRoom.innerHTML = "Chatroom: " + room;
  })
  

  socket.on("recieve", function(message) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(message);
    console.log(message);
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    /*if (messages.length < 9) {
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    else {
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++) {
      document.getElementById("Message" + i).innerHTML = messages[i];

    }*/
  })
}

function Connect() {
  socket.emit("join", chatIDInput.value, usernameInput.value);
  usernameInput.disabled = true;
  chatIDInput.disabled = true;
  messageInput.disabled = false;
  connectBttn.disabled = true;
  document.getElementById("Main").style.display = "none";
  document.getElementById("Main2").style.display = "block";
}

function Send() {
  var input = document.getElementById("ComposedMessage");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("SendMessage").click();
    }
  })
  if (delay && messageInput.value.replace(/\s/g, "") != "") {
    delay = false;
    setTimeout(delayReset, 0);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset() {
  delay = true;
}

