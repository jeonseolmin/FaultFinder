import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './PopularPostAndBest5.css';
import { GiPoliceCar } from "react-icons/gi";
import { LiaAmbulanceSolid } from "react-icons/lia";
import { FaCarCrash } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { FcPhone } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import { RiPoliceCarFill } from "react-icons/ri";
import { BiSolidCarCrash } from "react-icons/bi";

function PopularPostAndBest5() {
  const navigate = useNavigate();

  // 실제 데이터를 담을 빈 배열 상태 생성
  const [popularPosts, setPopularPosts] = useState([]);

  // 컴포넌트가 켜질 때 백엔드 API 호출
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/community/popular');
        setPopularPosts(response.data);
      } catch (error) {
        console.error("인기글을 불러오는 데 실패했습니다.", error);
      }
    };
    
    fetchPopularPosts();
  }, []);

  // 사고 유형 TOP 5 (이 부분도 나중에 통계 API가 생기면 똑같이 바꿀 수 있습니다)
  const topAccidents = [
    { id: 1, rank: 1, title: '신호 없는 교차로 사고', type: '차대차' },
    { id: 2, rank: 2, title: '차선 변경 사고', type: '차대차' },
    { id: 3, rank: 3, title: '주차장 접촉사고', type: '차대차' },
    { id: 4, rank: 4, title: '후진 사고', type: '차대차' },
    { id: 5, rank: 5, title: '보행자 사고', type: '차대보행자' },
  ];

  // 날짜 변환 함수 (예: 2026-06-18T10:30:00 -> 06.18)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  return (
    <div className="container">
      {/* 커뮤니티 인기글 */}
      <div className="section">
        <div className="section-header">
          <h2 className="title">커뮤니티 인기글  </h2>
          <button className="moreBtn" onClick={() => navigate('/community')}>
            더보기 <span className="moreBtn-arrow">❯</span>
          </button>
        </div>
        <ul className="list">
          {/* popularPosts 배열을 화면에 뿌려줍니다. 데이터가 없을 때의 방어 로직 포함 */}
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <li 
                key={post.id} 
                className="listItem" 
                onClick={() => navigate(`/community/${post.id}`)} // 클릭 시 해당 게시글로 이동
                style={{ cursor: 'pointer' }}
              >
                <div className="leftContent">
                  <span className="tag" style={{ backgroundColor: '#E6F0FF', color: '#0052CC' }}>
                    {post.category || '인기'} 
                  </span>
                  <span className="postTitle">{post.title}</span>
                </div>
                {/* 작성일을 깔끔한 포맷으로 출력 */}
                <span className="date">{formatDate(post.createdDate)}</span>
              </li>
            ))
          ) : (
            <li className="listItem" style={{ justifyContent: 'center', color: '#9ca3af' }}>
              아직 등록된 인기글이 없습니다.
            </li>
          )}
        </ul>
      </div>

      {/* 사고 유형 TOP 5 */}
      <div className="section">
        <div className="section-header">
          <div className="section-header-icon-wrapper">
            <h2 className="title">사고 유형 TOP 5 </h2>
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

      
      {/* 우측 영역 : 긴급 연락망 */}
        <div className="right-section-contact">
          
          <h2 className="section-title-contact">긴급 연락망</h2>
          
          <div className="guide-card-contact">
            <ul className="guide-list">
              <li>
                <span className="guide-num"><RiPoliceCarFill /></span>
                <div className="guide-content-contact">
                  <h4>112</h4>
                  <p>경찰 신고 및 출동</p>
                </div>
              </li>
              <li>
                <span className="guide-num"><LiaAmbulanceSolid /></span>
                <div className="guide-content-contact">
                  <h4>119</h4>
                  <p>부상자 발생 시 신고</p>
                </div>
              </li>
              <li>
                <span className="guide-num"><FaCarCrash /></span>
                <div className="guide-content-contact">
                  <h4>1577-0990</h4>
                  <p>도로교통공단 교통사고 상담</p>
                </div>
              </li>
              <li>
                <span className="guide-num"><LuNotebookPen /></span>
                <div className="guide-content-contact">
                  <h4>02-3702-8631</h4>
                  <p>손해보험협회 보험 상담</p>
                </div>
              </li>
              <li>
                <span className="guide-num"><BiSolidCarCrash /></span>
                <div className="guide-content-contact">
                  <h4>1588-2504</h4>
                  <p>사고 차량 견인 요청</p>
                </div>
              </li>

            </ul>
          </div>
        </div>
      
    </div>
  );
}

export default PopularPostAndBest5;