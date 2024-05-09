// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'
import daho from './icons/DahoHelping1.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const loginUser = async (userData) => {
  try {
    // Gửi yêu cầu POST đến backend để đăng nhập
    const response = await axios.post('http://example.com/api/login', userData);

    // Kiểm tra mã trạng thái của phản hồi từ backend
    if (response.status === 200) {
      // Nếu đăng nhập thành công, trả về dữ liệu từ backend (ví dụ: thông tin người dùng)
      return response.data;
    } else {
      // Nếu có lỗi khi đăng nhập, in ra console và ném ra một ngoại lệ để xử lý
      throw new Error('Failed to login: Invalid response from server');
    }
  } catch (error) {
    // Xử lý lỗi khi có lỗi xảy ra trong quá trình gửi yêu cầu hoặc nhận phản hồi từ backend
    console.error('Error logging in:', error);
    throw error;
  }
};

const LoginPage = () => {
  const [notisetting, setNotiSetting] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  })
const [passwordError, setPasswordError] = useState('')
const [usernameError, setUsernameError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(formData);
      console.log('User logged in successfully:', loggedInUser);
      setShowNotification(true);
      setNotiSetting({ message: 'Đăng nhập thành công! Đang chuyển trang ...', type: 'success' });
      navigate('/trang-chu');
      // Điều hướng người dùng đến trang khác hoặc thực hiện các thao tác khác sau khi đăng nhập thành công
    } catch (error) {
      // Xử lý lỗi khi đăng nhập không thành công
      console.error('Error logging in:', error);
      setShowNotification(true);
      setNotiSetting({ message: 'Đăng nhập không thành công! Gặp lỗi ' + error, type: 'error' });
      // Hiển thị thông báo lỗi cho người dùng, ví dụ: setUsernameError('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };

  const onButtonClick = () => {
    // Set initial error values to empty
    setUsernameError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === formData.username) {
      setUsernameError('Hãy nhập vào Tên người dùng')
      return
    }
  
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username) && !/^[a-zA-Z]/.test(formData.username)) {
      setUsernameError('Hãy nhập một Tên người dùng hợp lệ')
      return
    }
  
    if ('' === formData.password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (formData.password.length < 7) {
      setPasswordError('Mật khẩu phải có độ dài tối thiểu 8 kí tự')
      return
    }
  }
  return (
    
     <div className='login-container'> 
        <img className='login-logo' src= {daho} alt='Logo' />
      <div className='login-card'>
        <h1 className='login-title'>Đăng nhập</h1>
        <form onSubmit={handleSubmit} className='login-login-form'>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Tên người dùng"
            onChange={handleChange}
            className='login-input'
          />
          <label className="errorLabel" style={{color: 'red', fontSize: '12px'}}>{usernameError}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Mật khẩu"
            onChange={handleChange}
            className='login-input'
          />
          <label className="errorLabel" style={{color: 'red', fontSize: '12px'}}>{passwordError}</label>
          <label className='login-checkboxLabel'>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className='login-checkbox'
            />
            Lưu thông tin đăng nhập
          </label>
          <button type="submit" className='login-button' onClick={onButtonClick}>Đăng nhập</button>
        </form>
      </div>
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

export default LoginPage;
