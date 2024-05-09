// UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';

import bku from './icons/bku.webp'
import khtn from './icons/khtn.webp'
import ptnk from './icons/ptnk.png'
import ussh from './icons/ussh.png'
import iu from './icons/iu.png'
import uit from './icons/uit.png'
import agu from './icons/agu.png'
import tthc from './icons/tthc.jpg'
import mttn from './icons/mttn.jpg'
import bentre from './icons/bentre.png'
import thsp from './icons/thsp.png'
import uel from './icons/uel.png'
import khsk from './icons/khsk.png'

import uni_data from './data/university.json';
import maj_data from './data/major.json';
import fal_data from './data/faculty.json';
import sub_data from './data/subject.json';
import daho_data from './data/dahohelping.json';

import Notification from './Notification';

const imageMapping = {
  bku: bku,
  khtn: khtn,
  ptnk: ptnk,
  ussh: ussh,
  iu: iu,
  uit: uit,
  agu: agu,
  tthc: tthc,
  mttn: mttn,
  bentre: bentre,
  thsp: thsp,
  uel: uel,
  khsk: khsk
};


const UserPage = ({user_example}) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [notisetting, setNotiSetting] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/7');
      //setUser(response.data); //thả user vào 
      //ví dụ:
      setUser(user_example);
      setEditedUser(user_example);
    } catch (error) {
      console.error('Lỗi xảy ra khi lấy dữ liệu: ', error);
    }
    //giả bộ thoiiii
    setUser(user_example);
      setEditedUser(user_example);
  };
  
  const updateUser = async (updatedUserData) => {
    try {
      const response = await axios.put('http://example.com/api/users/7', updatedUserData);
      setUser(response.data);
      setEditedUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi xảy ra khi cập nhật thông tin người dùng: ', error);
      setShowNotification(true);
      setNotiSetting({message: 'Có lỗi xảy ra khi cập nhật thông tin người dùng!', type: "error"});
    }
    setShowNotification(true);
    setNotiSetting({message: 'Cập nhật thông tin thành công!', type: "success"});
  };

  useEffect(() => {
    // Fetch user data from an API
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSaveEdit = () => {
    // Update user data
    setUser(editedUser);
    setIsEditing(false);
    updateUser(editedUser);
  };

  const handleChange = e => {
    const { name, value } = e.target; 
    setEditedUser({ ...editedUser, [name]: value });
  };

  console.log(user);

  return (
    <div className="user-page">
      {user ? (
        <>
          <div className="user-header">
          <img src={user.avatar} alt={user.username} className="avatar" />
            <h1>
            <img src={imageMapping[uni_data.find((uni) => uni.id === user.uni_id).code]} alt={user.uni_id} className='user-uni' />
                {isEditing ? <input type="text" name="fullname" value={editedUser.fullname} onChange={handleChange} /> : user.fullname}</h1>
                <p><i> {isEditing ? `@${user.username}` : `@${user.username}`}</i></p>
            <p>{isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>{user.fal_id}, {user.maj_id}</p>
          </div>
          <div className="user-details">
            <h2>Thông tin cá nhân</h2>
            <p>Điểm DahoHelping: {user.score} điểm</p>
            <p>Email: {isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>Quê quán: {isEditing ? <input type="text" name="hometown" value={editedUser.hometown} onChange={handleChange} /> : user.hometown}</p> {/*hometown*/}
            <p>Sở thích: {isEditing ? <input type="text" name="hobby" value={editedUser.hobby} onChange={handleChange} /> : user.hobby}</p>
          </div>
          {isEditing ? (
              <>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          <div className="user-posts">
            <h2>Câu hỏi</h2>
            {user.posts && user.posts.length > 0 ? (
              <ul>
                {user.posts.map(post => (
                  <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có câu hỏi nào.</p>
            )}
          </div>
        </>
      ) : (
        <p>Đang hiển thị người dùng...</p>
      )}
      {
  showNotification === true && (
    <Notification
      message={notisetting.message}
      type={notisetting.type}
      onClose={() => setShowNotification(false)} // Đặt setShowNotification(false) khi thông báo được đóng
    />
  )
}
    </div>
  );
};

export default UserPage;
