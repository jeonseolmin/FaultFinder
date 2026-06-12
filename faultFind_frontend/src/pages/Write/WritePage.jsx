import React from 'react';
import WriteForm from '../../components/Write/WriteForm';

export default function WritePage() {
  return (
    // 배경을 살짝 회색으로 깔아서 하얀색 글쓰기 카드가 돋보이게 합니다
    <main className="write-page" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 70px)', padding: '20px' }}>
      <WriteForm />
    </main>
  );
}