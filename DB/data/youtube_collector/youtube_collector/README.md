# YouTube Collector for FaultFinder

FaultFinder RAG 데이터셋 구축용 YouTube 수집기입니다.

수집 대상:

- `video_id`
- `title`
- `description`
- `published_at`
- `url`
- `transcript`

조회수는 RAG 품질에 직접적인 영향이 작아서 제외했습니다.

## 1. 설치

```bash
cd youtube_collector
python -m venv .venv

# Windows Git Bash / macOS / Linux
source .venv/Scripts/activate

# Windows PowerShell이면
# .venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

## 2. 환경변수 설정

`.env.example` 파일을 복사해서 `.env`로 만드세요.

```bash
cp .env.example .env
```

`.env` 예시:

```env
YOUTUBE_API_KEY=본인_유튜브_API_KEY
CHANNEL_ID=수집할_채널_ID
TARGET_COUNT=1000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=fault_find_db
DB_USER=postgres
DB_PASSWORD=본인_DB_비밀번호

TRANSCRIPT_SLEEP_SECONDS=1.5
```

## 3. PostgreSQL 테이블 생성

프로그램 실행 시 `schema.sql`이 자동 실행됩니다.
수동으로 만들고 싶으면 pgAdmin 또는 psql에서 `schema.sql` 내용을 실행하면 됩니다.

## 4. 실행 방법

### 제목/설명란만 수집

```bash
python main.py metadata
```

### 자막만 수집

```bash
python main.py transcript
```

### 전체 실행

```bash
python main.py all
```

### 테스트용으로 자막 5개만 수집

```bash
python main.py transcript --transcript-limit 5
```

## 5. 추천 실행 순서

처음에는 바로 1000개를 돌리지 말고 아래 순서로 확인하세요.

```bash
python main.py metadata
python main.py transcript --transcript-limit 5
```

문제 없으면:

```bash
python main.py transcript
```

## 6. DB 확인 쿼리

```sql
SELECT COUNT(*) FROM youtube_videos;

SELECT transcript_status, COUNT(*)
FROM youtube_videos
GROUP BY transcript_status;

SELECT video_id, title, LEFT(transcript, 100) AS transcript_preview
FROM youtube_videos
WHERE transcript_status = 'SUCCESS'
ORDER BY published_at DESC
LIMIT 10;
```

## 7. RAG 전처리 방향

원본 테이블 `youtube_videos`는 그대로 보존하세요.
나중에 별도 테이블을 만들어 chunk를 저장하는 방식이 좋습니다.

예시:

```sql
CREATE TABLE youtube_video_chunks (
    id BIGSERIAL PRIMARY KEY,
    video_id VARCHAR(32) NOT NULL REFERENCES youtube_videos(video_id),
    chunk_index INT NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

권장 chunk 텍스트:

```text
[제목]
{title}

[설명란]
{description}

[자막]
{transcript chunk}
```

## 8. 참고

- YouTube Data API `search.list`는 한 번에 최대 50개까지 반환합니다.
- `search.list`는 최신순 수집을 위해 `order=date`를 사용합니다.
- `videos.list`의 `snippet`에서 제목, 설명, 업로드 날짜를 가져옵니다.
- 자막은 `youtube-transcript-api`를 사용합니다. 공식 YouTube Data API 쿼터를 사용하지 않지만, 너무 빠른 요청은 IP 제한을 받을 수 있으므로 `TRANSCRIPT_SLEEP_SECONDS`를 둡니다.
