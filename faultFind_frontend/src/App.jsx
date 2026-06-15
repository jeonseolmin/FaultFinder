import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import CommunityPage from "./pages/Community/CommunityPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import WritePage from "./pages/Write/WritePage.jsx";
import PostDetail from "./pages/Detail/PostDetail.jsx";
import PostEdit from "./pages/Edit/PostEdit.jsx";
import AccidentGuide from "./pages/AccidentGuide/AccidentGuide.jsx";
import PopularPostAndBest5 from "./components/Body_PopularPostAndBest5/PopularPostAndBest5.jsx";
import Header from "./components/Header/Header.jsx";
import QuickServices from "./components/Body_QuickServices/QuickServices.jsx";
import AiFaultRatio from "./components/Body_AiFaultRatio/AiFaultRatio.jsx";
import AccidentType from "./pages/AccidentType/AccidentType.jsx";
import AccidentTypeDetail from "./pages/AccidentType/AccidentTypeDetail.jsx";

export default function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup", "/mypage"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      {showHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <QuickServices />
              <AiFaultRatio />
              <PopularPostAndBest5 />
            </main>
          }
        />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/guides" element={<AccidentGuide />} />
        <Route path="/cases" element={<AccidentType />} />
        <Route path="/cases/:typeId" element={<AccidentTypeDetail />} />
        <Route path="/fault-ratios" element={<CommunityPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/community/write" element={<WritePage />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/community/edit/:id" element={<PostEdit />} />
      </Routes>
    </>
  );
}
