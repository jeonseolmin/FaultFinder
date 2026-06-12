import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuickServices from './body/QuickServices.jsx';
import AiFaultRatio from './body/AiFaultRatio.jsx';
import PopularPostAndBest5 from './body/PopularPostAndBest5.jsx';
import Heder from './components/Heder/Heder.jsx';
// 메인 App 조합
export default function App() {
  return (
   <>
    <Navbar/>
    <Heder/>
    <QuickServices/>
    <AiFaultRatio/>
    <PopularPostAndBest5/>
   </>
  );
}
