import React, { useState, useEffect } from 'react';
import './NotificationBoard.css'; // Import CSS từ file NotificationBoard.css
import del from './icons/delete.png'

const NotificationBoard = () => {
    const [notifications, setNotifications] = useState([
        { title: 'Thông báo 1', message: 'Đây là thông báo số 1', src: 'Hệ thống'},
        { title: 'Thông báo 2', message: 'Đây là thông báo số 2', src: 'Hệ thống' },
        { title: 'Thông báo 3', message: 'Đây là thông báo số 3', src: 'meocondethuong' },
        { title: 'Thông báo 4', message: 'Đây là thông báo số 4', src: 'meocondethuong'},
        { title: 'Thông báo 5', message: 'Đây là thông báo số 5', src: 'Hệ thống' },
        
    ]);
    

    return (
        <div className="notification-board">
            <h2>Bảng Thông Báo</h2>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>
                            <div style={{display: 'flex', justifyContent: 'space-between'} }>
                            <h3>{notification.title}</h3>
                            <h5>{notification.src}</h5>
                            <img src={del} style={{width: '20px', height: '20px'}}/>
                            </div>
                            <p>{notification.message}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có thông báo mới.</p>
            )}
        </div>
    );
};

export default NotificationBoard;
