import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
export default function LoginForm() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


// *************
// 함수 정의 시작
// *************
const handleLogin = async () => {
  console.log("email =", email);
  console.log("password =", password);
  try {

    const result = await axios.post(
      "http://localhost:8080/faultfinder/login",
      {
        email : email,
        password : password
      }
    );

    const token = result.headers.authorization;

    console.log("token =", token);

    localStorage.setItem(
      "accessToken",
      token
    );

    navigate("/");

  } catch(error){

    console.log(error);

    alert("로그인 실패");

  }
}
// ***********
// 함수 정의 끝
// ***********

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>로그인</h2>
          <p>FaultFinder 서비스 이용을 위해 로그인해주세요.</p>
        </div>

        <form>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
            type="email"
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요" 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요" />
          </div>

          
          <button type="button" className="btn-submit" onClick={handleLogin} >로그인</button>
        </form>

        <div className="auth-links">
          <Link to="#">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
