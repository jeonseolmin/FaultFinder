import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import bgImage from "../../../images/header-bg.png";

function Header() {
  return (
    <div className="header">
      <h2> 헤더입니다.</h2>
    </div>
  );
}

export default Header;