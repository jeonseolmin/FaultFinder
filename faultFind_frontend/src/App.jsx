import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Layout/Navbar/Navbar.jsx";
import MainPage from "./pages/Main/MainPage.jsx";

import CommunityPage from './pages/Community/CommunityPage.jsx';
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignupPage from "./pages/Auth/SignupPage.jsx";
import CommunityWritePage from "./pages/Community/CommunityWritePage.jsx";
import CommunityDetailPage from './pages/Community/CommunityDetailPage.jsx';
import CommunityEditPage from './pages/Community/CommunityEditPage.jsx';
import AccidentGuidePage from "./pages/AccidentGuide/AccidentGuidePage.jsx";
import AccidentTypePage from "./pages/AccidentType/AccidentTypePage.jsx";
import AccidentTypeDetailPage from "./pages/AccidentType/AccidentTypeDetailPage.jsx";
import OAuthSuccess from "./components/Auth/OAuthSuccess.jsx";
import MyPage from "./pages/Mypage/MyPage";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import FaultSearchPage from "./pages/FaultSearch/FaultSearchPage.jsx";
import FindPasswordPage from "./pages/Auth/FindPasswordPage.jsx";
import FreeBoard from "./pages/Community/FreeBoard";
import QnaBoard from "./pages/Community/QnaBoard";
import ReviewBoard from "./pages/Community/ReviewBoard";
import CommunityBoard from './components/Community/CommunityBoard';

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
          <Route path="/guides" element={<AccidentGuidePage />} />
          <Route path="/cases" element={<AccidentTypePage />} />
          <Route path="/cases/:typeId" element={<AccidentTypeDetailPage />} />
          <Route path="/fault-ratios" element={<FaultSearchPage />} />
          <Route path="/community" element={<CommunityBoard />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="/community/write" element={<CommunityWritePage />} />
          <Route path="/community/:id" element={<CommunityDetailPage />} />
          <Route path="/posts" element={<CommunityPage />} />
          <Route path="/community/edit/:id" element={<CommunityEditPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/community/free" element={<FreeBoard />} />
          <Route path="/community/qna" element={<QnaBoard />} />
          <Route path="/community/reviews" element={<ReviewBoard />} />
          <Route path="/community" element={<CommunityBoard />} />
        </Routes>
      </div>
    </div>
  );
}
