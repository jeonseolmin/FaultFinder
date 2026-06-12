import React from 'react';
import './PopularPostAndBest5.css';

function PopularPostAndBest5() {
  const latestPosts = [
    { id: 1, tag: '자유', tagBg: '#E6F0FF', tagColor: '#0052CC', title: '사고 처리 어떻게 해야 하나요?', date: '10:30' },
    { id: 2, tag: '후기', tagBg: '#EBF5FF', tagColor: '#1E40AF', title: '합의금 적정한가요?', date: '09:15' },
    { id: 3, tag: 'Q&A', tagBg: '#F3E8FF', tagColor: '#6B21A8', title: '보험사 보상 거절 대응 방법', date: '05.20' },
    { id: 4, tag: '자유', tagBg: '#E6F0FF', tagColor: '#0052CC', title: '블랙박스 영상 첨부 방법 알려주세요', date: '05.19' },
    { id: 5, tag: '후기', tagBg: '#EBF5FF', tagColor: '#1E40AF', title: '주차장 접촉사고 과실 비율 문의', date: '05.18' },
  ];

  const topAccidents = [
    { id: 1, rank: 1, title: '신호 없는 교차로 사고', type: '차대차' },
    { id: 2, rank: 2, title: '차선 변경 사고', type: '차대차' },
    { id: 3, rank: 3, title: '주차장 접촉사고', type: '차대차' },
    { id: 4, rank: 4, title: '후진 사고', type: '차대차' },
    { id: 5, rank: 5, title: '보행자 사고', type: '차대보행자' },
  ];

  return (
    <div className="container">
      {/* 커뮤니티 인기글 */}
      <div className="section">
        <div className="header">
          <h2 className="title">커뮤니티 인기글 </h2>
          <button className="moreBtn">더보기 <span className="moreBtn-arrow">❯</span>
          </button>
        </div>
        <ul className="list">
          {latestPosts.map((post) => (
            <li key={post.id} className="listItem">
              <div className="leftContent">
                <span className="tag" 
                style={{ backgroundColor: post.tagBg, color: post.tagColor }}>
                  {post.tag}
                </span>
                <span className="postTitle">{post.title}</span>
              </div>
              <span className="date">{post.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 인기 사고사례 TOP 5 */}
      <div className="section">
        <div className="header">
          <div className="header-icon-wrapper">
            <h2 className="title">인기 사고사례 TOP 5</h2>
            <span className="trophy-icon">🏆</span>
          </div>
        </div>
        <ul className="list">
          {topAccidents.map((accident) => (
            <li key={accident.id} className="listItem">
              <div className="leftContent">
                <span className="rank" style={{
                  backgroundColor: accident.rank <= 3 ? '#0052CC' : '#4A90E2'
                }}>
                  {accident.rank}
                </span>
                <span className="postTitle">{accident.title}</span>
              </div>
              <span className="typeTag">{accident.type}</span>
            </li>
          ))}
        </ul>
      </div>

      
      {/* 인기 사고사례 TOP 5 */}
      <div className="section">
        <div className="header">
          <div className="header-icon-wrapper">
            <h2 className="title">인기 사고사례 TOP 5</h2>
            <span className="trophy-icon">🏆</span>
          </div>
        </div>
        <ul className="list">
          {topAccidents.map((accident) => (
            <li key={accident.id} className="listItem">
              <div className="leftContent">
                <span className="rank" style={{
                  backgroundColor: accident.rank <= 3 ? '#0052CC' : '#4A90E2'
                }}>
                  {accident.rank}
                </span>
                <span className="postTitle">{accident.title}</span>
              </div>
              <span className="typeTag">{accident.type}</span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default PopularPostAndBest5;