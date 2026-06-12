import React from 'react';
// 컴포넌트 폴더에서 조립된 SignupForm만 딱 가져옵니다.
import SignupForm from '../../components/Auth/SignupForm';

export default function Signup() {
  return (
    <main className="signup-page">
      <SignupForm />
    </main>
  );
}