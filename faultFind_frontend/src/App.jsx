import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// 🌟 여기서부터 import 들이 싹 다 있어야 리액트가 에러를 뿜지 않습니다!
import Navbar from "./components/Navbar";
import MainPage from "./pages/Main/MainPage.jsx";

import CommunityPage from "./pages/Community/CommunityPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import WritePage from "./pages/Write/WritePage.jsx";
import PostDetail from "./pages/Detail/PostDetail.jsx";
import PostEdit from "./pages/Edit/PostEdit.jsx";
import AccidentGuide from "./pages/AccidentGuide/AccidentGuide.jsx"; // 🚨 에러의 원인이었던 녀석!
import AccidentType from "./pages/AccidentType/AccidentType.jsx";
import AccidentTypeDetail from "./pages/AccidentType/AccidentTypeDetail.jsx";
import OAuthSuccess from "./components/Auth/OAuthSuccess.jsx";
import MyPage from "./pages/Mypage/MyPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashBoard.jsx";
import FaultSearch from "./pages/FaultSearch/FaultSearch.jsx";

export default function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup", "/mypage"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <Navbar />

      <Routes>
        {/* 🌟 메인 페이지! 사진과 메인 요소들은 다 저 MainPage 안에 들어있습니다. */}
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
      </Routes>
    </>
  );
}