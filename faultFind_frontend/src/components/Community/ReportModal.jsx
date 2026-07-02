import "./Community.css";

export default function ReportModal({
    show,
    category,
    setCategory,
    reason,
    setReason,
    onClose,
    onSubmit,
}) {
    if (!show) return null;

    return (
        <div className="report-modal-overlay">
            <div className="report-modal-content">
                <h3 className="report-modal-title">🚨 신고하기</h3>

                <p className="report-modal-desc">
                    부적절한 내용인가요? 신고 유형을 선택하고 사유를 적어주세요.
                </p>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        marginBottom: "15px", // 텍스트 공간과의 여백
                        fontSize: "1rem",
                        backgroundColor: "#fff"
                    }}
                >
                    <option value="SPAM">도배글 / 불필요한 반복</option>
                    <option value="PROFANITY">욕설 / 비방 / 혐오 표현</option>
                    <option value="PROMOTION">광고 / 영리 목적 홍보</option>
                    <option value="OTHER">기타 (상세 사유 필수)</option>
                </select>

                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="상세 신고 사유를 적어주세요."
                    className="report-textarea"
                />

                <div className="report-modal-actions">
                    <button onClick={onClose} className="btn-base btn-report-cancel">
                        취소
                    </button>

                    <button onClick={onSubmit} className="btn-base btn-report-submit">
                        신고 제출
                    </button>
                </div>
            </div>
        </div>
    );
}