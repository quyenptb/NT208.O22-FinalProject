import React, { useState, useRef } from 'react';
import './CustomCard.css'; 
import { Editor } from '@tinymce/tinymce-react'; //Thư viện TinyMCE giúp tạo ô text có định dạng
import awardPic from './icons/award.png';
import ReportModal from './ReportModal';
import { Route, Routes } from 'react-router-dom';

const CustomCard = ({title, award, user, time, subject, uni, text}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false); //State quản lí việc hiển thị Modal
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const editorRef = useRef(null); //khởi tạo biến tham chiếu đến Editor

  const handleEditorChange = (content, editor) => {
    setNewComment(content);
    editorRef.current = editor;
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([newComment, ...comments]);
      setNewComment('');
    }
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  };

  const handleButtonSave = (event) => {
    event.preventDefault();
        setIsSaved(true);
    //tự động thêm câu hỏi này vào mục đã lưu của người dùng.
  };
  
  const updateIsReportSubmitted = (newValue) => {
    setIsReportSubmitted(newValue);
  };

const updateIsReportModalVisible = (newValue) => {
    setIsReportModalVisible(newValue);
}

const handleReportClick = (event) => {
    event.preventDefault();
    //event.stopPropagation(); 
    if (!isReportSubmitted) {
    setIsReportModalVisible(true); 
  }
}

  return (
    <div className="custom-card-container">
      <div className="custom-card-header">
        <div className="custom-card-header-title">
        <h3>{title}</h3>
        <span className="card-award"><h2>{award}</h2></span>
        <img src={awardPic} alt='Award Icon' style={{width: '50px', height: '50px'}}/>
        </div>
        <div className='custom-card-header-info' style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <span className="card-time">{user}</span>
        <span className="card-time">{time}</span>
        <span className="card-subject">{subject}</span>
        <span className="card-uni">{uni}</span>
        </div>
        </div>
      <div className="custom-card-body">
        <h5 className="custom-card-question-title">Câu hỏi:</h5>
        <p className="custom-card-question-content">{text}</p>
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="newComment" className="custom-card-form-label">Trả lời</label>
          <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey='ubvf47mx487okwyj5ynvjw2ruufjrou0oyb6mq4b8tygjopl'
            initialValue=""
            init={{
              placeholder: `Hãy giúp ${user} trả lời câu hỏi nhé! Chúc bạn một ngày học tập vui vẻ!`,
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
            onEditorChange={handleEditorChange}
          />
          <button className="custom-card-submit-btn" type="submit" onClick={handleCommentSubmit}>Gửi</button>
          <button className="custom-card-save-btn" type="button" onClick={handleButtonSave}>{isSaved ? 'Đã lưu!' : 'Lưu câu hỏi'} </button>
          <span>
          <button className="custom-card-report-btn" type="button" onClick={handleReportClick}>Báo vi phạm</button>
          {isReportModalVisible && <ReportModal isClicked={isReportModalVisible} updateIsReportSubmitted={updateIsReportSubmitted} updateIsReportModalVisible={updateIsReportModalVisible}/>}
          </span>
          </form>
      </div>
      <div className="custom-card-footer">
        <h5 className="custom-card-comments-title">Trả lời:</h5>
        {comments.map((comment, index) => (
          <div className="custom-card-comments-content">
          <div> <span> Tên người đăng </span> <span>Thời gian đăng</span></div>
          <div key={index} className="custom-card-comment" style={{color: "black"}} dangerouslySetInnerHTML={{ __html: comment }}>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCard;

