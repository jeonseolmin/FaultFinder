import { useState } from "react";
import "../Community.css";

export default function ReplyForm({ onSubmit }) {
    const [reply, setReply] = useState("");

    const handleSubmit = () => {
        if (!reply.trim()) return;

        onSubmit(reply);
        setReply("");
    };

    return (
        <div className="reply-form">
            <input
                type="text"
                value={reply}
                placeholder="답글을 입력하세요..."
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                }}
            />

            <button onClick={handleSubmit}>
                등록
            </button>
        </div>
    );
}