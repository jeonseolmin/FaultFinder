import React, { useState } from 'react';

// 1. 헤더 컴포넌트
const Header = () => (
  <header className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
      <span className="text-2xl">⚖️</span>
      <strong>교통사고 법률정보</strong>
    </div>
    <nav className="hidden lg:flex gap-6 font-medium text-gray-600">
      <a href="#1" className="hover:text-blue-600 transition-colors">사고유형</a>
      <a href="#2" className="hover:text-blue-600 transition-colors">과실비율조회</a>
      <a href="#3" className="hover:text-blue-600 transition-colors">법률정보</a>
      <a href="#4" className="hover:text-blue-600 transition-colors">판례검색</a>
      <a href="#5" className="hover:text-blue-600 transition-colors">보상가이드</a>
      <a href="#6" className="hover:text-blue-600 transition-colors">상담신청</a>
    </nav>
    <div className="flex gap-2">
      <button className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md transition">로그인</button>
      <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">회원가입</button>
    </div>
  </header>
);

// 2. 히어로 (메인 배너 및 검색) 컴포넌트
const Hero = () => (
  <section className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-16 md:px-20 md:py-24 text-left">
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
          교통사고, 정확한 법률 정보로<br/>바르게 해결하세요
        </h1>
        <p className="text-gray-600 text-lg">사고 상황을 입력하면 과실비율부터 보상, 관련 법률까지 한 번에 확인할 수 있습니다.</p>
      </div>
      
      <div className="flex w-full max-w-2xl mb-6 shadow-sm">
        <input 
          type="text" 
          placeholder="예) 신호 없는 교차로에서 직진 중 충돌했어요" 
          className="flex-1 p-4 border border-gray-300 rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-r-lg hover:bg-blue-700 transition">
          검색
        </button>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <span className="font-semibold">인기검색어</span>
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-blue-400 transition">후진 중 충돌</span>
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-blue-400 transition">차선 변경 사고</span>
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-blue-400 transition">주차장 접촉사고</span>
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full cursor-pointer hover:border-blue-400 transition">보행자 사고</span>
      </div>
    </div>
  </section>
);

// 3. 퀵 서비스 메뉴 컴포넌트
const QuickMenu = () => {
  const menus = [
    { icon: "🚗", title: "차량 대 차량", desc: "사고 유형별 과실비율 조회" },
    { icon: "🚶", title: "차량 대 사람", desc: "보행자 사고 정보" },
    { icon: "🛵", title: "차량 대 이륜차", desc: "이륜차 사고 정보" },
    { icon: "🚲", title: "차량 대 자전거", desc: "자전거 사고 정보" },
    { icon: "⚠️", title: "단독사고", desc: "단독사고 유형별 정보" },
    { icon: "📖", title: "법률정보", desc: "관련 법령 및 해설" }
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
      <h3 className="text-lg font-bold text-gray-800 mb-6">자주 찾는 서비스</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {menus.map((menu, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-lg hover:border-blue-300 hover:shadow-md transition cursor-pointer text-center group">
            <div className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform">{menu.icon}</div>
            <h4 className="font-bold text-gray-800 text-sm mb-1">{menu.title}</h4>
            <p className="text-xs text-gray-500 break-keep">{menu.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. AI 과실비율 조회 (좌측 메인)
const AiAnalysis = () => {
  const [text, setText] = useState('신호 없는 교차로에서 직진 중인 A차량과 우측 도로에서 진입한 B차량이 충돌했습니다.');

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-6">AI 과실비율 조회</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* 입력 섹션 */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
            사고 상황 입력
          </div>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <select className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>사고 유형 선택</option>
            </select>
            <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition whitespace-nowrap">
              AI 분석하기
            </button>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
            AI 분석 결과
          </div>
          
          <div className="flex justify-center items-center gap-8 my-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-700">70%</div>
              <div className="text-sm text-gray-600 mt-1">A 차량 (직진)</div>
            </div>
            {/* Tailwind v4 conic-gradient 활용 */}
            <div className="w-24 h-24 rounded-full bg-[conic-gradient(#1d4ed8_70%,#ef4444_0)] shadow-inner flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-red-500">30%</div>
              <div className="text-sm text-gray-600 mt-1">B 차량 (진입)</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm">
            <strong className="block text-gray-800 mb-2">분석 요약</strong>
            <p className="text-gray-600 leading-relaxed">
              A 차량이 도로 우선권을 가지므로 B 차량의 과실이 더 큽니다. 단, 안전운전 의무에 따른 일부 과실이 인정됩니다.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// 5. 사이드바 (우측 정보)
const Sidebar = () => (
  <aside className="flex flex-col gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
        <span>💡</span> 오늘의 법률 팁
      </h4>
      <h5 className="font-bold text-gray-700 mb-3">교통사고 발생 시 첫 단계</h5>
      <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-5">
        <li>사고 현장 안전 확보</li>
        <li>경찰 신고 (112)</li>
        <li>상대방 정보 확인</li>
        <li>증거 확보 (사진, 블랙박스)</li>
      </ol>
      <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">
        자세히 보기 &gt;
      </button>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="font-bold text-gray-800 mb-2">무료 상담 신청</h4>
      <p className="text-sm text-gray-500 mb-4">전문가의 1:1 상담을 받아보세요.</p>
      
      <div className="flex gap-2 mb-4">
        <button className="flex-1 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-1">
          <span>📞</span> 전화 상담
        </button>
        <button className="flex-1 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 hover:bg-yellow-100 transition flex items-center justify-center gap-1">
          <span>💬</span> 카톡 상담
        </button>
      </div>
      
      <button className="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-md">
        상담 신청하기
      </button>
    </div>
  </aside>
);

// 메인 App 조합
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-6 py-10 -mt-10 relative z-10">
          <QuickMenu />
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="lg:w-2/3">
              <AiAnalysis />
            </div>
            <div className="lg:w-1/3">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}