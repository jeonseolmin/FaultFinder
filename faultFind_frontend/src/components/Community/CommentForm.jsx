import "./Community.css";

export default function CommentForm({ value, setValue, onSubmit }) {
    return (
        <div className="comment-input-box">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="comment-input"
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSubmit();
                }}
            />

            <button onClick={onSubmit} className="btn-comment-submit">
                등록
            </button>
        </div>
    );
}