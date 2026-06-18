from __future__ import annotations

from typing import Any
import requests

VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos"
SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

def search_video_by_episode(api_key: str, channel_id: str, episode: int) -> str | None:
    params = {
        "key": api_key,
        "channelId": channel_id,
        "part": "snippet",
        "type": "video",
        "maxResults": 5,
        "q": f"{episode}회",
    }

    data = _get_json(SEARCH_URL, params)

    for item in data.get("items", []):
        video_id = item["id"].get("videoId")
        title = item["snippet"].get("title", "")

        if video_id and f"{episode}회" in title:
            return video_id

    return None

def get_old_video_ids_by_search(
    api_key: str,
    channel_id: str,
    target_count: int,
    published_before: str,
    q:str,
) -> list[str]:
    video_ids: list[str] = []
    next_page_token = None

    while len(video_ids) < target_count:
        params = {
            "key": api_key,
            "channelId": channel_id,
            "part": "id",
            "type": "video",
            "order": "date",
            "maxResults": 50,
            "publishedBefore": published_before,
            "q":q,
        }

        if next_page_token:
            params["pageToken"] = next_page_token

        data = _get_json(SEARCH_URL, params)

        for item in data.get("items", []):
            video_id = item["id"].get("videoId")

            if video_id:
                video_ids.append(video_id)

            if len(video_ids) >= target_count:
                break

        next_page_token = data.get("nextPageToken")

        if not next_page_token:
            break

    return video_ids

class YouTubeApiError(RuntimeError):
    pass


def _get_json(url: str, params: dict[str, Any]) -> dict[str, Any]:
    response = requests.get(url, params=params, timeout=20)
    try:
        data = response.json()
    except ValueError as exc:
        raise YouTubeApiError(f"JSON 파싱 실패: {response.text[:300]}") from exc
    except requests.HTTPError:
        print(response.text)

    if response.status_code != 200:
        message = data.get("error", {}).get("message", response.text[:300])
        raise YouTubeApiError(f"YouTube API 오류 {response.status_code}: {message}")


    return data

def get_uploads_playlist_id(api_key: str, channel_id: str) -> str:
    url = "https://www.googleapis.com/youtube/v3/channels"

    params = {
        "key": api_key,
        "id": channel_id,
        "part": "contentDetails",
    }

    data = requests.get(url, params=params).json()

    if "error" in data:
        raise RuntimeError(data["error"])

    items = data.get("items", [])
    if not items:
        raise ValueError("채널 정보를 찾지 못했습니다.")

    return items[0]["contentDetails"]["relatedPlaylists"]["uploads"]


def get_latest_video_ids(api_key: str, channel_id: str, target_count: int) -> list[str]:
    uploads_playlist_id = get_uploads_playlist_id(api_key, channel_id)

    video_ids = []
    next_page_token = None

    while len(video_ids) < target_count:
        url = "https://www.googleapis.com/youtube/v3/playlistItems"

        params = {
            "key": api_key,
            "playlistId": uploads_playlist_id,
            "part": "contentDetails",
            "maxResults": 50,
            "pageToken": next_page_token,
        }

        data = requests.get(url, params=params).json()

        if "error" in data:
            raise RuntimeError(data["error"])

        for item in data.get("items", []):
            video_id = item["contentDetails"]["videoId"]
            video_ids.append(video_id)

            if len(video_ids) >= target_count:
                break

        next_page_token = data.get("nextPageToken")

        if not next_page_token:
            break

    return video_ids

def get_video_details(api_key: str, video_ids: list[str]) -> list[dict[str, Any]]:
    """video_id 목록으로 제목, 설명란, 업로드 날짜, URL을 조회합니다. 조회수는 제외합니다."""
    rows: list[dict[str, Any]] = []

    for start in range(0, len(video_ids), 50):
        ids = video_ids[start:start + 50]
        params = {
            "key": api_key,
            "id": ",".join(ids),
            "part": "snippet",
            "maxResults": 50,
        }
        data = _get_json(VIDEOS_URL, params)

        for item in data.get("items", []):
            snippet = item.get("snippet", {})
            title = snippet.get("title", "")
            title_lower = title.lower()

            if "#" in title_lower:
                print(f"[SKIP SHORTS]{title}")
                continue

            if "(live)" in title_lower:
                print(f"[SKIP LIVE]{title}")
                continue

            rows.append({
                "video_id": item["id"],
                "title": snippet.get("title", ""),
                "description": snippet.get("description", ""),
                "published_at": snippet.get("publishedAt"),
                "url": f"https://www.youtube.com/watch?v={item['id']}",
            })

    order = {video_id: idx for idx, video_id in enumerate(video_ids)}
    rows.sort(key=lambda row: order.get(row["video_id"], 10**9))
    return rows
