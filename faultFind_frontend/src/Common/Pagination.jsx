export default function Pagination({ pageData, currentPage, totalPages, onPageChange }) {
    const current = pageData?.number ?? currentPage ?? 0;
    const total = pageData?.totalPages ?? totalPages ?? 0;

    if (total < 1) return null;

    let start = Math.max(0, current - 2);
    let end = Math.min(total - 1, current + 2);

    if (end - start < 4) {
        if (start === 0) {
            end = Math.min(total - 1, 4);
        } else if (end === total - 1) {
            start = Math.max(0, total - 5);
        }
    }

    return (
        <div className="pagination">
            <button
                type="button"
                disabled={current === 0}
                onClick={() => onPageChange(current - 1)}
            >
                이전
            </button>

            {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
                (page) => (
                    <button
                        type="button"
                        key={page}
                        className={page === current ? "active" : ""}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </button>
                )
            )}

            <button
                type="button"
                disabled={current >= total - 1}
                onClick={() => onPageChange(current + 1)}
            >
                다음
            </button>
        </div>
    );
}