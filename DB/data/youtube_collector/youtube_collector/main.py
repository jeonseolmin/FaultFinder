from __future__ import annotations

import argparse
import time

from config import get_settings
from database import (
    count_by_status,
    get_connection,
    get_videos_needing_transcript,
    init_schema,
    update_transcript,
    upsert_video_metadata,
)
from transcript import fetch_transcript
from youtube_api import (
    get_latest_video_ids,
    get_video_details,
)

def collect_metadata() -> None:
    settings = get_settings()
    with get_connection(settings) as conn:
        init_schema(conn)

        print(f"[1/2] 최신 영상 ID 수집 시작: target={settings.target_count}")
        video_ids = get_latest_video_ids(
            api_key=settings.youtube_api_key,
            channel_id=settings.channel_id,
            target_count=settings.target_count,
        )
        print(f"수집된 video_id: {len(video_ids)}개")

        print("[2/2] 제목/설명란/업로드일 조회 시작")
        videos = get_video_details(settings.youtube_api_key, video_ids)
        upsert_video_metadata(conn, videos)
        print(f"DB 저장 완료: {len(videos)}개")


def collect_transcripts(limit: int | None = None) -> None:
    settings = get_settings()
    with get_connection(settings) as conn:
        init_schema(conn)

        video_ids = get_videos_needing_transcript(conn, limit=limit)
        total = len(video_ids)
        print(f"자막 수집 대상: {total}개")

        for idx, video_id in enumerate(video_ids, start=1):
            result = fetch_transcript(video_id)
            update_transcript(
                conn=conn,
                video_id=video_id,
                transcript=result.text,
                status=result.status,
                error=result.error,
            )
            print(f"[{idx}/{total}] {video_id} -> {result.status}")
            time.sleep(settings.transcript_sleep_seconds)

        print("자막 상태 요약:")
        for status, count in count_by_status(conn):
            print(f"- {status}: {count}")


def collect_all(transcript_limit: int | None = None) -> None:
    collect_metadata()
    collect_transcripts(limit=transcript_limit)




def load_video_ids_from_txt(file_path: str) -> list[str]:
    with open(file_path, "r", encoding="utf-16") as f:
        return [
            line.strip()
            for line in f
            if line.strip()
        ]

def collect_metadata_from_txt() -> None:
    settings = get_settings()

    with get_connection(settings) as conn:
        init_schema(conn)

        print("[1/2] txt에서 video_id 읽는 중")

        video_ids = load_video_ids_from_txt(
            "hanmoonchul_video_ids.txt"
        )

        print(f"읽은 video_id: {len(video_ids)}개")

        print("[2/2] 제목/설명란/업로드일 조회 시작")

        videos = get_video_details(
            settings.youtube_api_key,
            video_ids
        )

        upsert_video_metadata(conn, videos)

        print(f"DB 저장 완료: {len(videos)}개")

def main() -> None:
    parser = argparse.ArgumentParser(description="YouTube 영상 설명란/자막 PostgreSQL 수집기")
    parser.add_argument(
        "mode",
        choices=["metadata", "transcript", "text-metadata","all"],
        help="metadata=제목/설명란만, transcript=자막만, all=전체 실행",
    )
    parser.add_argument(
        "--transcript-limit",
        type=int,
        default=None,
        help="자막 수집 개수 제한. 테스트 시 5~10 추천",
    )
    args = parser.parse_args()

    if args.mode == "metadata":
        collect_metadata()
    elif args.mode == "transcript":
        collect_transcripts(limit=args.transcript_limit)
    elif args.mode == "text-metadata":
        collect_metadata_from_txt()
    else:
        collect_all(transcript_limit=args.transcript_limit)

if __name__ == "__main__":
    main()
