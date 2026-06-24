package com.team2.faultFind_backend.comment.dto;

import com.team2.faultFind_backend.comment.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {
    private Long id;
    private String content;
    private String author;
    private String authorEmail;
    private LocalDateTime createdDate;

    // 💡 핵심: 프론트엔드에서 이 값이 존재(Not Null)하면 대댓글(↳)로 판단하여 들여쓰기 처리를 합니다.
    private Long parentId;

    // 엔티티 객체를 DTO로 변환해주는 생성자
    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.author = comment.getAuthor();
        this.authorEmail = comment.getAuthorEmail();
        this.createdDate = comment.getCreatedDate();

        // 부모 엔티티가 존재하면 부모의 ID를 세팅, 없으면 null
        this.parentId = (comment.getParent() != null) ? comment.getParent().getId() : null;
    }
}
