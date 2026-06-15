import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🌟 useNavigate 훅 불러오기
import axiosInstance from '../../api/axiosInstance';


export default function BoardList({ activeTab }) {
  const [posts, setPosts] = useState([]);
  
  // 🌟 컴포넌트 내부에서 navigate 함수 선언 (이 부분이 있어야 onClick에서 쓸 수 있습니다!)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/community");
        setPosts(response.data);
      } catch (error) {
        console.error('글 목록을 불러오지 못했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="board-list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>자유게시판</h3>
        {/* 🌟 나중에 글쓰기 기능이 생기면 활성화할 수 있도록 버튼 미리 배치 */}
        {/* <button onClick={() => navigate('/community/write')} className="btn-write">✍️ 글쓰기</button> */}
      </div>
      
      <table className="board-table">
        <thead>
          <tr>
            <th width="8%">번호</th>
            <th width="15%">카테고리</th>
            <th width="35%">제목</th>
            <th width="20%">사용자 이메일</th>
            <th width="12%">날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr 
                key={post.id}
                // 🌟 글(행)을 클릭하면 해당 글의 상세 페이지(/community/1 등)로 이동!
                onClick={() => navigate(`/community/${post.id}`)} 
                style={{ cursor: 'pointer' }}
                className="board-row" // 호버 효과를 주기 위한 클래스
              >
                <td>{post.id}</td>
                <td>{post.category === 'free' ? '자유게시판' : post.category}</td>
                {/* 제목 부분을 조금 더 강조 */}
                <td style={{ textAlign: 'left', fontWeight: '500' }}>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.createdAt ? post.createdAt.split('T')[0] : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              {/* 열 개수(colSpan)를 테이블에 맞게 5로 수정 */}
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                아직 등록된 게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}