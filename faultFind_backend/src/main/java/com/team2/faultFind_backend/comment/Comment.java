package com.team2.faultFind_backend.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.team2.faultFind_backend.post.entity.Post;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String content; // 댓글 내용

    @Column(nullable = false)
    private String author; // 댓글 작성자 이메일

    @CreationTimestamp
    private LocalDateTime createdDate; // 작성 시간

    // 게시글 엔티티와 다대일(N:1) 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @JsonIgnore // JSON 변환 시 무한 루프 도는 현상을 방지
    private Post post;
}