import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes, Route, Link, Outlet,  useParams, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal, Dropdown, DropdownItem, DropdownButton, Table, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faPlusMinus, faCode, faComputer, faBook, faMicrochip, faLanguage, faCommentDots, faThumbsUp, faThumbsDown, faFlag, faBucket } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import banner from './CarouselImage/dahohelping-banner.png'
import account from './icons/account.png'
import DahoHelping from './icons/DahoHelping1.png'
import khtn from './icons/khtn.webp'
import ptnk from './icons/ptnk.png'
import search from './icons/search.png'
import ussh from './icons/ussh.png'
import iu from './icons/iu.png'
import bku from './icons/bku.webp'
import uit from './icons/uit.png'
import agu from './icons/agu.png'
import bentre from './icons/bentre.png'
import thsp from './icons/thsp.png'
import pin from './icons/pin.png'
import uel from './icons/uel.png'
import khsk from './icons/khsk.png'
import nmlt from './icons/nmlt.png'
import mangxahoi from './icons/mangxahoi.jpg'
import tiengnhat from './icons/japanese.jpg'
import giaitich from './icons/giaitich.png'
import csvhvn from './icons/csvhvn.jpg'
import dlnnh from './icons/dlnnh.jpg'
import gdtc1 from './icons/gdtc1.jpg'
import lsvmtg from './icons/lsvmtg.jpg'
import ppnckh from './icons/ppnckh.jpg'
import tkckhxh from './icons/tkckhxh.png'

import bku1 from './CarouselImage/bku1.webp';
import bku2 from './CarouselImage/bku2.webp';
import bku3 from './CarouselImage/bku3.jpg';

import khtn1 from './CarouselImage/khtn1.jpg';
import khtn2 from './CarouselImage/khtn2.jpg';
import khtn3 from './CarouselImage/khtn3.jpg';

import ussh1 from './CarouselImage/ussh1.jpg';
import ussh2 from './CarouselImage/ussh2.jpg';
import ussh3 from './CarouselImage/ussh3.jpg';

import iu1 from './CarouselImage/iu1.jpg';
import iu2 from './CarouselImage/iu2.jpg';
import iu3 from './CarouselImage/iu3.jpg';

import uit1 from './CarouselImage/uit1.jpg';
import uit2 from './CarouselImage/uit2.jpg';
import uit3 from './CarouselImage/uit3.jpg';

import uel1 from './CarouselImage/uel1.jpg';
import uel2 from './CarouselImage/uel2.jpg';
import uel3 from './CarouselImage/uel3.jpg';

import agu1 from './CarouselImage/agu1.jpg';
import agu2 from './CarouselImage/agu2.jpg';
import agu3 from './CarouselImage/agu3.jpg';

import khsk1 from './CarouselImage/khsk1.jpg';
import khsk2 from './CarouselImage/khsk2.jpg';
import khsk3 from './CarouselImage/khsk3.jpg';


import Card from './Card';
import IntroductionContent from './IntroductionContent';
import WeatherComponent from './WeatherComponent';
import NotificationBoard from './NotificationBoard';
import CustomCard from './CustomCard';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage';
import DRL from './DRL.js'
import Notification from './Notification.js';
import UserPage from './UserPage.js';


 {/*Dataset Giả */}
const user = [
  {
    id: '1',
    last_name: 'Trần Thị',
    first_name: 'Hà Trâm',
    uni_id: '1',
    score: 300
  },
  {
    id: '2',
    last_name: 'Nguyễn Đình',
    first_name: 'Anh Khang',
    uni_id: '5',
    score: 400
  }
] 
const faculty = [
  {
    id: "1", name: "Khoa học máy tính"
  },
  {
    id: "2", name: "Công nghệ phần mềm"
  },
  {
    id: "3", name: "Hệ thống thông tin"
  },
  {
    id: "4", name: "Công nghệ thông tin"
  },
  {
    id: "5", name: "Mạng máy tính và truyền thông"
  },
  {
    id: "6", name: "Kỹ thuật máy tính"
  },
  {
    id: "7", name: "Khoa học và kỹ thuật thông tin"
  },
]
const dahohelping = [
  {
    id: "1", name: "Học tập"
  },
  {
    id: "2", name: "Công việc"
  },
  {
    id: "3", name: "Bạn bè"
  },
  {
    id: "4", name: "Gia đình"
  },
  {
    id: "5", name: "Tình cảm"
  },
  {
    id: "6", name: "Tâm sự"
  },
  {
    id: "7", name: "Góp ý"
  }
]
const courses = [
  {
    id: '1', name: 'Hệ quản trị cơ sở dữ liệu'
  },
  {
    id: '2', name: 'Phân tích thiết kế hệ thống thông tin'
  },
  {
    id: '3', name: 'Mạng xã hội'
  },
  {
    id: '4', name: 'Hệ hỗ trợ quyết định'
  },
  {
    id: '5', name: 'Phát triển ứng dụng trên thiết bị di động'
  },
  {
    id: '6', name: 'Quản lí dự án công nghệ thông tin'
  }
]
const major = [
  { id: '1', name: "Khoa học máy tính" },
  { id: '2', name: "Kỹ thuật phần mềm" },
  { id: '3', name: "Kỹ thuật máy tính" },
  { id: '4', name: "Hệ thống thông tin" },
  { id: '5', name: "Thương mại điện tử" },
  { id: '6', name: "Mạng máy tính và truyền thông" },
  { id: '7', name: "An toàn thông tin" },
  { id: '8', name: "Trí tuệ nhân tạo" },
  { id: '9', name: "Khoa học dữ liệu" }
]
const university = [
  {
    id: "1",
    name: "Trường Đại học Bách Khoa",
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3],
    drl: 1,
  },
  {
    id: "2",
  name: 'Trường Đại học Khoa học tự nhiên',
  icon: khtn,
  code: "khtn",
  src: [khtn1, khtn2, khtn3],
  drl: 2
},
  {
    id: "3",
    name: 'Trường Đại học Khoa học Xã hội và Nhân văn',
    icon: ussh,
    code: "ussh",
    src: [ussh1, ussh2, ussh3],
    drl: 1
  },  
  {
    id: "4",
    name: "Trường Đại học Quốc tế",
    icon: iu,
    code: "iu",
    src: [iu1, iu2, iu3],
    drl: 5
    },
    {
      id: "5",
     name: 'Trường Đại học Công nghệ thông tin',
     icon: uit,
     code: "uit",
     src: [uit1, uit2, uit3],
     drl: 3
    }, 
    {
      id: "6",
      name: 'Trường Đại học Kinh tế - Luật',
      icon: uel,
      code: "uel",
      src: [uel1, uel2, uel3],
      drl: 5
    },
    {
      id: "7",
      name: 'Trường Đại học An Giang',
      icon: agu,
      code: "agu",
      src: [agu1, agu2, agu3],
      drl: 10
    },
    {
    id: "8",
    name: 'Trường Đại học Khoa học sức khỏe',
    icon: khsk,
    code: "khsk",
    src: [khsk1, khsk2, khsk3],
    drl: 1
  },
  {
    id: "9",
    name: 'Viện Môi trường - Tài nguyên',
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3]
  },
  {
    id: "10",
    name: 'Khoa Chính trị - Hành chính',
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3]
  },
  {
    id: "11",
    name: 'Phân hiệu ĐHQG tại Bến Tre',
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3]
  },
  {
    id: "12",
    name: 'Trường Phổ thông Năng khiếu',
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3]
  },
  {
    id: "13",
    name: 'Trường Trung học Thực hành sư phạm An Giang',
    icon: bku,
    code: "bku",
    src: [bku1, bku2, bku3]
  }
]
const cards =[
  {
  id: "0",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:"20đ",
  user:"Mỹ Dung", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
}, 
{
  id: "1",
  title:"Giúp mình giải bài này với ạ mọi người ới!!! Mình cảm ơn nhiều lắm ạ.",
  award:"50đ",
  user:"Ngọc Mỹ", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
},
{
  id: "2",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:"50đ",
  user:"Trần Minh", 
  time:"1 phút trước", 
  subject:"Tiếng Nhật 1",
  uni:"USSH", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
}
]
const ranking = [
  {
    id: 1,
    name: "Trần Ngọc Minh Thi",
    uni: ptnk,
    score: "900"
},
{
  id: "2",
  name: "Phạm Hải Anh",
  uni: khtn,
  score: "800"
},

{
  id: "3",
  name: "Hà Ngọc Hân",
  uni: ussh,
  score: "720"
},

{
  id: "4",
  name: "Nguyễn Thành Đạt",
  uni: uit,
  score: "700"
},

{
  id: "5",
  name: "Lưu Bình Minh",
  uni: uel,
  score: "690"
}
]

function Rotation({userName}) {
  return (
    <div className="outer-heading" style={{fontFamily: 'sans-serif'}}>
        <WeatherComponent city={'Ho Chi Minh City'}/>
        <WeatherComponent city={'Quy Nhon'}/>
            <h1>
                Meow meow meow, {userName} trả lại <div className="inner-headings">
                    <span className="doRotate">
                    tâm trí <br/>
                    tôi đây <br/>
                    ~~ <br/>
                    </span>
                </div>
            </h1>
        </div>
  )
}

function NavBar() {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <Navbar expand="lg" className="my-navbar">
      <Navbar.Brand href="#">
        <img
          src={DahoHelping}
          alt="DahoHelping"
          width="150rem"
          height="100rem"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto mb-3 mb-lg-0">
          <Nav.Link className='active'><Link to="/trang-chu" className='link'>Trang chủ </Link></Nav.Link>
          <Nav.Link><Link to="/gioi-thieu" className='link'>Giới thiệu </Link></Nav.Link>
          <Nav.Link><Link to="/diem-ren-luyen" className='link'>Điểm rèn luyện</Link></Nav.Link>
          <NavDropdown title="Thông báo" className='link' id="basic-nav-dropdown">
           <NavDropdown.Item><Link to="/thong-bao-he-thong" className='link'>Hệ thống </Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/thong-bao-ca-nhan" className='link'>Cá nhân</Link></NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
        <Form className="d-flex" role="search">
          <FormControl
            type="search"
            placeholder="Tìm kiếm câu hỏi/yêu cầu"
            className="mr-2"
            aria-label="Search"
            style={{ width: '300px', float: 'left' }}
          />
          <Button type="submit">
            <img
              src={search}
              alt="search-icon"
              style={{ width: '20px', height: '20px' }}
            />
          </Button>
        </Form>
        <NavDropdown className="account" title={<img src={account} alt="account" style={{ width: '50px', height: '50px' }} />} id="basic-nav-dropdown">
          <NavDropdown.Item href="/dang-nhap">Đăng nhập</NavDropdown.Item>
          <NavDropdown.Item href="/dang-ki">Đăng kí</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

function Sidebar({subjects}) {
  return (
    <nav className="col-2 col-md-3 col-lg-2 d-md-block bg-light d-sm-none sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
        {subjects.map(({ key, icon, label, illust, desc }) => (
            <NavItem icon={icon} label={label} key={key} illust={illust} desc={desc} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, illust, desc }) {
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (event) => {
    const { clientX, clientY } = event;
    setCardPosition({ x: clientX + 10, y: clientY + 10 }); // Định vị card bên cạnh chuột với độ lệch 10px
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
    <li className="nav-item">
      <a className="nav-link" href="#">
        <FontAwesomeIcon icon={icon} />
        <span> {label}</span>
      </a>
    </li>
    </div>
    {isHovered && (
        <div
          className="card"
          style={{ zIndex: '1000', width: '50vh', position: 'fixed', top: cardPosition.y, left: cardPosition.x, backgroundColor: 'white', padding: '10px', border: '1px solid gray', display: 'flex' }}
        >
          <img src= {illust} alt="Subject Description" style={{ width: '200px', height: '100px' }}/>
          <span>{desc}</span>
        </div>
      )}
    </div>
  );
}

function DropDownCustom({toggle, listItems, setUni}) 
{
  const [value, setValue] = useState(toggle)

  const handleChoice = (selectedItem) => {
    setValue(selectedItem)
  }
  return (
    <DropdownButton title={value} id="dropdown-basic">
      {listItems.map((item) => (
        <Dropdown.Item key={item.id} onClick={() => {
          handleChoice(item.name)
          if (toggle === "Trường Đại học")
          setUni(item.name);
        }
        }>
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

function FilterDropdown({setUni}) {
  //let name = [uni, fac, maj, course, daho];
  //const [uni, setUni] = useState(["Trường Đại học"]);
  const [uniActived, setUniActived] = useState();
  const [fac, setFac] = useState(["Khoa"]);
  const [maj, setMaj] = useState(["Ngành"]);
  const [course, setCourse] = useState(["Môn"]);
  const [daho, setDaho] = useState(["DahoHelping"]);

  return (
    <>
    <div className="btn-group">
       <DropDownCustom toggle={daho} listItems={dahohelping} setUni={setUni}/>
       {/*Chỉ được chọn khi DahoHelping = "Học tập"*/}
      <DropDownCustom toggle={"Trường Đại học"} listItems={university} setUni={setUni}  /> 
      {/* truy xuất CSDL để lọc kép. Ví dụ: User chọn trường A thì
      truy xuất quan hệ tương ứng để lấy ra các Khoa và áp dụng vào Button Khoa */}
      <DropDownCustom toggle={fac} listItems={faculty} setUni={setUni}/>
      <DropDownCustom toggle={maj} listItems={major} setUni={setUni}/>
      <DropDownCustom toggle={course} listItems={courses} setUni={setUni}/>
     </div>
  
     </>
  );
}

function GroupCard({ cards }) {
  return (
    <>
      {cards.map((card) => (
      <Link key={card.id} to={`/tra-loi/${card.id}`} state={{ card }}>
       <Card key={card.id} {...card} />
     </Link>
      ))}
    </>
  );
}

function BulletinCard() {
  const currentDate = new Date();
  return (
    <div style={{ maxWidth: '18rem', marginBottom: '1rem', backgroundColor: '#FFEF82',  boxShadow: '5px 5px 15px rgba(0.1,0.1,0.1,0.1)', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase', fontSize: '2.5vh' }}>Note
      <h6 style={{ position: 'relative', display: 'inline', fontSize: '2.5vh', marginTop: '4px' }}>
          <time>Date: {currentDate.toLocaleDateString()}</time>
        </h6>
      </div>    
        <div>
        <p>
          <Rotation userName={"Bích Quyên"} />
        </p>
      </div>
    </div>
  );
}

function RankingTable({ranking}) {
  return (
    <Table className="table col-2 caption-top ranking-table">
      <caption style={{ textAlign: 'center' }}>BẢNG XẾP HẠNG</caption>
      <thead>
        <tr>
          <th scope="col">Vị trí</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Trường Đại học</th>
          <th scope="col">Điểm</th>
        </tr>
      </thead>
      <tbody>
      {ranking.map((user) => {
        return (
          <tr>
        <th scope="row">{user.id}</th>
         
          <td><a href='#'>{user.name}</a></td>
          <td>
            <img src={user.uni} style={{ width: '52px', height: '50px' }} alt={user.uni} />
          </td>
          <td>{user.score}</td>
          </tr>
        )}) }
        </tbody>
    </Table>
  );
}

function Footer() {
  return (
    <footer className="text-white text-center text-lg-start footer">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">DAHOHELPING</h5>
            <p>
              DahoHelping là trang web thuộc sở hữu của Đại học Quốc gia Thành phố Hồ Chí Minh. Được ra đời vào năm 2024 bởi ý tưởng của nhóm sinh viên trường Đại học Công nghệ thông tin, DahoHelping đã trở thành
              địa chỉ tin cậy để các bạn học sinh, sinh viên toàn hệ thống ĐHQG hỏi đáp, chia sẻ, giúp đỡ nhau trong học tập và cuộc sống. Với giao diện đơn giản, dễ sử dụng, chức năng phong phú và độ an toàn cao, DahoHelping không ngừng phát triển để hướng tới việc trở thành trang Forum học sinh, sinh viên tốt nhất trên toàn địa bàn thành phố Hồ Chí Minh
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Liên hệ nhóm sinh viên</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#" className="text-white">Dương Minh Mẫn</a>
              </li>
              <li>
                <a href="#!" className="text-white">Nguyễn Thành Tài</a>
              </li>
              <li>
                <a href="#!" className="text-white">Bùi Quốc Cường</a>
              </li>
              <li>
                <a href="#!" className="text-white">Phan Thị Bích Quyên</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Tài liệu</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-white">Link 1</a>
              </li>
              <li>
                <a href="#!" className="text-white">Link 2</a>
              </li>
              <li>
                <a href="#!" className="text-white">Link 3</a>
              </li>
              <li>
                <a href="#!" className="text-white">Link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:
        <a className="text-white" href="https://DahoHelping.com/">DahoHelping.com</a>
      </div>
    </footer>
  );
}

function CreateQuestionButton() {
  const handleClick = () => {

  }
  return (
    <div style={styles.button}>
      <button style={styles.button}>Tạo câu hỏi trong vài giây!</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //height: '100vh',
  },
  button: {
    position: 'relative',
    alignSelf: 'center',
    padding: '15px 30px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    backgroundColor: '#ff4500',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  }
};

const subjects_uit = {
  id: 5,
    subjects: [
    {
        key: 1,
        icon: faPlusMinus,
        label: "Giải tích",
        illust: giaitich,
        desc: "Môn Giải tích là môn học ở giai đoạn kiến thức đại cương, là môn học bắt buộc đối với tất cả sinh viên. Môn học này giúp cho SV có kiến thức cơ bản về phép tính vi phân hàm nhiều biến; phép tính tích phân hàm nhiều biến (tích phân bội); tích phân đường, tích phân mặt; cũng như là kỹ năng khảo sát chuỗi số, chuỗi hàm, tích phân suy rộng,…cùng với việc nhận dạng và giải quyết một số phương trình vi phân cấp một, cấp cao,…để từ đó SV có thể tiếp tục học tập những môn chuyên ngành, hay phục vụ cho quá trình làm khóa luận tốt nghiệp"
      },
      {
        key: 2,
        icon: faCode,
        label: "Nhập môn lập trình",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        key: 3,
        icon: faComputer,
        label: "Tổ chức và cấu trúc máy tính",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        key: 4,
        icon: faBook,
        label: "Triết học Mac Lenin",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        key: 5,
        icon: faMicrochip,
        label: "Nhập môn mạch số",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        key: 6,
        icon: faLanguage,
        label: "Tiếng Nhật 1",
        illust: tiengnhat, //illustration
        desc: "Môn học cung cấp cho sinh viên các kiến thức về tiếng Nhật sơ cấp: làm quen với hệ chữ khác hệ chữ La Tinh, ngữ pháp (ngữ pháp tiếng Nhật sơ cấp; các thì, thể của động từ; trợ từ, giới từ; lượng từ vựng tương ứng), phát âm,… các kỹ năng nghe, nói, đọc, viết sơ cấp." //description
      }]
    }; //
const subjects_ussh = {
      id: 3,
        subjects: [
        {
            key: 1,
            icon: faPlusMinus,
            label: "Thống kê cho khoa học xã hội",
            illust: tkckhxh,
            desc: "Môn Giải tích là môn học ở giai đoạn kiến thức đại cương, là môn học bắt buộc đối với tất cả sinh viên. Môn học này giúp cho SV có kiến thức cơ bản về phép tính vi phân hàm nhiều biến; phép tính tích phân hàm nhiều biến (tích phân bội); tích phân đường, tích phân mặt; cũng như là kỹ năng khảo sát chuỗi số, chuỗi hàm, tích phân suy rộng,…cùng với việc nhận dạng và giải quyết một số phương trình vi phân cấp một, cấp cao,…để từ đó SV có thể tiếp tục học tập những môn chuyên ngành, hay phục vụ cho quá trình làm khóa luận tốt nghiệp"
          },
          {
            key: 2,
            icon: faCode,
            label: "Cơ sở văn hoá Việt Nam",
            illust: csvhvn,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            key: 3,
            icon: faComputer,
            label: "Lịch sử văn minh thế giới",
            illust: lsvmtg,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            key: 4,
            icon: faBook,
            label: "Dẫn luận ngôn ngữ học",
            illust: dlnnh,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            key: 5,
            icon: faMicrochip,
            label: "Phương pháp nghiên cứu khoa học",
            illust: ppnckh,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            key: 6,
            icon: faLanguage,
            label: "Giáo dục thể chất 1",
            illust: gdtc1, //illustration
            desc: "Môn học cung cấp cho sinh viên các kiến thức về tiếng Nhật sơ cấp: làm quen với hệ chữ khác hệ chữ La Tinh, ngữ pháp (ngữ pháp tiếng Nhật sơ cấp; các thì, thể của động từ; trợ từ, giới từ; lượng từ vựng tương ứng), phát âm,… các kỹ năng nghe, nói, đọc, viết sơ cấp." //description
          }]
};
  //add thêm props vào do chưa học context
 
  function HomePage() {
    const [uni, setUni] = useState("Trường Đại học");
    const [subjects, setSubjects] = useState(subjects_uit);  

    useEffect(() => {
      if (uni === "Trường Đại học") {
        setSubjects(subjects_uit);
      } else {
        setSubjects(subjects_ussh);
      }
    }, [uni]);

    return (
      <div>
      <NavBar/>
      <Link to="/dang-ki" className='link' target='_blank'><img src={banner} alt='DahoHelpingBanner' style={{width: "100%", height: "100vh"}}/></Link>
      <div className="main">
            <Sidebar className="sidebar" subjects={subjects.subjects} />

            <div className="little-main">
            <CreateQuestionButton />
            <FilterDropdown className="filter-dropdown" setUni={setUni} />
            <GroupCard cards={cards} />
            </div>
            <div className="right">
              <BulletinCard />
              <RankingTable ranking={ranking} />
            </div>
            </div>
            <Footer />
            </div>
    )
  }

  function AnsweringPage({subjects}) {

    const { slug } = useParams();
    const card = cards.find((card) => card.id === slug);

    return (
      <div>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar" subjects={subjects.subjects}/>

            <div className="little-main">
            <CreateQuestionButton />
            <CustomCard className="CustomCard" {...card} />            
            </div>

            <div className="right">
              <BulletinCard />
              <RankingTable ranking={ranking} />
            </div>

            </div>
            </div>
    )
  }

  function IntroductionPage() {
    return (
      <div>
      <NavBar/>
      <IntroductionContent university={university} />
            </div>
    )
  }

  function NotificationPage({subjects}) {

    return (
      <div>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar" subjects={subjects.subjects} />
            <div className="little-main">
            <CreateQuestionButton />
            <NotificationBoard />
            </div>

            <div className="right">
              <BulletinCard />
              <RankingTable ranking={ranking} />
            </div>

            </div>
            </div>
    )
  }
  function DRLPage({subjects}) {
    return (
      <>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar" subjects={subjects.subjects} />
            <div className="little-main">
            <DRL user={user} university={university} />
            </div>
            <div className="right">
              <BulletinCard />
              <RankingTable ranking={ranking} />
            </div> 
            </div>       
      </>
    )
  }

function MyUserPage({subjects}) {
  return (
    <div>
    <NavBar/>
    <div className="main">
          <Sidebar className="sidebar" subjects={subjects.subjects} />
          <div className="little-main">
          <CreateQuestionButton />
          <UserPage />
          </div>
          <div className="right">
            <BulletinCard />
            <RankingTable ranking={ranking} />
          </div>
          </div>
          </div>
  )
}

function App() {
  const [uni, setUni] = useState("Trường Đại học");
    const [subjects, setSubjects] = useState(subjects_uit);  

    useEffect(() => {
      if (uni === "Trường Đại học") {
        setSubjects(subjects_uit);
      } else {
        setSubjects(subjects_ussh);
      }
    }, [uni]);

  const [clickedId, setClickedId] = useState(null);

return (
    <Routes>
        <Route path='/trang-chu' element={<HomePage/> }/>

        <Route path='/tra-loi/:slug' element={<AnsweringPage subjects={subjects}/>}/>
         
        <Route path='/gioi-thieu' element={<IntroductionPage />} />

        <Route path='/thong-bao-ca-nhan' element={<NotificationPage subjects={subjects} />} />

        <Route path='/diem-ren-luyen' element={<DRLPage subjects={subjects} />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path='/dang-ki' element={<RegisterPage />} />

        <Route path='/dang-nhap' element={<LoginPage />} />

        <Route path='/nguoi-dung' element={<MyUserPage subjects={subjects} />} />

    </Routes>
);
}

export default App;
        
