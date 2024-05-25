import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AuthCallback() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const authorizationCode = query.get('code');

    if (authorizationCode) {
      // Gửi mã xác thực đến server hoặc trực tiếp đến Google để lấy mã thông báo truy cập
      const getAccessToken = async () => {
        try {
          const response = await axios.post('https://oauth2.googleapis.com/token', {
            code: authorizationCode,
            client_id: '',
            client_secret: '',
            redirect_uri: '',
            grant_type: '',
          });
          const accessToken = response.data.access_token;

          // Lấy thông tin người dùng với accessToken
          const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
          const userInfo = userInfoResponse.data;

          // Xử lý thông tin người dùng
          console.log('User Info:', userInfo);
        } catch (error) {
          console.error('Failed to get access token:', error);
        }
      };

      getAccessToken();
    }
  }, [location]);

  return <div>Loading...</div>;
}

export default AuthCallback;
