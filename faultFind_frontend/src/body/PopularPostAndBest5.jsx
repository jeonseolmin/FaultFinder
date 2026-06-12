import React from 'react';

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
    <div style={styles.container}>
      {/* 커뮤니티 최신글 */}
      <div style={styles.section}>
        <div style={styles.header}>
          <h2 style={styles.title}>커뮤니티 최신글</h2>
          <button style={styles.moreBtn}>더보기 <span style={{fontSize:'10px'}}>❯</span></button>
        </div>
        <ul style={styles.list}>
          {latestPosts.map((post) => (
            <li key={post.id} style={styles.listItem}>
              <div style={styles.leftContent}>
                <span style={{...styles.tag, backgroundColor: post.tagBg, color: post.tagColor}}>
                  {post.tag}
                </span>
                <span style={styles.postTitle}>{post.title}</span>
              </div>
              <span style={styles.date}>{post.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 인기 사고사례 TOP 5 */}
      <div style={styles.section}>
        <div style={styles.header}>
          <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
            <h2 style={styles.title}>인기 사고사례 TOP 5</h2>
            <span style={{color: '#0052CC'}}>🏆</span>
          </div>
          <button style={styles.moreBtn}>더보기 <span style={{fontSize:'10px'}}>❯</span></button>
        </div>
        <ul style={styles.list}>
          {topAccidents.map((accident) => (
            <li key={accident.id} style={styles.listItem}>
              <div style={styles.leftContent}>
                <span style={{
                  ...styles.rank, 
                  backgroundColor: accident.rank <= 3 ? '#0052CC' : '#4A90E2'
                }}>
                  {accident.rank}
                </span>
                <span style={styles.postTitle}>{accident.title}</span>
              </div>
              <span style={styles.typeTag}>{accident.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '24px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  section: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  header: {
    display: 'flex',
    justifyContent: 'between',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    borderBottom: '1px solid #f5f5f5',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: 0,
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    color: '#999999',
    fontSize: '12px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f9f9f9',
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0, 
  },
  tag: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  postTitle: {
    fontSize: '14px',
    color: '#333333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: {
    fontSize: '13px',
    color: '#999999',
    marginLeft: '8px',
  },
  rank: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeTag: {
    fontSize: '12px',
    color: '#666666',
    backgroundColor: '#f5f5f5',
    padding: '2px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
    whiteSpace: 'nowrap',
  }
};

export default PopularPostAndBest5;