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

let userId = [];

io.on("connection", function(socket) {
  console.log("user connect: " + socket.id)
  userId.push(socket.id);

  // console.log( socket );
  // show list of rooms in server
  // console.log(socket.adapter.rooms);

  socket.on("disconnect", function() {
    console.log(socket.id + ": disconnected!")
  })

  // socket tao ra, se tao ra id, tao ra room luon, (ten room giong voi socket.id)

  // ko co ham tao room, xoa room, 
  // chi co join, leave room
  socket.on('create-room', function(data) {

    console.log("you request create room: ", data);
    socket.join(data)
    // socket.leave(data): socket cuoi cung leave se huy room
   
    socket.room = data;

    for (let user of userId) {
      console.log(user);
    }
  
    let rooms = Array.from(socket.adapter.rooms)
    console.log(rooms);
    for (let r of rooms) {  // let of -> get value  / let in -> get id
      console.log("Room: ", r[0]);

      let userInRoom = Array.from(r[1])
      for (let u of userInRoom) {
        console.log("Users in room: ", u);
      }

      console.log(" ======== ");
    }

    // io.socket.emit("server-send-rooms", arr)
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