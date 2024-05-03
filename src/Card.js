import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faThumbsUp, faThumbsDown, faFlag } from '@fortawesome/free-solid-svg-icons';
import ReportModal from './ReportModal';
import { Route, Routes, Link } from 'react-router-dom';

const cards =[
  {
  id: "0",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:"20đ",
  user:"Mỹ Dung", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
}, 
{
  id: "1",
  title:"Giúp mình giải bài này với ạ mọi người ới!!! Mình cảm ơn nhiều lắm ạ.",
  award:"50đ",
  user:"Ngọc Mỹ", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
},
{
  id: "2",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:"50đ",
  user:"Trần Minh", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
}
]

function CardTitle({title, award}) {
    return (
        <div className="card-title">
            <h3>{title}</h3>
            <span className="card-award"><h2>{award}</h2></span>
          </div>
    )
}

function CardHeader({user, time, subject, uni}) {
    return (
        <div className="card-header">
            <div className="user"><a href="#">{user}</a></div>
            <div className="time">{time}</div>
            <div className="subject"><a href="#">{subject}</a></div>
            <div className="uni"> <a href="#">{uni}</a></div>
          </div>
    )
}

function CardFooter({id}) {
    const [upvote, setUpvote] = useState(0); //đang fix lỗi, phải dùng global state để lưu tổng số Upvote
    const [downvote, setDownvote] = useState(0); //đang fix lỗi, phải dùng global state để lưu tổng số Downvote
    const [isUpvoted, setIsUpvoted ] = useState(false) //Trạng thái Clicked của Upvote
    const [isDownvoted, setIsDownvoted ] = useState(false) //Trạng thái Clicked của Downvote
    const [isReportModalVisible, setIsReportModalVisible] = useState(false); //State quản lí việc hiển thị Modal
    const [isReportSubmitted, setIsReportSubmitted] = useState(false);

    const updateIsReportSubmitted = (newValue) => {
        setIsReportSubmitted(newValue);
      };

    const updateIsReportModalVisible = (newValue) => {
        setIsReportModalVisible(newValue);
    }
    
    const handleReportClick = (event) => {
        event.preventDefault();
        event.stopPropagation(); 
        if (!isReportSubmitted) {
        setIsReportModalVisible(true); 
      }
    }
    
      const handleUpvoteClick = (event) => { //Khi Click Upvote
        event.preventDefault();
        if(isUpvoted&&!isDownvoted) { //Upvote đã bị Clicked trước đó
          setIsUpvoted(false)
        }
        else { 
          setIsUpvoted(true);
          setIsDownvoted(false);
        }
        }
    
      const handleDownvoteClick = (event) => {
        event.preventDefault();
        if(!isUpvoted&&isDownvoted) {
          setIsDownvoted(false)
        }
        else {
          setIsUpvoted(false);
          setIsDownvoted(true);
        }
        }


    return (
        <div className="card-footer">
            <div className="answer"><Link to={`/tra-loi/${id}`}><FontAwesomeIcon icon={faCommentDots} /><span>Trả lời</span></Link></div>
            <div className={isUpvoted?"voted":""}>
            <div className="upvote"><a href="#" onClick={handleUpvoteClick}><FontAwesomeIcon icon={faThumbsUp} /><span> +{upvote} Upvote</span></a></div>
            </div>
            <div className={isDownvoted?"voted":""}>
            <div className="downvote"><a href="#" onClick={handleDownvoteClick}><FontAwesomeIcon icon={faThumbsDown} /><span> -{downvote} Downvote</span></a></div>
            </div>
            <div className= {isReportSubmitted?"voted":""}>
            <div className="report"><a href="#something" onClick={handleReportClick}><FontAwesomeIcon icon={faFlag}/><span>Báo vi phạm</span></a>
            {isReportModalVisible && <ReportModal isClicked={isReportModalVisible} updateIsReportSubmitted={updateIsReportSubmitted} updateIsReportModalVisible={updateIsReportModalVisible}/>}
            </div>
            </div>
          </div>
    )
}

function Card({id, title, award, user, time, subject, uni, text}) {
    return (
      <div className="card">
        <div className="card-body">
          <CardTitle title={title} award={award} />
          <CardHeader user = {user} time = {time} subject = {subject} uni = {uni} />
          <p className="card-text">{text}</p>
          <CardFooter id={id}/>
                </div>
      </div>
    )
    }

    export default Card