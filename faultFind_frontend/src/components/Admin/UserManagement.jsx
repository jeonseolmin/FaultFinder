
export default function UserManagement({ users, onDeleteUser, onSuspendUser }) {
    return (
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
                    <td className={user.role === "ROLE_ADMIN" ? "role-admin" : ""}>
                        {user.role}
                    </td>
                    <td>
                        <div className="action-buttons">
                            <button
                                className={`btn-admin ${
                                    user.suspended ? "btn-success" : "btn-warning"
                                }`}
                                onClick={() => onSuspendUser(user)}
                            >
                                {user.suspended ? "정지 해제" : "활동 정지"}
                            </button>

                            <button
                                className="btn-admin btn-danger"
                                onClick={() => onDeleteUser(user.id)}
                            >
                                강제 탈퇴
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}