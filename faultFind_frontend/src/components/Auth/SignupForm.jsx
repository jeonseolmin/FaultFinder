import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Auth.css';
import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

// *************
// 함수 정의 시작
// *************
const handleSignup = async () => {
  try {
    console.log("userName =", userName);
    console.log("email =", email);
    console.log("password =", password);
    console.log("nickname =", nickname);
    const result = await axios.post(
      "http://localhost:8080/faultfinder/signup",
      {
        email : email,
        password : password,
        userName : userName,
        nickname : nickname
      }
    );
    const token = result.headers.authorization;

    localStorage.setItem(
      "accessToken",
      token
    );

    navigate("/login");

  } catch (error) {
    console.log(error);

    alert("회원가입 실패");
  }
}

// ***********
// 함수 정의 끝
// ***********
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>회원가입</h2>
          <p>정보를 입력하고 간편하게 가입하세요.</p>
        </div>

        <form>
          <div className="input-group">
            <label htmlFor="userName">이름</label>
            <input 
            type="text" 
            id="userName" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="실명을 입력하세요" />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="사용할 이메일을 입력하세요" />
          </div>

            <div className="input-group">
              <label htmlFor="nickname">닉네임</label>
              <input 
              type="test" 
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)} 
              placeholder="사용할 닉네임을 입력하세요" />
            </div>
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요 (8자 이상)" />
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input 
            type="password" 
            id="passwordConfirm" 
            placeholder="비밀번호를 다시 입력하세요" />
          </div>

          <button type="button" className="btn-submit "className="btn-submit" onClick={handleSignup}>가입하기</button>
        </form>

        <div className="auth-links">
          이미 계정이 있으신가요? <Link to="/login" style={{color: '#1a56db', fontWeight: 'bold'}}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}