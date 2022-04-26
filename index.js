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
  })

  socket.on("client-send-object", function(data) {

    console.log(JSON.parse(data));

  })
})

app.get("/", function(req, res) {
  res.render("home")    // giong y chang ten trong views/home.ejs
})

console.log(`Socket.IO server running at: http://localhost:3000/`)

// https://www.youtube.com/watch?v=ovAeRVUiuvA