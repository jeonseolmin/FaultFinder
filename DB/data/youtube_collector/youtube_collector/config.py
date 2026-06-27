import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv(".env.example")


@dataclass(frozen=True)
class Settings:
    youtube_api_key: str
    channel_id: str
    target_count: int

    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_password: str

    transcript_sleep_seconds: float


def get_settings() -> Settings:
    api_key = os.getenv("YOUTUBE_API_KEY", "").strip()
    channel_id = os.getenv("CHANNEL_ID", "").strip()

    if not api_key:
        raise ValueError("YOUTUBE_API_KEY가 .env에 없습니다.")
    if not channel_id:
        raise ValueError("CHANNEL_ID가 .env에 없습니다.")

    return Settings(
        youtube_api_key=api_key,
        channel_id=channel_id,
        target_count=int(os.getenv("TARGET_COUNT", "1000")),
        db_host=os.getenv("DB_HOST", "localhost"),
        db_port=int(os.getenv("DB_PORT", "5432")),
        db_name=os.getenv("DB_NAME", "fault_find_db"),
        db_user=os.getenv("DB_USER", "postgres"),
        db_password=os.getenv("DB_PASSWORD", ""),
        transcript_sleep_seconds=float(os.getenv("TRANSCRIPT_SLEEP_SECONDS", "1.5")),
    )
