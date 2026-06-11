import React from 'react';
// BrowserRouter는 여기서 지우고 Routes와 Route만 가져옵니다.
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import QuickServices from './body/QuickServices.jsx';
import AiFaultRatio from './body/AiFaultRatio.jsx';
import CommunityPage from "./pages/Community/CommunityPage.jsx";

export default function App() {
  return (
    // <BrowserRouter> 태그를 없애고 빈 태그(Fragment)로 묶어줍니다.
    <>
      <Navbar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <main>
              <QuickServices />
              <AiFaultRatio />
            </main>
          } 
        />
        <Route 
          path="/community" 
          element={<CommunityPage />} 
        />
      </Routes>
    </>
  );
}