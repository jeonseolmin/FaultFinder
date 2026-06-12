// 1. 사고 발생 시 행동요령 데이터
export const ACTION_STEPS = [
  { num: 1, icon: "👤", title: "부상자 확인", desc: "부상자가 있는지 확인하고 안전한 곳으로 이동" },
  { num: 2, icon: "🚨", title: "119 신고", desc: "부상자 발생 시 즉시 119에 신고" },
  { num: 3, icon: "👮", title: "경찰 신고", desc: "사고 사실을 경찰에 신고 (112)" },
  { num: 4, icon: "📸", title: "현장 사진 촬영", desc: "사고 현장, 차량, 파손 부위 등을 촬영" },
  { num: 5, icon: "📝", title: "보험사 접수", desc: "보험사에 사고 접수 및 보상 상담" },
];

// 2. 긴급 연락망 데이터 (나중에 번호가 바뀌면 여기만 고치면 됩니다!)
export const EMERGENCY_CONTACTS = [
  { icon: "🚓", title: "경찰", desc: "사고 신고 및 출동", number: "112" },
  { icon: "🚑", title: "긴급구조 (119)", desc: "부상자 발생 시 신고", number: "119" },
  { icon: "🏢", title: "도로교통공단", desc: "교통사고 상담", number: "1577-0990" },
  { icon: "🚙", title: "손해 보험 협회", desc: "자동차 보험 상담", number: "02-3072-8631" },
];

// 3. 사고 체크리스트 데이터
export const CHECKLIST_ITEMS = [
  { icon: "🛡️", title: "1. 부상자 확인 및 안전 확보", desc: "부상 여부 확인 후 안전한 장소로 이동" },
  { icon: "📞", title: "2. 119 및 경찰 신고", desc: "필요 시 119 신고 후 경찰(112)에 신고" },
  { icon: "🚗", title: "3. 현장 보존", desc: "사고 현장을 보존하고 차량 이동 최소화" },
  { icon: "📷", title: "4. 증거 사진 촬영", desc: "사고 현장, 차량 파손 부위, 도로 상황 등 촬영" },
  { icon: "👥", title: "5. 상대방 정보 확인", desc: "이름, 연락처, 보험사, 차량번호 확인" },
  { icon: "👀", title: "6. 목격자 확보", desc: "목격자가 있다면 연락처 확보" },
  { icon: "📋", title: "7. 보험사 접수", desc: "보험사에 사고 접수 및 보상 상담 진행" },
];

// 4. 하단 배너 추가 안내 데이터
export const BOTTOM_BANNER_ITEMS = [
  { icon: "📼", title: "블랙박스 확인", desc: "블랙박스 영상은 사고 해결에 중요한 증거가 됩니다." },
  { icon: "⚖️", title: "과실비율 확인", desc: "사고 유형에 따라 과실비율이 달라집니다." },
  { icon: "🏥", title: "병원 진료", desc: "경밀한 사고라도 병원 진료를 받는 것이 안전합니다." },
  { icon: "👨‍⚖️", title: "법률 상담", desc: "분쟁 발생 시 전문가의 법률 상담을 받으세요." },
];