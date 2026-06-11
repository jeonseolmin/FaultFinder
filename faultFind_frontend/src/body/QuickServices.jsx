import React from 'react';

function QuickServices() {
  // 앞으로 항목이 늘어날 것을 대비해 배열 구조로 작성했습니다.
  const services = [
    {
      id: 1,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=42756&format=png&color=000000', 
      imgAlt: '차량 대 차량 사고 이미지',
      title: '차량 대 차량',
      desc: '사고 유형별 과실비율 조회',
      path: '/car-to-car', // 클릭 시 이동할 경로
    },
    {
      id: 2,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=T8aKX9UIaCk9&format=png&color=000000', 
      imgAlt: '차량 대 사람 사고 이미지',
      title: '차량 대 사람',
      desc: '보행자 사고 정보',
      path: '/car-to-person', // 클릭 시 이동할 경로
    },
    {
      id: 3,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=5CgxfgEq7mBc&format=png&color=000000', 
      imgAlt: '차량 대 이륜차 사고 이미지',
      title: '차량 대 이륜차',
      desc: '이륜차 사고 정보',
      path: '/car-to-motorcycle', // 클릭 시 이동할 경로
    },
    {
      id: 4,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=c5rlo5IAWvhQ&format=png&color=000000', 
      imgAlt: '차량 대 자전거 사고 이미지',
      title: '차량 대 자전거',
      desc: '자전거 사고 정보',
      path: '/car-to-bicycle', // 클릭 시 이동할 경로
    },
    {
      id: 5,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=5tH5sHqq0t2q&format=png&color=000000', 
      imgAlt: '단독사고 이미지',
      title: '단독사고',
      desc: '단독사고 유형별 정보',
      path: '/single-accident', // 클릭 시 이동할 경로
    },
    {
      id: 6,
      // 공공 데이터나 프로젝트 내 이미지를 넣으시면 됩니다. (우선 Unsplash 자동차 일러스트 활용)
      imgSrc: 'https://img.icons8.com/?size=100&id=Fqihn9MGe0kQ&format=png&color=000000', 
      imgAlt: '법률정보 이미지',
      title: '법률정보',
      desc: '관련 법령 및 해설',
      path: '/legal-info', // 클릭 시 이동할 경로
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 섹션 타이틀 */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">자주 찾는 서비스</h2>

      {/* 서비스 카드 리스트 공간 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => window.location.href = service.path}
            className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 text-center group overflow-hidden"
          >
            {/* 1. 차량 이미지 영역 */}
            <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={service.imgSrc} 
                alt={service.imgAlt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            {/* 2. 서비스 이름 */}
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {service.title}
            </h3>
            
            {/* 3. 설명 텍스트 */}
            <p className="text-sm text-gray-500 font-medium">
              {service.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickServices;