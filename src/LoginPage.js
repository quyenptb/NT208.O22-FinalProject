// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'
import daho from './icons/DahoHelping1.png'

const LoginPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
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
  
    // Example about  Authentication calls will be made here...
    /*
    checkAccountExists((accountExists) => {
      // If yes, log in
      if (accountExists) logIn()
      // Else, ask user if they want to create a new account and if yes, then log in
      else if (
        window.confirm(
          'Tài khoản không tồn tại. Bạn có muốn tạo tài khoản mới không?'
        )
      ) {
        logIn()
      }
    }) */
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
    </div>
  );
};

export default LoginPage;
