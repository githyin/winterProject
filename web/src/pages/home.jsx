import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6" className="d-flex flex-row">
          <Card
            className="mt-5"
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body>
              <Card.Title
                className="text-center"
                style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}
              >
                CHAIRS {/* 로고 텍스트 */}
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.25rem",
                  color: "#888",
                  marginBottom: "1.5rem",
                }}
              >
                Your AI, Made by Everyone
              </Card.Title>{" "}
              {/* 웹 페이지 제목 */}
              <Card.Text style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                <ul>
                  <li>
                    A platform where all users contribute to train the AI.
                  </li>
                  <li>Share your knowledge and experiences with the AI.</li>
                  <li>
                    AI provides answers to various questions based on learned
                    information.
                  </li>
                  <li>A space for users to freely ask any questions.</li>
                  <li>
                    Experience a new way of learning and sharing knowledge.
                  </li>
                  <li>
                    A community-driven AI service for everyone, by everyone.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <ButtonGroup vertical className="mt-5 ml-3">
            <Link to="/chat">
              <Button variant="primary" className="mb-2">
                Chat
              </Button>
            </Link>
            <Button variant="primary" className="mb-2">
              Stream
            </Button>
            <Link to="/upload">
              <Button variant="primary">Upload</Button>
            </Link>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
