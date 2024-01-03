import express from "express";
import cors from "cors";
import http from "http";
import socketIo from "socket.io";
import multer from "multer"; // multer 라이브러리 임포트
import fs from "fs"; // 파일 시스템 모듈 임포트
import path from "path"; // 경로 모듈 임포트

const app = express();
const port = process.env.PORT || 8000; // 포트 설정

// 파일을 저장할 디렉토리 설정
const uploadDirectory = path.join(__dirname, "uploads"); // 파일 위치를 현재 디렉토리의 uploads로 설정
// multer 설정 (파일 저장 위치 설정)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors({ origin: "http://172.20.10.2:3000" }));
app.use(express.static(uploadDirectory)); // 업로드된 파일을 제공하는 정적 경로 설정
app.get("/", (req, res) => res.send("Hello World!"));

// 여러 파일 업로드를 위한 라우트 수정
app.post("/upload", upload.array("files"), (req, res) => {
  if (req.files) {
    console.log("Files received:", req.files);
    return res.json({ message: "Files uploaded successfully." });
  }
  return res.status(400).send("No files uploaded.");
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://172.20.10.2:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const roomName = socket.id;
  console.log("New client connected");

  socket.on("create_ai_chat_room", () => {
    socket.join(roomName);
    console.log(`Room created with name: ${roomName}`);
  });

  socket.on("ai_chat_message", (msg) => {
    console.log("message: " + msg);
    io.to(roomName).emit("ai_chat_message", msg); //해당 유저의 private room에만 메시지 전달
  });

  socket.on("disconnect", () => {
    socket.leave(roomName); //해당 private room 떠나기
    console.log("Client disconnected");
  });
});

const handleListen = () =>
  console.log(`Listening on http://172.20.10.2:${port}`);
server.listen(port, handleListen);
