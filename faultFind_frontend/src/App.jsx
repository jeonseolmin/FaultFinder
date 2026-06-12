import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import QuickServices from "./body/QuickServices.jsx";
import AiFaultRatio from "./body/AiFaultRatio.jsx";
import CommunityPage from "./pages/Community/CommunityPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Heder from "./components/Heder/Heder.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Heder />
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
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
