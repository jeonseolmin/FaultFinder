import Pagination from "../../Common/Pagination.jsx";

const categoryMap = {
  SPAM: "도배",
  PROFANITY: "욕설/비방",
  PROMOTION: "광고/홍보",
  OTHER: "기타",
};

export default function ReportManagement({
  reports,
  pageData,
  onDeleteReportedTarget,
  navigate,
  onPageChange,
}) {
  return (
    <>
      <table className="admin-table report-table">
        <thead>
          <tr>
            <th>신고 ID</th>
            <th>신고자</th>
            <th>신고구분</th>
            <th>대상 번호</th>
            <th>신고 유형</th>
            <th>신고 사유</th>
            <th>일시</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.reporterEmail}</td>

              <td>
                <span
                  className={`report-type ${
                    report.targetType === "POST"
                      ? "report-type-post"
                      : "report-type-comment"
                  }`}
                >
                  {report.targetType === "POST" ? "게시글" : "댓글"}
                </span>
              </td>

              <td
                className="post-link"
                onClick={() =>
                  report.targetType === "POST" &&
                  navigate(`/community/${report.targetId}`)
                }
                style={{ cursor: report.targetType === "POST" ? "pointer" : "default" }}
              >
                #{report.targetId}번
              </td>

              <td>
                <span style={{ fontWeight: 'bold', color: '#dc2626' }}>
                  {categoryMap[report.category] || "미지정"}
                </span>
              </td>

              <td className="report-reason">{report.reason}</td>

              <td className="report-date">
                {report.createdAt
                  ? report.createdAt.substring(0, 19).replace("T", " ")
                  : ""}
              </td>

              <td>
                <button
                  className="btn-admin btn-danger"
                  onClick={() => onDeleteReportedTarget(report)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}

          {reports.length === 0 && (
            <tr>
              <td colSpan="8" className="empty-message">
                접수된 신고 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination pageData={pageData} onPageChange={onPageChange} />
    </>
  );
}