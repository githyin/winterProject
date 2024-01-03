import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Upload from "./pages/upload";
const ENDPOINT = "http://172.20.10.2:8000";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = socketIOClient(ENDPOINT);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<Chat socket={socket} />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
