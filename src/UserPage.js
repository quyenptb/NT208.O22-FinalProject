// UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';
import bku from './icons/bku.webp'

const UserPage = ({user_example}) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API
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
    };

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
  };

  const handleChange = e => {
    const { name, value } = e.target; 
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="user-page">
      {user ? (
        <>
          <div className="user-header">
          <img src={user.avatar} alt={user.username} className="avatar" />
            <h1>
                <img src={user.uni_id} alt={user.uni_id} className='user-uni' />
                {isEditing ? <input type="text" name="fullname" value={editedUser.fullname} onChange={handleChange} /> : user.fullname}</h1>
                <p><i> {isEditing ? `@${user.username}` : `@${user.username}`}</i></p>
            <p>{isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>Khoa {user.fal_id}, ngành {user.maj_id}</p>
          </div>
          <div className="user-details">
            <h2>Thông tin cá nhân</h2>
            <p>Điểm DahoHelping: {user.score} điểm</p>
            <p>Email: {isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>Quê quán: {isEditing ? <input type="text" name="hometown" value={editedUser.hometown} onChange={handleChange} /> : user.hometown}</p> {/*hometown*/}
            <p>Sở thích: {isEditing ? <input type="text" name="hobby" value={" "} onChange={handleChange} /> : user.hobby}</p>
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
    </div>
  );
};

export default UserPage;
