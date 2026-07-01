package com.team2.faultFind_backend.comment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team2.faultFind_backend.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CommentResponseDto {

    private Long id;
    private String content;
    private String author;
    private String authorEmail;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;

    // 부모 댓글이 없으면 null
    private Long parentId;

    public static CommentResponseDto from(Comment comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getAuthor())
                .authorEmail(comment.getAuthorEmail())
                .createdAt(comment.getCreatedAt())
                .parentId(comment.getParent() != null
                        ? comment.getParent().getId()
                        : null)
                .build();
    }
}

