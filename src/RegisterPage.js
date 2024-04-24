import React, { useState } from 'react';
import './RegisterPage.css';

const universities = [
  "Đại học Bách Khoa",
  "Đại học Khoa học tự nhiên",
  "Đại học Khoa học xã hội và Nhân văn",
  "Đại học Quốc Tế"
];

const faculty = [
  "Khoa Công nghệ thông tin",
  "Khoa Vật lý",
  "Khoa Hóa học",
  // Thêm các khoa khác tương ứng
];

const majors = [
  "Ngành Kỹ thuật máy tính",
  "Ngành Vật lý học",
  "Ngành Hóa học",
  // Thêm các ngành khác tương ứng
];

const hobbies = [
  "Đọc sách",
  "Lập trình",
  "Thể thao",
  // Thêm sở thích khác
];

const hometown = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
  "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng",
  "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
  "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An",
  "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam",
  "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
  "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên", "Cần Thơ", "Đà Nẵng", "Hải Phòng",
  "Hà Nội", "TP HCM"
];


const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    hometown: '',
    university: '',
    faculty: '',
    major: '',
    hobbies: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic để kiểm tra username và password
    console.log(userDetails);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="lastName" id='lastName' placeholder="Họ" onChange={handleChange} />
        <input type="text" name="firstName" placeholder="Tên" onChange={handleChange} />
        <input type="text" name="username" placeholder="Tên tài khoản" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <select name="hometown" onChange={handleChange}>
          {hometown.map(home => <option key={home} value={home}>{home}</option>)}
        </select>
        <select name="university" onChange={handleChange}>
          {universities.map(uni => <option key={uni} value={uni}>{uni}</option>)}
        </select>
        <select name="faculty" onChange={handleChange}>
          {faculty.map(fac => <option key={fac} value={fac}>{fac}</option>)}
        </select>
        <select name="major" onChange={handleChange}>
          {majors.map(maj => <option key={maj} value={maj}>{maj}</option>)}
        </select>
        <select name="hobbies" onChange={handleChange}>
          {hobbies.map(hobby => <option key={hobby} value={hobby}>{hobby}</option>)}
        </select>
        <textarea name="bio" placeholder="Giới thiệu bản thân" onChange={handleChange}></textarea>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default RegisterPage;
