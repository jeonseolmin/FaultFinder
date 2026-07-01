package com.team2.faultFind_backend.user.dto;

import com.team2.faultFind_backend.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyCommentResponse {
    private Long id;
    private String content;
    private Long postId;
    private String postTitle;

    public static MyCommentResponse from(Comment comment) {
        return MyCommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .postId(comment.getPost().getId())
                .postTitle(comment.getPost().getTitle())
                .build();
    }
}