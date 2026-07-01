import Pagination from "../../Common/Pagination.jsx";

export default function UserManagement({
                                           users,
                                           pageData,
                                           onDeleteUser,
                                           onSuspendUser,
                                           onPageChange
                                       }) {
    return (
        <>
            <table className="admin-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이메일</th>
                    <th>이름</th>
                    <th>권한</th>
                    <th>관리</th>
                </tr>
                </thead>

                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                        
                        {/* 1. 권한을 한글로 변환하고, 임시 탈퇴 유저는 빨간색으로 강조합니다. */}
                        <td className={user.role === "ROLE_ADMIN" ? "role-admin" : ""}>
                            {user.role === "ROLE_ADMIN" ? "관리자" :
                             user.role === "ROLE_WITHDRAWN" ? <span style={{ color: "red", fontWeight: "bold" }}>임시 탈퇴</span> :
                             "일반유저"}
                        </td>
                        
                        <td>
                            <div className="action-buttons">
                                {/* 2. 이미 탈퇴한 유저면 버튼을 비활성화(disabled) 합니다. */}
                                <button
                                    className={`btn-admin ${
                                        user.suspended ? "btn-success" : "btn-warning"
                                    }`}
                                    onClick={() => onSuspendUser(user)}
                                    disabled={user.role === "ROLE_WITHDRAWN"}
                                    style={{ opacity: user.role === "ROLE_WITHDRAWN" ? 0.5 : 1, cursor: user.role === "ROLE_WITHDRAWN" ? "not-allowed" : "pointer" }}
                                >
                                    {user.suspended ? "정지 해제" : "활동 정지"}
                                </button>

                                <button
                                    className="btn-admin btn-danger"
                                    onClick={() => onDeleteUser(user.id)}
                                    disabled={user.role === "ROLE_WITHDRAWN"}
                                    style={{ opacity: user.role === "ROLE_WITHDRAWN" ? 0.5 : 1, cursor: user.role === "ROLE_WITHDRAWN" ? "not-allowed" : "pointer" }}
                                >
                                    임시 탈퇴
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            <Pagination
                pageData={pageData}
                onPageChange={onPageChange}
            />
        </>
    );
}