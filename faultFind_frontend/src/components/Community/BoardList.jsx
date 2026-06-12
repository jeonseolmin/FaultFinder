import React from 'react';

export default function BoardList({ activeTab }) {
  
  const getBoardInfo = () => {
    switch(activeTab) {
      case 'action': return { title: '사고대처 가이드', desc: '당황하지 마세요. 사고 발생 시 행동 요령을 알려드립니다.' };
      case 'type': return { title: '사고유형 분석', desc: '다양한 사고 케이스별 과실 비율 판례를 확인하세요.' };
      case 'ratio': return { title: 'AI 과실비율 조회', desc: '정황을 입력하고 AI가 판단하는 예상 과실을 확인해보세요.' };
      case 'community': return { title: '자유게시판', desc: '교통사고와 관련된 다양한 의견을 공유해주세요.' };
      default: return { title: '자유게시판', desc: '교통사고와 관련된 다양한 의견을 공유해주세요.' };
    }
  };

  const info = getBoardInfo();

  return (
    <section className="board-content">
      <div className="board-header">
        <h2>{info.title}</h2>
        <p>{info.desc}</p>
      </div>

      <div style={{ backgroundColor: '#f3f4f6', border: '2px dashed #d1d5db', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>
        현재 선택된 카테고리는 <strong>{info.title}</strong> 입니다.<br/><br/>
        나중에 이 공간에 API 데이터를 연결하거나 <br/>
        각 메뉴에 맞는 전용 컴포넌트를 렌더링하게 됩니다.
      </div>
    </section>
  );
}