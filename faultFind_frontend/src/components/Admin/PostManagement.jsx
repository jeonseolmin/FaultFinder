import Pagination from "../../Common/Pagination.jsx";

export default function PostManagement({
  posts,
  pageData,
  onDeletePost,
  navigate,
  onPageChange,
}) {
  return (
    <>
      <table className="admin-table">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>

              <td
                className="post-link"
                onClick={() => navigate(`/community/${post.id}`)}
              >
                {post.title}
              </td>

              <td>{post.author}</td>
              <td>
                {post.createdAt
                  ? post.createdAt.substring(0, 19).replace("T", " ")
                  : ""}
              </td>

              <td>
                <button
                  className="btn-admin btn-gray"
                  onClick={() => onDeletePost(post.id)}
                >
                  강제 삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageData={pageData} onPageChange={onPageChange} />
    </>
  );
}
