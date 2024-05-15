import { createContext, useState, useEffect } from 'react';
import { React, useContext,Routes, Route, Link, 
  useParams, BrowserRouter as Router, Navbar, Nav, NavDropdown, Form, FormControl, 
  Button, Table, FontAwesomeIcon, faPlusMinus, faCode, faComputer, faBook, faMicrochip, faLanguage}
  from 'src/utils/import.js';

import banner from 'src/assets/CarouselImage/dahohelping-banner.png'

import { Carousel, CreateQuestionButton, CustomCard, DRL, FilterDropdown, Footer, GroupCards, IntroductionContent, NavBar, Notification, NotificationBoard, RankingTable, ReportModal, Sidebar, UserInfo, UserNote, WeatherComponent } from '../../components/index.js';

import { AppContext, AppProvider } from 'src/context/AppContext.js';


export default function HomePage() {
  const {
        ranking,
        setRanking,
        subjects_uit,
        subjects_target, 
        notisetting,
        setNotiSetting, //nội dung thông báo
        showNotification, //hiển thị thông báo
        setShowNotification, //gán giá trị hiển thị thông báo
        filterState, //lọc trường, khoa, ngành, môn
        setFilterState, //gán lọc trường, khoa, ngành, môn
        currentUser, //user hiện tại (principal)
        setCurrentUser, //gán user hiện tại
        //cards, //danh sách thẻ cho các component cần dùng
        setCards, //gán danh sách thẻ
        card, //thẻ được chọn
        setCard, //gán danh sách thẻ
        dahoHelping, //lọc dahohelping
        setDahoHelping, //gán lọc dahohelping
        choosenUni, //trường được chọn
        setChoosenUni, //gán trường trường được chọn
        uni, //danh sách trường
        setUni, //gán danh sách trường
        fal, //danh sách khoa
        setFal, //gán danh sách khoa
        choosenFal, //khoa được chọn
        setChoosenFal, //gán khoa được chọn
        maj, //danh sách ngành
        setMaj, //gán danh sách ngành
        sub, //danh sách môn học
        setSub, //gán danh sách môn học
        choosenSub, //môn học được chọn
        setChoosenSub, //gán môn học được chọn
        choosenMaj, //ngành được chọn
        setChoosenMaj //gán ngành được chọn
      } = useContext(AppContext);

  useEffect(() => {
    if (choosenUni === "Trường Đại học") {
      setSub(subjects_uit);
    } else {
      setSub(subjects_target);
    }
  }, [choosenUni]);

  return (
    <div>
      <NavBar />
      <Link to="/sign-in" className="link" target="_blank">
        <img
          src={banner}
          alt="DahoHelpingBanner"
          style={{ width: "100%", height: "100vh" }}
        />
      </Link>
      <div className="main">
        <Sidebar className="sidebar" />
        <div className="little-main">
          <CreateQuestionButton />
          <FilterDropdown
            className="filter-dropdown"
          />
          <GroupCards />
        </div>
        <div className="right">
          <UserNote />
          <RankingTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}
