import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CommunityPage from './pages/Community/CommunityPage.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import WritePage from './pages/Write/WritePage.jsx';
import PostDetail from './pages/Detail/PostDetail.jsx';
import PostEdit from './pages/Edit/PostEdit.jsx';
import AccidentGuide from './pages/AccidentGuide/AccidentGuide.jsx';
import PopularPostAndBest5 from './body/PopularPostAndBest5.jsx';
import Heder from './components/Heder/Heder.jsx';
import QuickServices from './body/QuickServices.jsx';
import AiFaultRatio from './body/AiFaultRatio.jsx';



export default function App() {
  return (
    <>
      <Navbar/>
      <Heder/>
      <Routes>
        <Route path="/" element={<main><QuickServices /><AiFaultRatio /><PopularPostAndBest5/></main>} />
        
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/guides" element={<AccidentGuide />} />
        <Route path="/cases" element={<CommunityPage />} />
        <Route path="/fault-ratios" element={<CommunityPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/community/write" element={<WritePage />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/community/:id/edit" element={<PostEdit />} />
      </Routes>
    </>
  );
}
