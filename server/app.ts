import express from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import http from "http";

// dotenv config
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = process.env.PORT || 8000;

// socket related
io.on("connection", (socket: any) => {
  socket.on("drawing", (infos: any) => {
    // broadcast to all sockets in the server except the sender
    socket.broadcast.emit("drawing", infos);
  });
});

// routes
app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
