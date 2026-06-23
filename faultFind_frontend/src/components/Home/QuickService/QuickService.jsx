import React from 'react';
import './QuickServices.css';
import { FcIdea } from "react-icons/fc";

function QuickServices() {
  // 앞으로 항목이 늘어날 것을 대비해 배열 구조로 작성했습니다.
  const services = [
    {
      id: 1,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=iDS1efgccWRw&format=png&color=000000', 
      imgAlt: '사고 대처 가이드',
      title: '사고 대처 ',
      desc: '사고 발생 시 대처 요령',
      path: '/guides', // 클릭 시 이동할 경로
    },
    {
      id: 2,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=kB3dy7vSuFio&format=png&color=000000', 
      imgAlt: '과실 비율 이미지',
      title: '과실 비율 조회',
      desc: '사고 유형별 과실비율 조회',
      path: '/fault-ratios', // 클릭 시 이동할 경로
    },
    {
      id: 3,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=122809&format=png&color=000000', 
      imgAlt: '커뮤니티 관련 이미지',
      title: '커뮤니티',
      desc: '게시판 인기글 사고사례',
      path: '/community', // 클릭 시 이동할 경로
    },
    {
      id: 4,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=VF7zRdVii0QF&format=png&color=000000', 
      imgAlt: '차량 대 차량 사고 이미지',
      title: '차량 대 차량',
      desc: '차량간의 사고 정보',
      path: '/cases/car-to-car', // 클릭 시 이동할 경로
    },
    {
      id: 5,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=qYlz28isTjPC&format=png&color=000000', 
      imgAlt: '차량 대 사람 사고 이미지',
      title: '차량 대 보행자',
      desc: '보행자 사고 정보',
      path: '/cases/car-to-pedestrian', // 클릭 시 이동할 경로
    },
    {
      id: 6,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=9334&format=png&color=000000', 
      imgAlt: '차량 대 이륜차 사고 이미지',
      title: '차량 대 이륜차',
      desc: '이륜차 사고 정보',
      path: '/cases/car-to-motorcycle', // 클릭 시 이동할 경로
    },
  ];

  return (
    <div className="quickService-container">
      <h2 className="services-title-main">SERVICE</h2>
      <div className="services-grid">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => window.location.href = service.path}
            className="service-card"
          >
            <div className="service-icon-box">
              <img src={service.imgSrc} alt={service.imgAlt} className="service-icon" />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickServices;