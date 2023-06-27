// const Message = require("./models/message");

// const saveMessage = async (message) => {
//   const newMessage = new Message(message);
//   return await newMessage.save();
// };

// const socketIO = require("socket.io");

// let io;
// const connectedUsers = {};

// function initialize(server) {
//   io = socketIO(server);

//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.emit("greeting-from-server", {
//       greeting: "Hello Client",
//     });

//     // Store the user ID when a user connects
//     socket.on("setUserId", (userId) => {
//       connectedUsers[userId] = socket.id;
//     });

//     // Handle new message
//     socket.on("newMessage", (message) => {
//       console.log(message);
//       const { recipientId, text } = message;

//       // Get the socket ID of the recipient
//       const recipientSocketId = connectedUsers[recipientId];

//       // If the recipient is connected, send the message only to them
//       if (recipientSocketId && io.sockets.sockets[recipientSocketId]) {
//         io.sockets.sockets[recipientSocketId].emit("message", {
//           senderId: socket.id,
//           text,
//         });
//       }
//     });

//     // Handle disconnect
//     socket.on("disconnect", () => {
//       console.log("A user disconnected");

//       // Remove the disconnected user from the connected users object
//       const userId = Object.keys(connectedUsers).find(
//         (key) => connectedUsers[key] === socket.id
//       );
//       delete connectedUsers[userId];
//     });
//   });
// }

// module.exports = {
//   initialize,
// };
const Message = require("./models/message");

const saveMessage = async (message) => {
  const newMessage = new Message(message);
  return await newMessage.save();
};

function initialize(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(users);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
}

module.exports = {
  initialize,
};
