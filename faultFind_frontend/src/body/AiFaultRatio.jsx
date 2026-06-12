import React, { useState } from "react";

function AiFaultRatio() {
  // 사용자가 입력할 텍스트 상태 관리
  const [situation, setSituation] = useState(
    "신호 없는 교차로에서 직진 중인 A차량과 우측 도로에서 진입한 B차량이 충돌했습니다.",
  );
  const [accidentType, setAccidentType] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* [전체 대레이아웃 (2단 분할)]
        - PC(xl): 왼쪽 AI 영역이 70% (xl:col-span-7), 오른쪽 팁/상담 영역이 30% (xl:col-span-3)를 차지합니다.
      */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
        {/*  [좌측 영역 - col-span-7] AI 과실비율 조회 (입력 + 결과)    */}
        <div className="xl:col-span-7 w-full">
          {/* 섹션 타이틀 */}
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            AI 과실비율 조회
          </h2>

          {/* 입력창과 결과창을 가로로 나란히 배치 (md:flex) */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-2">
            
            {/* [좌측] 1. 사고 상황 입력 */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold">
                    1
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    사고 상황 입력
                  </h3>
                </div>

                {/* 텍스트 입력창 */}
                <div className="relative mb-4">
                  <textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value.slice(0, 300))}
                    className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="사고 상황을 입력하세요."
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-gray-400">
                    {situation.length} / 300자
                  </span>
                </div>

                {/* 사고 유형 선택 셀렉트 박스 */}
                <select
                  value={accidentType}
                  onChange={(e) => setAccidentType(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-blue-500 mb-6"
                >
                  <option value="">사고 유형 선택</option>
                  <option value="car-to-car">차량 대 차량</option>
                  <option value="car-to-person">차량 대 사람</option>
                  <option value="car-to-motorcycle">차량 대 이륜차</option>
                  <option value="car-to-bicycle">차량 대 자전거</option>
                  <option value="single-accident">단독사고</option>
                </select>
              </div>

              {/* 분석하기 버튼 */}
              <button className="w-full py-3.5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-950 transition-colors mt-auto btn btn-primary">
                AI 분석하기
              </button>
            </div>
            {/* 중간에 위치하는 화살표 (PC 화면에서만 표시) */}
            <div className="hidden lg:flex items-center justify-center text-gray-300 font-bold text-xl px-2 self-center">
              ▶
            </div>

            {/* [우측] 2. AI 분석 결과 */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold">
                  2
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  AI 분석 결과
                </h3>
              </div>

              {/* 차트 & 퍼센트 영역 */}
              <div className="flex items-center justify-center gap-6 mb-6 py-2">
                {/* A 차량 결과 */}
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-blue-600">70%</p>
                  <p className="text-xs text-gray-500 mt-1">A 차량 (직진)</p>
                </div>

                {/* 도넛 그래프 모양 원형 UI */}
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-[12px] border-blue-500 border-r-red-500 transform rotate-45">
                  <div className="absolute inset-0 bg-white rounded-full m-[-1px]" />{" "}
                  {/* 중앙 구멍 */}
                </div>

                {/* B 차량 결과 */}
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-red-500">30%</p>
                  <p className="text-xs text-gray-500 mt-1">B 차량 (진입)</p>
                </div>
              </div>

              {/* 분석 요약 박스 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="text-xs font-bold text-gray-900 mb-1">
                  분석 요약
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A 차량이 도로 우선권을 가지므로 B 차량의 과실이 더 큽니다.
                  <br />
                  단, 안전운전 의무에 따른 일부 과실이 인정됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ 커뮤니티 인기글 & 사고 유형 TOP 5 =========== */}

        <div className="xl:col-span-3 flex flex-col gap-6 w-full">
          {/* 커뮤니티 인기글 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-1.5">
              <span></span> 커뮤니티 인기글
              <button className="w-full py-2 bg-gray-0 text-gray-700 text-xs font-semibold rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                더보기
              </button>
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[220px] flex flex-col justify-between">
              
              <ol className="space-y-1.5 text-xs text-gray-600 list-decimal pl-4 leading-relaxed">
                <span class="badge text-bg-primary">자유</span>
                <span> 사고 처리 어떻게 해야 하나요?</span>
                <br />
                <span class="badge text-bg-primary">후기</span>
                <span> 고속도로에서 정차중에 뒤에서 박았습니다.</span>
                <br />
                <span class="badge text-bg-primary">Q&A</span>
                <span> 보험사 보상 거절 대응 방법</span>
                <br />
                <span class="badge text-bg-primary">자유</span>
                <span> 블랙박스 영상 첨부 방법 알려주세요</span>
                <br />
                <span class="badge text-bg-primary">후기</span>
                <span> 주차장 접촉사고 과실 후기</span>
              </ol>
              
            </div>
          </div>

          {/* 사고 유형 TOP 5 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[224px] flex flex-col justify-between">
            <h3 className="font-bold text-red-500 text-sm mb-0.5">
              사고 유형 TOP 5
              <button className="w-full py-2 bg-gray-0 text-gray-700 text-xs font-semibold rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors ">
                더보기
              </button>
            </h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[220px] flex flex-col justify-between">
              
              <ol className="space-y-1.5 text-xs text-gray-600 list-decimal pl-4 leading-relaxed">
                <span class="badge text-bg-primary">1</span>
                <span> 신호 없는 교차로 사고</span>
                <br />
                <span class="badge text-bg-primary">2</span>
                <span> 차선 변경 사고</span>
                <br />
                <span class="badge text-bg-primary">3</span>
                <span> 주차장 접촉사고</span>
                <br />
                <span class="badge text-bg-primary">4</span>
                <span> 후진 사고</span>
                <br />
                <span class="badge text-bg-primary">5</span>
                <span> 보행자 사고</span>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiFaultRatio;
