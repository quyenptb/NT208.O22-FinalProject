import React, { useEffect, useState, useRef, useContext, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal, Dropdown, DropdownItem, DropdownButton, Table, Image, FormSelect } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react'; //Thư viện TinyMCE giúp tạo ô text có định dạng


const CreateQuestionButton = () => {
    const editorRef = useRef(null); //khởi tạo biến tham chiếu đến Editor
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [score, setScore] = useState(10);
    const [content, setContent] = useState('');
    const [A, setA] = useState(0); // Initial value for A

    useEffect(() => {
        // Simulate getting user's score after authentication
        const userScore = getUserScore(); // Assume this function retrieves user's score
        setA(userScore); // Set A to user's score
      }, []);

      const getUserScore = () => {
        // Simulate getting user's score from backend or any other source
        // For demonstration purposes, return a static value
        return 100; // Assume user's score is 100
      };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
    const handleScoreChange = (e) => {
      setScore(e.target.value);
    };

    const handleContentChange = (content, editor) => {
      setContent(content);
      editorRef.current = editor;
    };
  
    return (
      <div>
        <Button onClick={handleShow} style={styles.button}>Tạo câu hỏi trong vài giây!</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tạo câu hỏi mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label for='title'>Tiêu đề câu hỏi</Form.Label>
              <Form.Control name='title' id='title' type="text" value={title} onChange={handleTitleChange} />
              <Form.Label for='content'>Nội dung câu hỏi</Form.Label>
            <Editor id='content' name='content'
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey='ubvf47mx487okwyj5ynvjw2ruufjrou0oyb6mq4b8tygjopl'
              initialValue=""
              init={{
                placeholder: `Nhập nội dung câu hỏi của bạn. Hãy sử dụng từ ngữ lịch sự và dành lời cảm ơn cho những người trả lời!`,
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image imagetools charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'image | code | undo redo | formatselect | bold italic underline | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={handleContentChange}
            />
            </Form.Group>
            <Form.Label for='score'>Số điểm</Form.Label>
            <Form.Control name='score' id='score' type="number" value={score} step={10} max={A} onChange={handleScoreChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Huỷ bỏ
            </Button>
            <Button variant="primary" onClick={() => {
              // Add logic to create a new question with title and content
              // ...
              handleClose();
            }}>
              Tạo câu hỏi
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
   
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //height: '100vh',
    },
    button: {
      position: 'relative',
      alignSelf: 'center',
      padding: '15px 30px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      backgroundColor: '#ff4500',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    }
  };

  export default CreateQuestionButton;