from __future__ import annotations

from dataclasses import dataclass
import subprocess
import re
from pathlib import Path

@dataclass
class TranscriptResult:
    status: str
    text: str
    error: str | None = None


def parse_vtt(vtt_path: Path) -> str:
    with open(vtt_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = []

    for line in content.splitlines():
        line = line.strip()

        if not line:
            continue

        if "-->" in line:
            continue

        if line.startswith("WEBVTT"):
            continue

        if re.match(r"^\d+$", line):
            continue

        lines.append(line)

    return " ".join(lines)


def fetch_transcript(video_id: str, languages: list[str] | None = None) -> TranscriptResult:
    url = f"https://www.youtube.com/watch?v={video_id}"

    tmp_dir = Path("temp_subtitles")
    tmp_dir.mkdir(exist_ok=True)

    output_template = str(tmp_dir / f"{video_id}")

    try:
        cmd = [
            "yt-dlp",
            "--skip-download",
            "--write-auto-sub",
            "--sub-lang", "ko",
            "--sub-format", "vtt",
            "-o", output_template,
            url,
        ]

        subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True,
        )

        vtt_files = list(tmp_dir.glob(f"{video_id}*.vtt"))

        if not vtt_files:
            return TranscriptResult(
                status="NO_TRANSCRIPT",
                text="",
                error="vtt 파일 없음",
            )

        text = parse_vtt(vtt_files[0])

        vtt_files[0].unlink(missing_ok=True)

        return TranscriptResult(
            status="SUCCESS",
            text=text,
        )

    except Exception as e:
        return TranscriptResult(
            status="FAILED",
            text="",
            error=str(e),
        )
