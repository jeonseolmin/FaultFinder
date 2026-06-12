import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BoardList({ activeTab }) {
  // DB에서 가져온 글 목록을 담을 그릇
  const [posts, setPosts] = useState([]);

  // 🌟 컴포넌트가 화면에 나타날 때 딱 한 번 실행되는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 스프링 부트(8080)에 "글 목록 좀 줘!" 라고 요청 (axios.get)
        const response = await axios.get('http://localhost:8080/faultfinder/list');
        
        // 받아온 데이터를 상태(posts)에 집어넣음
        setPosts(response.data);
      } catch (error) {
        console.error('글 목록을 불러오지 못했습니다:', error);
      }
    };

    fetchPosts();
  }, []); // 빈 배열을 넣어야 무한 반복을 막을 수 있습니다.

  return (
    <div className="board-list-container">
      <h3>자유게시판</h3>
      
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {/* 가져온 posts 배열의 개수만큼 표(tr)를 반복해서 그립니다 */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.category === 'free' ? '자유게시판' : post.category}</td>
                <td>{post.title}</td>
                {/* 시간 데이터 자르기 (예: 2026-06-12T14:00:00 -> 2026-06-12) */}
                <td>{post.createdAt ? post.createdAt.split('T')[0] : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                아직 등록된 게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}