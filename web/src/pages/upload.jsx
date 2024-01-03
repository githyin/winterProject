import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files); // 파일들을 상태에 저장합니다.
    setUploadStatus(""); // 상태 초기화
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // 기본 폼 제출을 막습니다.

    if (selectedFiles) {
      const formData = new FormData();
      // 여러 파일을 처리하기 위해 formData에 파일들을 추가합니다.
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      try {
        // 'your-endpoint-url'을 서버의 엔드포인트 URL로 바꿔야 합니다.
        const response = await axios.post(
          "http://172.20.10.2:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadStatus("File uploaded successfully");
        console.log(response.data);
      } catch (error) {
        setUploadStatus("Error uploading file");
        console.error("Error uploading file:", error);
      }
    } else {
      setUploadStatus("No file selected.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">CHAIRS Upload</Card.Title>
              <Form onSubmit={handleUpload}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Multiple files input example</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                  />
                </Form.Group>
                <button type="submit">Upload</button>
                {uploadStatus && <p>{uploadStatus}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
