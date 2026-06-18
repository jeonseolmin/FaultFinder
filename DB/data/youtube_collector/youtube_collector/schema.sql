CREATE TABLE IF NOT EXISTS youtube_videos (
    id BIGSERIAL PRIMARY KEY,
    video_id VARCHAR(32) UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    transcript TEXT,
    published_at TIMESTAMPTZ,
    url TEXT,
    transcript_status VARCHAR(30) DEFAULT 'PENDING',
    transcript_error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_published_at
ON youtube_videos (published_at DESC);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_transcript_status
ON youtube_videos (transcript_status);
