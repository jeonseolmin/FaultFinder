import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function BoardList({ activeTab }) {
  const [posts, setPosts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/community");
        setPosts(response.data);
        console.log("불러온 게시글 데이터:", response.data);
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
        {/* <button onClick={() => navigate('/community/write')} className="btn-write">✍️ 글쓰기</button> */}
      </div>
      
      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: '8%', minWidth: '50px', textAlign: 'center', whiteSpace: 'nowrap' }}>No</th>
            <th style={{ width: '10%', minWidth: '80px', textAlign: 'center', whiteSpace: 'nowrap' }}>카테고리</th>
            <th style={{ width: '37%', textAlign: 'center' }}>제목</th>
            <th style={{ width: '9%', minWidth: '80px', textAlign: 'center' }}>게시자</th>
            <th style={{ width: '21%', minWidth: '100px', textAlign: 'center', whiteSpace: 'nowrap' }}>날짜</th>
            <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>조회수</th>
            <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>댓글</th>
            <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => {
              // 🌟 백엔드 세팅에 따라 isNotice 또는 notice로 넘어올 수 있으므로 둘 다 확인합니다.
              const isNoticePost = post.isNotice || post.notice;

              const categoryLabels = {
                free: '자유게시판',
                review: '사고후기',
                qna: 'Q&A'
              };
              
              return (
                <tr 
                  key={post.id}
                  onClick={() => navigate(`/community/${post.id}`)} 
                  className="board-row" 
                  style={{ 
                    cursor: 'pointer',
                    // 🌟 공지사항일 경우 배경색을 아주 연한 파란색으로 칠해 강조합니다.
                    backgroundColor: isNoticePost ? '#eff6ff' : 'transparent' 
                  }}
                >


                  <td style={{ textAlign: 'center' }}>
                    {/* 🌟 공지사항이면 글 번호 대신 '공지' 뱃지를 보여줍니다. */}
                    {isNoticePost ? (
                      <span style={{ backgroundColor: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold' }}>
                        공지
                      </span>
                    ) : (
                      post.id
                    )}
                  </td>
                  <td>{categoryLabels[post.category] || post.category}</td>
                  
                  {/* 🌟 공지사항이면 제목을 더 굵고 진한 색으로 표시합니다. */}
                  <td style={{ textAlign: 'left', fontWeight: isNoticePost ? '700' : '500', color: isNoticePost ? '#1e3a8a' : 'inherit' }}>
                    {post.title}
                  </td>
                  
                  {/* 기존 컬럼들 100% 보존 */}
                  <td style={{ textAlign: 'center' }}>{post.author}</td>
                  <td style={{ textAlign: 'center' }}>{post.createdDate ? post.createdDate.split('T')[0] : (post.createdAt ? post.createdAt.split('T')[0] : '')}</td>
                  <td style={{ textAlign: 'center' }}>{post.viewCount || 0}</td>
                  <td style={{ textAlign: 'center' }}>{post.commentCount || 0}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>{post.likeCount || 0}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              {/* 열 개수(colSpan)를 테이블 구조에 맞게 8로 수정 */}
              <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#666', fontFamily: 'Pretendard' }}>
                아직 등록된 게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}