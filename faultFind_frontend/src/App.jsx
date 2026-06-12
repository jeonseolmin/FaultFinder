import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import QuickServices from './body/QuickServices.jsx';
import AiFaultRatio from './body/AiFaultRatio.jsx';
import CommunityPage from './pages/Community/CommunityPage.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import WritePage from './pages/Write/WritePage.jsx';
import PostDetail from './pages/Detail/PostDetail.jsx';
import PostEdit from './pages/Edit/PostEdit.jsx';
import AccidentGuide from './pages/AccidentGuide/AccidentGuide.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<main><QuickServices /><AiFaultRatio /></main>} />
        
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/accidentguide" element={<AccidentGuide />} />
        <Route path="/accidentcase" element={<CommunityPage />} />
        <Route path="/faultsearch" element={<CommunityPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/write" element={<WritePage />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/community/edit/:id" element={<PostEdit />} />
      </Routes>
    </>
  );
}