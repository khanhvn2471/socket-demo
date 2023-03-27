const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path"); // thêm module path

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const publicPath = path.join(__dirname, "public"); // đường dẫn tới thư mục public

app.use(express.static(publicPath)); // sử dụng thư mục static làm thư mục public

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Gửi dữ liệu cho client
  setInterval(() => {
    socket.emit("server-send-data", new Date().toLocaleString());
  }, 1000);

  // Nhận dữ liệu từ client
  socket.on("client-send-data", (data) => {
    console.log(`Client sent data: ${data}`);
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
