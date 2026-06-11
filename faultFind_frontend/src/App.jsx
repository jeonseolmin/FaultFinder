import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuickServices from './body/QuickServices.jsx';
import AiFaultRatio from './body/AiFaultRatio.jsx';
// 메인 App 조합
export default function App() {
  return (
   <>
    <Navbar/>
    <main>
      <QuickServices/>
      <AiFaultRatio/>
    </main>
   </>
  );
}
