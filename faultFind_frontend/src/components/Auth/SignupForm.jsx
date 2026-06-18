import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axiosInstance from '../../api/axiosInstance';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // *************
  // 함수 정의 시작
  // *************
  const handleSignup = async (e) => {
    e.preventDefault(); // 폼 전송 시 새로고침 방지

    // 1. 빈칸 검사
    if (!userName || !email || !password || !passwordConfirm) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 2. 비밀번호 일치 검사
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 3. 백엔드 주소로 통신 (닉네임 제외)
      await axiosInstance.post("/api/auth/signup", {
        email: email,
        password: password,
        userName: userName
      });

      // 4. 가입 성공 처리 (토큰 저장은 뺌)
      alert("회원가입이 완료되었습니다! 로그인해 주세요.");
      navigate("/login");

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        // 백엔드에서 날아온 "이미 사용 중인 이메일입니다." 띄워주기
        alert(error.response.data); 
      } else {
        alert("회원가입 실패. 다시 시도해 주세요.");
      }
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

        {/* 🌟 button onClick 대신 form onSubmit으로 연결하면 엔터키로도 가입이 됩니다. */}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="userName">이름</label>
            <input 
              type="text" 
              id="userName" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="실명을 입력하세요" 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="사용할 이메일을 입력하세요" 
            />
          </div>

          {/* 닉네임 입력란 삭제 */}
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요 (4자 이상)" 
            />
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input 
              type="password" 
              id="passwordConfirm" 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)} // 🌟 상태값 연결
              placeholder="비밀번호를 다시 입력하세요" 
            />
          </div>

          {/* 오타 났던 className 수정 및 type을 submit으로 변경 */}
          <button type="submit" className="btn-submit">가입하기</button>
        </form>

        <div className="auth-links">
          이미 계정이 있으신가요? <Link to="/login" style={{color: '#1a56db', fontWeight: 'bold'}}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}