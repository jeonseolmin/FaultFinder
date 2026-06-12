import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function SignupForm() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>회원가입</h2>
          <p>정보를 입력하고 간편하게 가입하세요.</p>
        </div>

        <form>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" placeholder="실명을 입력하세요" />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="사용할 이메일을 입력하세요" />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력하세요 (8자 이상)" />
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input type="password" id="passwordConfirm" placeholder="비밀번호를 다시 입력하세요" />
          </div>

          <button type="button" className="btn-submit">가입하기</button>
        </form>

        <div className="auth-links">
          이미 계정이 있으신가요? <Link to="/login" style={{color: '#1a56db', fontWeight: 'bold'}}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}