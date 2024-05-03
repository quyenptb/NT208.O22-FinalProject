import React, { useState } from 'react';
import './DRL.css';
import Notification from './Notification.js';
import { Link } from 'react-router-dom';

const DRL = ({ user, university }) => {
  const [drl, setDrl] = useState(0);
  const [exchangeScore, setExchangeScore] = useState();
  const [notisetting, setNotiSetting] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // Thêm state để kiểm soát hiển thị thông báo

  const thisUser = user[0];
  const uni_drl = university.find(uni => uni.id === thisUser.uni_id).drl;
  const newDrl = Math.floor(exchangeScore / 10) * uni_drl;

  const handleInputChange = e => {
    setExchangeScore(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (exchangeScore <= thisUser.score) {
      if (exchangeScore % 10 !== 0) {
        setShowNotification(true);
        setNotiSetting({message: 'Hãy nhập điểm quy đổi là điểm tròn', type: "error"})
    } else {
        setDrl(newDrl);
        thisUser.score -= exchangeScore;
        //setShowNotificationSuccess(true);
        setShowNotification(true);
        setNotiSetting({message: 'Bạn đã quy đổi sang điểm rèn luyện thành công!', type: "success"})
      }
    } else {
        setShowNotification(true);
        setNotiSetting({message: 'Hãy nhập điểm quy đổi bé hơn hoặc bằng điểm hiện có', type: "error"})
    }
  };

  return (
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
    </>
  );
};

export default DRL;
