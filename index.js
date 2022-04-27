const express = require("express");
var app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

// app.use(cors());

// import sequelize from './app/db';
// import models from '../models';
// import db from '../db';

const sequelize = require('./app/db')
const models = require('./app/models')
const db = require('./app/db')
const Members = models.initModels(db).members;

// connect mysql
const findTop = async () => {
  console.log('Members ----')
  const data = await Members.findAll();
  // console.log(data);
  console.log("All users:", JSON.stringify(data));
  console.log('Members ----')
}

findTop();

var server = require("http").Server(app)
var io = require("socket.io")(server)

let PORT = 3000
server.listen(PORT)

io.on("connection", function(socket) {
  console.log("user connect: " + socket.id + " - " + socket.client.conn.server.clientsCount)
  socket.numLogin = socket.count() + 1;

  socket.on("disconnect", function() {
    console.log(socket.id + ": disconnected!")
  })

  socket.on('create-post-room', function(data) {
    socket.join(data),
    socket.room = data;
  })

  socket.on("client-send-data", function(data) {
    console.log(`${data}`);

    // send all client receive (include myself)
    // io.sockets.emit("server-response-data", data);

    // who send, who will receive
    // socket.emit("server-response-data", data);

    // send all client receive (exclude myself)
    socket.broadcast.emit("server-response-data", data2);
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

// https://www.youtube.com/watch?v=ovAeRVUiuvA

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const initServer = async () => {
  await sequelize.sync();
  // server.listen(port, '0.0.0.0', () =>
  //   console.log(`server is running ${env} on port ${port}`)
  // );
};

initServer();