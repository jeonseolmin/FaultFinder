import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axiosInstance from "../../api/axiosInstance";

// 긴 약관 텍스트를 밖으로 빼서 코드를 깔끔하게 만듭니다.
const TERMS_TEXT = `제1조 (목적)
본 약관은 FaultFind(이하 '회사')가 제공하는 과실비율 조회 및 커뮤니티 서비스(이하 '서비스')의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (회원가입 및 계정 관리)
① 회원이 되고자 하는 자는 회사가 정한 가입 양식에 따라 회원정보를 기입하고 본 약관에 동의함으로써 회원가입을 신청합니다.
② 회원은 등록한 사항에 변경이 있는 경우, 즉시 마이페이지 수정 등을 통해 회사에 그 변경사항을 알려야 합니다.
③ 계정의 비밀번호에 대한 관리 책임은 회원 본인에게 있으며, 제3자에게 이용하게 해서는 안 됩니다.

제3조 (서비스의 제공 및 한계)
① 회사는 교통사고 과실비율 정보, 대처 가이드, 커뮤니티 등의 서비스를 제공합니다.
② [중요] 회사가 제공하는 과실비율 및 법률 관련 정보는 통상적인 기준을 바탕으로 한 '참고용' 자료입니다. 실제 사고의 정황, 판례, 보험사 합의 등에 따라 결과는 달라질 수 있으며, 회사는 해당 정보에 대한 법적 효력이나 보증을 제공하지 않고 이로 인한 어떠한 법적 책임도 지지 않습니다.

제4조 (회원의 의무)
회원은 다음 행위를 하여서는 안 됩니다.
1. 회원가입 신청 또는 변경 시 허위 내용의 등록
2. 타인의 정보 도용
3. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
4. 회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해
5. 커뮤니티 내 욕설, 비방, 타인의 명예를 손상시키거나 업무를 방해하는 행위

제5조 (서비스 이용제한 및 탈퇴)
① 회원은 언제든지 서비스 내 설정 화면을 통해 회원 탈퇴를 요청할 수 있습니다.
② 회원이 제4조의 의무를 위반한 경우, 회사는 사전 통보 없이 서비스 이용을 제한하거나 회원 자격을 상실시킬 수 있습니다.`;

const PRIVACY_TEXT = `FaultFind는 회원가입, 고객상담, 원활한 서비스 제공을 위해 아래와 같이 개인정보를 수집 및 이용합니다.

1. 수집하는 개인정보 항목
필수항목: 이메일 주소, 이름(닉네임), 비밀번호
자동 수집항목: 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보

2. 개인정보의 수집 및 이용 목적
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
- 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만 처리 등 민원 처리, 고지사항 전달
- 서비스 제공: 과실비율 조회 기록 관리, 커뮤니티 게시글 및 댓글 작성자 식별

3. 개인정보의 보유 및 이용 기간
원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
보존 항목: 이메일 주소, 이름, 서비스 이용기록
보존 근거: 불량 이용자의 재가입 방지, 명예훼손 등 권리침해 분쟁 및 수사 협조
보존 기간: 회원 탈퇴 후 30일 (이후 영구 삭제)
(단, 관련 법령에 의하여 보존할 필요성이 있는 경우에는 법령에서 규정한 보존기간 동안 보존합니다.)

4. 동의를 거부할 권리 및 거부에 따른 불이익
이용자는 본 서비스의 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 단, 동의를 거부할 경우 FaultFind의 회원가입 및 커뮤니티 글 작성 등의 서비스 이용이 제한됩니다.`;


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // 모달(팝업) 창 상태 관리 추가!
  const [modalContent, setModalContent] = useState(null); // null이면 닫힘, 내용이 있으면 열림

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => {
      const newAgreements = { ...prev, [name]: checked };
      const allChecked = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
      return { ...newAgreements, all: allChecked };
    });
  };

  const handleAllAgreementChange = (e) => {
    const checked = e.target.checked;
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !passwordConfirm) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관(이용약관, 개인정보 수집)에 동의해 주세요.");
      return;
    }

    try {
      await axiosInstance.post("/api/auth/signup", {
        email: email,
        password: password,
        userName: userName,
      });
      alert("회원가입이 완료되었습니다! 로그인해 주세요.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("회원가입 실패. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>회원가입</h2>
            <p>정보를 입력하고 간편하게 가입하세요.</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="userName">이름</label>
              <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="실명을 입력하세요" />
            </div>

            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="사용할 이메일을 입력하세요" />
            </div>

            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요 (4자 이상)" />
            </div>

            <div className="input-group">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="비밀번호를 다시 입력하세요" />
            </div>

            <div className="agreements-container" style={{ margin: "25px 0", textAlign: "left", fontSize: "0.9rem" }}>
              <div style={{ paddingBottom: "12px", borderBottom: "1px solid #e5e7eb", marginBottom: "12px" }}>
                <label style={{ fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <input type="checkbox" name="all" checked={agreements.all} onChange={handleAllAgreementChange} style={{ marginRight: "8px", width: "16px", height: "16px" }} />
                  모든 약관에 확인 및 동의합니다.
                </label>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#4b5563" }}>
                <label style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="terms" checked={agreements.terms} onChange={handleAgreementChange} style={{ marginRight: "8px" }} />
                    [필수] 이용약관 동의
                  </div>
                  {/* 팝업창 열기 트리거 */}
                  <span onClick={(e) => { e.preventDefault(); setModalContent({ title: "이용약관 동의", text: TERMS_TEXT }); }} style={{ color: "#3b82f6", textDecoration: "underline", fontSize: "0.8rem" }}>
                    내용보기
                  </span>
                </label>

                <label style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" name="privacy" checked={agreements.privacy} onChange={handleAgreementChange} style={{ marginRight: "8px" }} />
                    [필수] 개인정보 수집 및 이용 동의
                  </div>
                  {/* 팝업창 열기 트리거 */}
                  <span onClick={(e) => { e.preventDefault(); setModalContent({ title: "개인정보 수집 및 이용 동의", text: PRIVACY_TEXT }); }} style={{ color: "#3b82f6", textDecoration: "underline", fontSize: "0.8rem" }}>
                    내용보기
                  </span>
                </label>

                <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <input type="checkbox" name="marketing" checked={agreements.marketing} onChange={handleAgreementChange} style={{ marginRight: "8px" }} />
                  [선택] 마케팅 정보 수신 동의
                </label>
              </div>
            </div>

            <button type="submit" className="btn-submit">가입하기</button>
          </form>

          <div className="auth-links">
            이미 계정이 있으신가요? <Link to="/login" style={{ color: "#1a56db", fontWeight: "bold" }}>로그인하기</Link>
          </div>
        </div>
      </div>

      {/* 모달(팝업) 렌더링 영역 */}
      {modalContent && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, 
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "#fff", width: "90%", maxWidth: "500px", maxHeight: "80vh", 
            borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#111827" }}>{modalContent.title}</h3>
              <button onClick={() => setModalContent(null)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#6b7280" }}>&times;</button>
            </div>
            
            {/* 이 부분이 스크롤을 만들어주는 핵심입니다! */}
            <div style={{ flex: 1, overflowY: "auto", whiteSpace: "pre-wrap", fontSize: "0.9rem", color: "#4b5563", lineHeight: "1.6", paddingRight: "10px" }}>
              {modalContent.text}
            </div>
            
            <button 
              onClick={() => setModalContent(null)} 
              style={{ marginTop: "15px", padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}