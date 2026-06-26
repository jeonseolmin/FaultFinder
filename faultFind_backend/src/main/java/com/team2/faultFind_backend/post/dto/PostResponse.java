package com.team2.faultFind_backend.post.dto;

import com.team2.faultFind_backend.post.entity.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class PostResponse {
    private Long id;
    private String category;
    private String title;
    private String content;

    private String author;
    private String authorEmail;

    private int viewCount;
    private int commentCount;
    private int likeCount;

    private boolean notice;
    private LocalDateTime createdAt;

    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .category(post.getCategory())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .authorEmail(post.getAuthorEmail())
                .viewCount(post.getViewCount())
                .commentCount(post.getCommentCount())
                .likeCount(post.getLikeCount())
                .notice(post.isNotice())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
