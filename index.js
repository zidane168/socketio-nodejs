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
})

app.get("/", function(req, res) {
  res.render("home")    // giong y chang tren trong views/home.ejs
})

console.log(`Socket.IO server running at: http://localhost:3000/`)