import './Footer.css'
export default function Footer() {
  return (
      <footer className="footer-container">
          <div className="footer-content">
              <div className="footer-left">
                  <h2 className="footer-logo">과실비율 조회 서비스</h2>
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
