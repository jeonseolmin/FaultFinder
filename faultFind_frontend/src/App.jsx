import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import MainPage from "./pages/Main/MainPage.jsx";

import CommunityPage from "./pages/Community/CommunityPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import WritePage from "./pages/Write/WritePage.jsx";
import PostDetail from "./pages/Detail/PostDetail.jsx";
import PostEdit from "./pages/Edit/PostEdit.jsx";
import AccidentGuide from "./pages/AccidentGuide/AccidentGuide.jsx"; 
import AccidentType from "./pages/AccidentType/AccidentType.jsx";
import AccidentTypeDetail from "./pages/AccidentType/AccidentTypeDetail.jsx";
import OAuthSuccess from "./components/Auth/OAuthSuccess.jsx";
import MyPage from "./pages/Mypage/MyPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashBoard.jsx";
import FaultSearch from "./pages/FaultSearch/FaultSearch.jsx";
import FindPassword from "./pages/FindPassword/FindPassword.jsx";

export default function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup", "/mypage", "/find-password"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    // 2. 기존의 빈 태그(<>) 대신, 전체 화면을 관리할 app-wrapper 클래스로 감쌉니다.
    <div className="app-wrapper">
      
      {/* 상단 고정 네비게이션 */}
      <Navbar />

      {/* 3. 페이지가 바뀌는 부분(Routes)을 main-content로 묶어서 공간을 쫙 밀어냅니다. */}
      <div className="main-content">
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage showHeader={showHeader} />} />

          {/* 나머지 페이지들 */}
          <Route path="/guides" element={<AccidentGuide />} />
          <Route path="/cases" element={<AccidentType />} />
          <Route path="/cases/:typeId" element={<AccidentTypeDetail />} />
          <Route path="/fault-ratios" element={<FaultSearch />} />
          <Route path="/community" element={<CommunityPage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/community/write" element={<WritePage />} />
          <Route path="/community/:id" element={<PostDetail />} />
          <Route path="/posts" element={<CommunityPage />} />
          <Route path="/community/edit/:id" element={<PostEdit />} />
          <Route path="/find-password" element={<FindPassword />} />
        </Routes>
      </div>
      
    </div>
  );
}