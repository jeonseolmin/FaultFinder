import "./Info.css";

export default function Info() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">과실비율 조회 서비스</h2>
          <p>경기도 수원시 팔달구 중부대로 100 3층, 4층</p>
          <p>문의: 1234-5678 | 이메일: help@faultfind.com</p>
        </div>
        <div className="footer-right">
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FaultFind. All rights reserved.</p>
      </div>
    </footer>
  );
}