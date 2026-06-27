// src/data/accidentData.jsx (확장자 변경 필수!)
import { FaCarCrash, FaCamera, FaPhoneAlt} from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md';

// 🌟 예시: ACTION_STEPS 데이터에 react-icons 적용
export const ACTION_STEPS = [
  { 
    id: 1, 
    title: '정차 및 현장보존', 
    desc: '즉시 차를 멈추고 비상등을 켭니다.', 
    icon: <FaCarCrash /> // 이모지 대신 컴포넌트를 직접 넣습니다.
  },
  { 
    id: 2, 
    title: '부상자 구호 및 신고', 
    desc: '119와 112에 즉시 신고합니다.', 
    icon: <FaPhoneAlt /> 
  },
  { 
    id: 3, 
    title: '증거 확보', 
    desc: '다양한 각도에서 사진과 영상을 촬영합니다.', 
    icon: <FaCamera /> 
  },
  { 
    id: 4, 
    title: '보험사 연락', 
    desc: '가입한 보험사에 사고 접수를 합니다.', 
    icon: <MdOutlineSecurity /> 
  }
];

// EMERGENCY_CONTACTS, CHECKLIST_ITEMS 등도 동일한 방식으로 교체해 주시면 됩니다.