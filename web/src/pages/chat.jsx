import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit("create_ai_chat_room");

      const handleNewMessage = (text) => {
        const newMessageObject = {
          user: "AI", // 'User'는 예시로 사용한 값입니다. 실제 사용자 이름이나 ID 등으로 대체해야 합니다.
          message: text,
        };
        setChat((prevChat) => [...prevChat, newMessageObject]);
      };

      socket.on("ai_chat_message", handleNewMessage);

      return () => {
        socket.off("ai_chat_message", handleNewMessage);
      };
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket && message.trim()) {
      const newMessageObject = {
        user: "User", // 현재 사용자를 나타내는 텍스트로 'User'를 사용합니다.
        message: message,
      };
      setChat((prevChat) => [...prevChat, newMessageObject]);

      socket.emit("ai_chat_message", message);
      setMessage("");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Card
            className="mt-5"
            style={{
              height: "500px",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              overflow: "auto",
            }}
          >
            <Card.Body>
              <Card.Title
                className="text-center"
                style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}
              >
                CHAIRS Chat
              </Card.Title>
              <div style={{ height: "70%", overflowY: "scroll" }}>
                {chat.map((chatItem, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: chatItem.user === "User" ? "right" : "left",
                    }}
                  >
                    <p>
                      <strong>{chatItem.user}:</strong> {chatItem.message}
                    </p>
                  </div>
                ))}
              </div>
              <Form className="mt-3" onSubmit={sendMessage}>
                <Form.Group className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Type your message here..."
                    className="mr-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
