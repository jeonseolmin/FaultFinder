import "./Info.css";

export default function Info() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">과실비율 조회 서비스</h2>
          <p>
            교통사고 발생 시 누구나 쉽게 사고 유형과 과실비율을 확인할 수 있도록
            개발된 웹 서비스입니다.<br/> 과실비율 인정기준, 사고 사례 데이터, AI 분석
            기능을 결합하여 사용자가 사고 상황을 보다 쉽게 이해할 수 있도록
            설계하였습니다.
          </p>
          <p>
            기술 스택 : React · Spring Boot · JPA · PostgreSQL · Python · JWT ·
            OAuth2
          </p>
          <p>팀원 : 전설민 · 김정한 · 김혜정 · 김동현 · 임유정</p>
        </div>
        <div className="footer-right"></div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FaultFind. All rights reserved.</p>
      </div>
    </footer>
  );
}
