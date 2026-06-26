import "./Community.css";

export default function ReportModal({
                                        show,
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
                    부적절한 내용인가요? 신고 사유를 명확히 적어주세요.
                </p>

                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="예: 욕설 및 비방, 불법 광고, 도배 등"
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