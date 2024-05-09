import React, { useEffect, useState, useRef, useContext, createContext } from 'react';
import axios from 'axios';
import {Routes, Route, Link, Outlet,  useParams, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal, Dropdown, DropdownItem, DropdownButton, Table, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faPlusMinus, faCode, faComputer, faBook, faMicrochip, faLanguage, faCommentDots, faThumbsUp, faThumbsDown, faFlag, faBucket } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react'; //Thư viện TinyMCE giúp tạo ô text có định dạng
import { useDispatch} from 'react-redux';

import uni_data from './data/university.json';
import maj_data from './data/major.json';
import fal_data from './data/faculty.json';
import sub_data from './data/subject.json';
import daho_data from './data/dahohelping.json';

import { useNavigate } from 'react-router-dom';
import * as img from './images.js';

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
import tthc from './icons/tthc.jpg'
import mttn from './icons/mttn.jpg'
import bentre from './icons/bentre.png'
import thsp from './icons/thsp.png'
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

import bku1 from './CarouselImage/bku1.png'

import avatar from './icons/minhhieu.webp'
import avatar1 from './icons/dieuhuyen.jpeg'

import Card from './Card';
import IntroductionContent from './IntroductionContent';
import WeatherComponent from './WeatherComponent';
import NotificationBoard from './NotificationBoard';
import CustomCard from './CustomCard';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage';
import DRL from './DRL.js';
import Notification from './Notification.js';
import UserPage from './UserPage.js';
import CreateQuestionButton from './CreateQuestionButton.js';
import context from 'react-bootstrap/esm/AccordionContext.js';
import FilterDropdown from './FilterDropDown.js';
import { iconName } from '@fortawesome/free-brands-svg-icons/faAffiliatetheme';

 {/*Dataset Giả */}
 const user = [
  {
      user_id: 1,
      username: 'hieuthuhai',
      avatar: avatar,
      fullname: "Trần Minh Hiếu",
      uni_id: bku,
      fal_id: "Khoa học máy tính",
      maj_id: "Khoa học máy tính",
      email: "minhhieutran@gmail.com",
      hometown: "Khánh Hòa",
      score: 300,
      hobby: "Lập trình, đọc sách"
  },
  {
    user_id: 2,
    username: 'dieuhuyen098',
    avatar: avatar1,
    fullname: "Nguyễn Diệu Huyền",
    uni_id: 3, //khóa ngoại trỏ đến để lấy dữ liệu từ bảng Uni
    fal_id: "Khoa Nhật Bản học", 
    maj_id: "Ngành Nhật Bản học",
    email: "shijukukaizen@gmail.com",
    hometown: "Tuyên Quang",
    score: 450,
    hobby: "Nghe nhạc, học tiếng nhật, đọc sách"
}

]
const cards =[
  {
  card_id: "0",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:"20đ",
  user:"Mỹ Dung", 
  time:"1 phút trước", 
  sub_id:"Tiếng Nhật 1", 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children"
}, 
{
  card_id: 1,
  sub_id: 4,
  user_id: 3, 
  daho_id: 0,
  title: "Giúp mình giải bài này với ạ mọi người ới!!!", 
  award: 50,
  created_date: '1989-07-98',
  time: '', 
  text: "When you nest content inside a JSX tag, the parent component will receive that content in a prop called children",
  img: '',
  is_reported: false,
  is_answered: false
},
{
  card_id: "2",
  title:"Giúp mình giải bài này với ạ mọi người ới!!!",
  award:50,
  user_id:"Trần Minh", 
  time:"1 phút trước", 
  sub_id:"Tiếng Nhật 1",
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

const _university = [
  {
    id: "1",
    name: "Trường Đại học Bách Khoa",
    icon: bku,
    code: "bku",
    src: [img.bku1, img.bku2, img.bku3],
    drl: 1,
  },
  {
    id: "2",
  name: 'Trường Đại học Khoa học tự nhiên',
  icon: khtn,
  code: "khtn",
  src: [img.khtn1, img.khtn2, img.khtn3],
  drl: 2
},
  {
    id: "3",
    name: 'Trường Đại học Khoa học Xã hội và Nhân văn',
    icon: ussh,
    code: "ussh",
    src: [img.ussh1, img.ussh2, img.ussh3],
    drl: 1
  },  
  {
    id: "4",
    name: "Trường Đại học Quốc tế",
    icon: iu,
    code: "iu",
    src: [img.iu1, img.iu2, img.iu3],
    drl: 5
    },
    {
      id: "5",
     name: 'Trường Đại học Công nghệ thông tin',
     icon: uit,
     code: "uit",
     src: [img.uit1, img.uit2, img.uit3],
     drl: 3
    }, 
    {
      id: "6",
      name: 'Trường Đại học Kinh tế - Luật',
      icon: uel,
      code: "uel",
      src: [img.uel1, img.uel2, img.uel3],
      drl: 5
    },
    {
      id: "7",
      name: 'Trường Đại học An Giang',
      icon: agu,
      code: "agu",
      src: [img.agu1, img.agu2, img.agu3],
      drl: 10
    },
    {
    id: "8",
    name: 'Trường Đại học Khoa học sức khỏe',
    icon: khsk,
    code: "khsk",
    src: [img.khsk1, img.khsk2, img.khsk3],
    drl: 1
  },
  {
    id: "9",
    name: 'Viện Môi trường - Tài nguyên',
    icon: mttn,
    code: "mttn",
    src: [img.mttn1, img.mttn2, img.mttn3]
  },
  {
    id: "10",
    name: 'Khoa Chính trị - Hành chính',
    icon: tthc,
    code: "tthc",
    src: [img.tthc1, img.tthc2, img.tthc3]
  },
  {
    id: "11",
    name: 'Phân hiệu ĐHQG tại Bến Tre',
    icon: bentre,
    code: "bentre",
    src: [img.bentre1, img.bentre2, img.bentre3]
  },
  {
    id: "12",
    name: 'Trường Phổ thông Năng khiếu',
    icon: ptnk,
    code: "ptnk",
    src: [img.ptnk1, img.ptnk2, img.ptnk3]
  },
  {
    id: "13",
    name: 'Trường Trung học Thực hành sư phạm An Giang',
    icon: thsp,
    code: "thsp",
    src: [img.thsp1, img.thsp2, img.thsp3]
  }
]

const faculty = fal_data;
const major = maj_data;
const university = uni_data;
const dahohelping = daho_data
const subject = sub_data;

function Rotation({userName}) {
  return (
    <div className="outer-heading" style={{fontFamily: 'sans-serif'}}>
        <WeatherComponent city={'Ho Chi Minh City'}/>
        <WeatherComponent city={'Long Xuyen, VN'}/>
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

function Sidebar() {
  const {sub} = useContext(uniContext);
  return (
    <nav className="col-2 col-md-3 col-lg-2 d-md-block bg-light d-sm-none sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
        {sub.map(({ id, icon, name, illust, desc }) => (
            <NavItem icon={icon} label={name} key={id} illust={illust} desc={desc} />
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

/*
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

function FilterDropdown() {
  const {setUni} = useContext(uniContext);
  const [uniActived, setUniActived] = useState();
  const [fac, setFac] = useState(["Khoa"]);
  const [maj, setMaj] = useState(["Ngành"]);
  const [course, setCourse] = useState(["Môn"]);
  const [daho, setDaho] = useState(["DahoHelping"]);

  // Bước 1: Tạo state là trạng thái lọc
  const [filterState, setFilterState] = useState({
    DahoHelping: [],
    Others: [null, null, null, null]
  });

  // Bước 2: Gửi API về cho backend mỗi khi DahoHelping hoặc Others được cập nhật
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filterState)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //setUni(data); // Cập nhật các card với dữ liệu mới
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, [filterState]);

  // Cập nhật trạng thái lọc khi một dropdown được chọn
  const handleSelect = (dropdownName, selectedItem) => {
    setFilterState(prevState => ({
      ...prevState,
      [dropdownName]: selectedItem
    }));
  };

  return (
    <>
      <div className="btn-group">
        <DropDownCustom setUni={setUni} toggle={daho} listItems={dahohelping} onSelect={item => handleSelect('DahoHelping', item)} />
        <DropDownCustom setUni={setUni} toggle={"Trường Đại học"} listItems={university} onSelect={item => handleSelect('Others', [item, null, null, null])} />
        <DropDownCustom setUni={setUni} toggle={fac} listItems={faculty} onSelect={item => handleSelect('Others', [filterState.Others[0], item, null, null])} />
        <DropDownCustom setUni={setUni} toggle={maj} listItems={major} onSelect={item => handleSelect('Others', [filterState.Others[0], filterState.Others[1], item, null])} />
        <DropDownCustom setUni={setUni} toggle={course} listItems={courses} onSelect={item => handleSelect('Others', [filterState.Others[0], filterState.Others[1], filterState.Others[2], item])} />
      </div>
    </>
  );
} */


function GroupCard({ cards }) {
  return (
    <>
      {cards.map((card) => (
      <Link key={card.card_id} to={`/tra-loi/${card.card_id}`} state={{ card }}>
       <Card key={card.card_id} {...card} />
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

const subjects_uit = [
     {
        id: 1,
        icon: faPlusMinus,
        name: "Giải tích",
        illust: giaitich,
        desc: "Môn Giải tích là môn học ở giai đoạn kiến thức đại cương, là môn học bắt buộc đối với tất cả sinh viên. Môn học này giúp cho SV có kiến thức cơ bản về phép tính vi phân hàm nhiều biến; phép tính tích phân hàm nhiều biến (tích phân bội); tích phân đường, tích phân mặt; cũng như là kỹ năng khảo sát chuỗi số, chuỗi hàm, tích phân suy rộng,…cùng với việc nhận dạng và giải quyết một số phương trình vi phân cấp một, cấp cao,…để từ đó SV có thể tiếp tục học tập những môn chuyên ngành, hay phục vụ cho quá trình làm khóa luận tốt nghiệp"
      },
      {
        id: 2,
        icon: faCode,
        name: "Nhập môn lập trình",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        id: 3,
        icon: faComputer,
        name: "Tổ chức và cấu trúc máy tính",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        id: 4,
        icon: faBook,
        name: "Triết học Mac Lenin",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        id: 5,
        icon: faMicrochip,
        name: "Nhập môn mạch số",
        illust: nmlt,
        desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
      },
      {
        id: 6,
        icon: faLanguage,
        name: "Tiếng Nhật 1",
        illust: tiengnhat, //illustration
        desc: "Môn học cung cấp cho sinh viên các kiến thức về tiếng Nhật sơ cấp: làm quen với hệ chữ khác hệ chữ La Tinh, ngữ pháp (ngữ pháp tiếng Nhật sơ cấp; các thì, thể của động từ; trợ từ, giới từ; lượng từ vựng tương ứng), phát âm,… các kỹ năng nghe, nói, đọc, viết sơ cấp." //description
      }
    ]

const subjects_ussh = [
    {
            id: 1,
            icon: faPlusMinus,
            name: "Thống kê cho khoa học xã hội",
            illust: tkckhxh,
            desc: "Môn Giải tích là môn học ở giai đoạn kiến thức đại cương, là môn học bắt buộc đối với tất cả sinh viên. Môn học này giúp cho SV có kiến thức cơ bản về phép tính vi phân hàm nhiều biến; phép tính tích phân hàm nhiều biến (tích phân bội); tích phân đường, tích phân mặt; cũng như là kỹ năng khảo sát chuỗi số, chuỗi hàm, tích phân suy rộng,…cùng với việc nhận dạng và giải quyết một số phương trình vi phân cấp một, cấp cao,…để từ đó SV có thể tiếp tục học tập những môn chuyên ngành, hay phục vụ cho quá trình làm khóa luận tốt nghiệp"
          },
          {
            id: 2,
            icon: faCode,
            name: "Cơ sở văn hoá Việt Nam",
            illust: csvhvn,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            id: 3,
            icon: faComputer,
            name: "Lịch sử văn minh thế giới",
            illust: lsvmtg,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            id: 4,
            icon: faBook,
            name: "Dẫn luận ngôn ngữ học",
            illust: dlnnh,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            id: 5,
            icon: faMicrochip,
            name: "Phương pháp nghiên cứu khoa học",
            illust: ppnckh,
            desc: "Môn học sẽ cung cấp các kiến thức nền tảng về máy tính, tư duy và các kỹ năng căn bản lập trình cho tất cả sinh viên các ngành Công nghệ thông tin. Đối với hệ tài năng: sinh viên sẽ được trang bị các kiến thức nâng cao về tư duy và các kỹ năng lập trình thông qua một số bài toán có độ phức tạp cao."
          },
          {
            id: 6,
            icon: faLanguage,
            name: "Giáo dục thể chất 1",
            illust: gdtc1, //illustration
            desc: "Môn học cung cấp cho sinh viên các kiến thức về tiếng Nhật sơ cấp: làm quen với hệ chữ khác hệ chữ La Tinh, ngữ pháp (ngữ pháp tiếng Nhật sơ cấp; các thì, thể của động từ; trợ từ, giới từ; lượng từ vựng tương ứng), phát âm,… các kỹ năng nghe, nói, đọc, viết sơ cấp." //description
          }
        ]
  //add thêm props vào do chưa học context
 
  function HomePage() {

    const [filterData, setFilterData] = useState([]);
    const {dahoHelping, setDahoHelping, currentUser, setCurrentUser, choosenUni, setChoosenUni, choosenFal, setChoosenFal, choosenSub, setChoosenSub, fal, setFal, maj, setMaj, uni, setUni, sub, setSub} = useContext(uniContext);

    useEffect(() => {
      if (choosenUni === "Trường Đại học") {
        setSub(subjects_uit);
      } else {
        setSub(subjects_ussh);
      }
    }, [choosenUni]);

    return (
      <div>
      <NavBar/>
      <Link to="/dang-ki" className='link' target='_blank'><img src={banner} alt='DahoHelpingBanner' style={{width: "100%", height: "100vh"}}/></Link>
      <div className="main">
            <Sidebar className="sidebar" />
            <div className="little-main">
            <CreateQuestionButton />
            <FilterDropdown className="filter-dropdown" setFilterData={setFilterData}/>
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

  function AnsweringPage() {

    const { slug } = useParams();
    const card = cards.find((card) => card.card_id === slug);

    return (
      <div>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar" />

            <div className="little-main">
            <CreateQuestionButton />
            <CustomCard className="CustomCard" {...card} />            
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

  function IntroductionPage() {
    return (
      <div>
      <NavBar/>
      <IntroductionContent university={_university} />
      <Footer />   
            </div>
    )
  }

  function NotificationPage() {
    return (
      <div>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar" />
            <div className="little-main">
            <CreateQuestionButton />
            <NotificationBoard />
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
  function DRLPage() {

    return (
      <>
      <NavBar/>
      <div className="main">
            <Sidebar className="sidebar"/>
            <div className="little-main">
            <DRL user={user} university={university} />
            </div>
            <div className="right">
              <BulletinCard />
              <RankingTable ranking={ranking} />
            </div> 
            </div>    
            <Footer />   
      </>
    )
  }

function MyUserPage() {
  const { username } = useParams();
  const user_example = user.find((user) => user.username === username);
  console.log(user_example)

  return (
    <div>
    <NavBar/>
    <div className="main">
          <Sidebar className="sidebar" />
          <div className="little-main">
          <CreateQuestionButton />
          {user_example ? <UserPage user_example={user_example} /> : <p>Không tìm thấy người dùng... Quay lại <Link to="/trang-chu" className='link'>trang chủ </Link> </p>}
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

export const uniContext = createContext();
export const UniProvider = uniContext.Provider;
export const UniConsumer = uniContext.Consumer;

function App() {
  const testURL = './CarouselImage/thsp3.jpg';
  const [notisetting, setNotiSetting] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // Thêm state để kiểm soát hiển thị thông báo
  const [filterState, setFilterState] = useState({
    DahoHelping: "DahoHelping",
    Others: [null, null, null, null] //trường, ngành, khoa, môn
  })
    const [currentUser, setCurrentUser] = useState(user[0]);
    const [cards, setCards] = useState([]);
    const [dahoHelping, setDahoHelping] = useState(dahohelping);
    const [choosenUni, setChoosenUni] = useState("Trường Đại học");
    const [uni, setUni] = useState(university);
    const [fal, setFal]  = useState(faculty.filter((fal) => {
      return fal.uni_id === 3;
    }));
    const [choosenFal, setChoosenFal] = useState("Khoa");
    const [maj, setMaj] = useState(major);
    const [sub, setSub] = useState(subject);
    const [choosenSub, setChoosenSub] = useState("Môn học");

    useEffect(() => {
      if (choosenUni === "Trường Đại học") {
        setSub(subjects_uit);
      } else {
        setSub(subjects_ussh);
      }
    }, [choosenUni]);

return (
  <UniProvider value={{testURL, setNotiSetting, setShowNotification, filterState, setFilterState, dahoHelping, setDahoHelping, currentUser, setCurrentUser, choosenUni, setChoosenUni, choosenFal, setChoosenFal, choosenSub, setChoosenSub, fal, setFal, maj, setMaj, uni, setUni, sub, setSub}} >
    <Routes>
        <Route path='/trang-chu' element={<HomePage/> }/>

        <Route path='/tra-loi/:slug' element={<AnsweringPage/>}/>
         
        <Route path='/gioi-thieu' element={<IntroductionPage />} />

        <Route path='/thong-bao-ca-nhan' element={<NotificationPage />} />

        <Route path='/diem-ren-luyen' element={<DRLPage/>} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path='/dang-ki' element={<RegisterPage />} />

        <Route path='/dang-nhap' element={<LoginPage />} />

        <Route path='/nguoi-dung/:username' element={<MyUserPage />} />


    </Routes>
    </UniProvider>
);
}

export default App;
        
