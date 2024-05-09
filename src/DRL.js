import React, { useState } from 'react';
import './DRL.css';
import Notification from './Notification.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ModalDialog } from 'react-bootstrap';

const DRL = ({ user, university }) => {
  const [drl, setDrl] = useState(0);
  const [exchangeScore, setExchangeScore] = useState();
  const [notisetting, setNotiSetting] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // Thêm state để kiểm soát hiển thị thông báo

  const thisUser = user[1];
  const uni_drl = university.find(uni => uni.id === thisUser.uni_id).drl;
  const newDrl = Math.floor(exchangeScore / 10) * uni_drl;
  const navigate = useNavigate();


const checkJWT = async () => {
      const token = localStorage.getItem('jwtToken');
    
      if (!token) {
        // Nếu không có JWT, chuyển hướng người dùng đến trang đăng nhập
        return false;
      } else {
      try {
        // Gửi yêu cầu đến backend để xác thực token và lấy thông tin người dùng
        const response = await axios.post('your_backend_api_url/verifyToken', { token });
        if (response.status === 200) {
           // Token hợp lệ, bạn có thể lấy thông tin người dùng từ response.data và lưu trữ trong state
           const userData = response.data;
          // Ví dụ: setUser(userData);
          return true;
        } else {
           // Token không hợp lệ, chuyển hướng người dùng đến trang đăng nhập
           return false;
        }
       } catch (error) {
         console.error('Lỗi khi xác thực token:', error);
         // Xử lý lỗi khi xác thực token, có thể chuyển hướng người dùng đến trang đăng nhập
         return false;
       }
     }
    };

  

  const handleInputChange = e => {
    setExchangeScore(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (exchangeScore <= thisUser.score) {
      if (exchangeScore % 10 !== 0) {
        setNotiSetting(true);
        setShowNotification({ message: 'Hãy nhập điểm quy đổi là điểm tròn', type: 'error' });
      } else {
        try {
          const response = await axios.post('your_backend_api_url/updateScore', {
            user_id: thisUser.user_id,
            new_score: thisUser.score - exchangeScore,
          });
          if (response.status === 200) {
            setDrl(newDrl);
            setNotiSetting(true);
            setShowNotification({ message: 'Bạn đã quy đổi sang điểm rèn luyện thành công!', type: 'success' });
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật điểm:', error);
          setNotiSetting(true);
          setShowNotification({ message: 'Có lỗi xảy ra khi cập nhật điểm!', type: 'error' });
        }
      }
    } else {
      setNotiSetting(true);
      setShowNotification({ message: 'Hãy nhập điểm quy đổi bé hơn hoặc bằng điểm hiện có', type: 'error' });
    }
  };

  return (
    checkJWT() === true ? (
      <>
      <h1 className="drl-title">QUY ĐỔI ĐIỂM RÈN LUYỆN</h1>
      <p>
        DahoHelping liên kết với các <Link to="/gioi-thieu" target='_blank'> trường Đại học và THPT </Link> trong Hệ thống Đại học
        Quốc Gia Tp Hồ Chí Minh để thực hiện quy đôi điểm cho những sinh viên năng nổ hoạt động và tích lũy được nhiều
        điểm hệ thống. Tùy thuộc vào mỗi trường sẽ có quy định mức điểm được chuyển đổi sang điểm rèn luyện:
      </p>
      <table className="bangquydoi">
        <thead aria-colspan={2}> BẢNG QUY ĐỔI </thead>
        <tbody>
          <tr>
            <th>Mức điểm DahoHelping</th>
            <th>Mức điểm rèn luyện</th>
          </tr>
          <tr>
            <td> 10 </td>
            <td> {uni_drl} </td>
          </tr>
        </tbody>
        <tfoot>
          <td>
            <form>
              <input type="text" placeholder="Nhập vào số điểm" onChange={handleInputChange} />
              <p className="resultBehaviourScore"> Quy đổi thành công {drl === 0 ? "..." : drl} điểm rèn luyện </p>
              <button id="submit" type="submit" onClick={handleSubmit}>
                {" "}
                Quy đổi{" "}
              </button>
            </form>
            {/* Hiển thị thông báo nếu showNotification là true */}
            {
  showNotification === true && (
    <Notification
      message={notisetting.message}
      type={notisetting.type}
      onClose={() => setShowNotification(false)} // Đặt setShowNotification(false) khi thông báo được đóng
    />
  )
}
          </td>
        </tfoot>
      </table>
      {
  showNotification === true && (
    <Notification
      message={notisetting.message}
      type={notisetting.type}
      onClose={() => setShowNotification(false)} // Đặt setShowNotification(false) khi thông báo được đóng
    />
  )
}
    </>
    ): (
      <h1 style={{marginLeft: '10px'}}> Xin bạn hãy <Link to={'/dang-nhap'}> đăng nhập </Link> trước khi sử dụng chức năng Quy đổi điểm rèn luyện.
      Nếu chưa có tài khoản, hãy <Link to={'/dang-ki'}>đăng kí</Link> ngay!
       </h1>
    )
  );
      
};

export default DRL;
