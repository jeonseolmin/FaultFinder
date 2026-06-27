from __future__ import annotations

from typing import Iterable
import psycopg2
from psycopg2.extras import execute_batch
from config import Settings


def get_connection(settings: Settings):
    return psycopg2.connect(
        host=settings.db_host,
        port=settings.db_port,
        dbname=settings.db_name,
        user=settings.db_user,
        password=settings.db_password,
    )


def init_schema(conn) -> None:
    with open("schema.sql", "r", encoding="utf-8") as f:
        sql = f.read()
    with conn.cursor() as cur:
        cur.execute(sql)
    conn.commit()


def upsert_video_metadata(conn, videos: Iterable[dict]) -> None:
    sql = """
    INSERT INTO youtube_videos (
        video_id, title, description, published_at, url, updated_at
    ) VALUES (
        %(video_id)s, %(title)s, %(description)s, %(published_at)s, %(url)s, NOW()
    )
    ON CONFLICT (video_id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        published_at = EXCLUDED.published_at,
        url = EXCLUDED.url,
        updated_at = NOW();
    """
    with conn.cursor() as cur:
        execute_batch(cur, sql, list(videos), page_size=100)
    conn.commit()


def get_videos_needing_transcript(conn, limit: int | None = None) -> list[str]:
    sql = """
    SELECT video_id
    FROM youtube_videos
    WHERE transcript_status IS NULL
       OR transcript_status IN ('PENDING', 'FAILED')
       OR transcript IS NULL
       OR transcript = ''
    ORDER BY published_at DESC NULLS LAST;
    """
    if limit:
        sql = sql.rstrip().rstrip(";") + " LIMIT %s;"
        params = (limit,)
    else:
        params = None

    with conn.cursor() as cur:
        cur.execute(sql, params)
        return [row[0] for row in cur.fetchall()]


def update_transcript(conn, video_id: str, transcript: str, status: str, error: str | None = None) -> None:
    sql = """
    UPDATE youtube_videos
    SET transcript = %s,
        transcript_status = %s,
        transcript_error = %s,
        updated_at = NOW()
    WHERE video_id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(sql, (transcript, status, error, video_id))
    conn.commit()


def count_by_status(conn) -> list[tuple[str, int]]:
    with conn.cursor() as cur:
        cur.execute("""
            SELECT COALESCE(transcript_status, 'NULL') AS status, COUNT(*)
            FROM youtube_videos
            GROUP BY COALESCE(transcript_status, 'NULL')
            ORDER BY COUNT(*) DESC;
        """)
        return cur.fetchall()
