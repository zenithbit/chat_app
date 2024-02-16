const { Server } = require("socket.io");

const io = new Server({ cors: "http://127.0.0.1:5173/" });

let onlineUsers = [];
// let trueUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      userId !== null &&
      onlineUsers.push({ userId: userId, socketId: socket.id });
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(7625);
