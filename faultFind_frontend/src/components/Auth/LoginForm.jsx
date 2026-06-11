import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function LoginForm() {
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
            <input type="email" id="email" placeholder="이메일을 입력하세요" />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
          </div>

          <button type="button" className="btn-submit">로그인</button>
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