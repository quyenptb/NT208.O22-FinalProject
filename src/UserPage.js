// UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/7');
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
            <img src={`./icons/`} alt={user.name} className="avatar" />
            <h1>{isEditing ? <input type="text" name="name" value={editedUser.name} onChange={handleChange} /> : user.name}</h1>
            <p>{isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>{isEditing ? <input type="text" name="website" value={editedUser.website} onChange={handleChange} /> : user.website}</p>
            {isEditing ? (
              <>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
          <div className="user-details">
            <h2>Contact Information</h2>
            <p>Email: {isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
            <p>Phone: {isEditing ? <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} /> : user.phone}</p>
            <p>Address: {isEditing ? <input type="text" name="address" value={editedUser.address} onChange={handleChange} /> : `${user.address.city}, ${user.address.street}, ${user.address.suite}`}</p>
          </div>
          <div className="user-posts">
            <h2>Recent Posts</h2>
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
