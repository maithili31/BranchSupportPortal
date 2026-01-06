export function setupSocket(io) {
  io.on("connection", socket => {
    socket.on("new_message", msg => {
      socket.broadcast.emit("refresh");
    });
  });
}
