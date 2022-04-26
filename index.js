const express = require('express');
var app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require("socket.io")(server)
server.listen(3000)

io.on("connection", function(socket) {
  console.log("user connect: " + socket.id)

  socket.on("disconnect", function() {
    console.log(socket.id + ": disconnected!")
  })

  socket.on("client-send-data", function(data) {
    console.log(`${data}`);

    // send all client receive (include myself)
    // io.sockets.emit("server-response-data", data);

    // who send, who will receive
    // socket.emit("server-response-data", data);

    // send all client receive (exclude myself)
    socket.broadcast.emit("server-response-data", data);
  })

  socket.on("client-send-object", function(data) {
    console.log(JSON.parse(data));

    io.sockets.emit("server-response-object", data)

    // send to socket id want to send
    // io.to("socketid").emit();
  })

  socket.on("typing-event", function(temp) {
    const data = socket.id + " is typing!";
    console.log(data)
    socket.broadcast.emit("server-response-typing-event", data);
  })

  socket.on("stop-typing-event", function(temp) {
    const data = socket.id + " is stop!";
    console.log(data)
    socket.broadcast.emit("server-response-stop-typing-event", data);
  })
})

app.get("/", function(req, res) {
  res.render("home")    // giong y chang ten trong views/home.ejs
})

console.log(`Socket.IO server running at: http://localhost:3000/`)

// https://www.youtube.com/watch?v=ovAeRVUiuvA