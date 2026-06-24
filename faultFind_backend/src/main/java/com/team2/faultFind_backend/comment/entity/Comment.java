package com.team2.faultFind_backend.comment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.team2.faultFind_backend.common.entity.BaseEntity;
import com.team2.faultFind_backend.post.entity.Post;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String content; // 댓글 내용

    @Column(nullable = false)
    private String author; // 댓글 작성자 이메일

    @Column(nullable = false)
    private String authorEmail;

    // 게시글 엔티티와 다대일(N:1) 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @JsonIgnore // JSON 변환 시 무한 루프 도는 현상을 방지
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    // 자식 댓글들 (대댓글 목록 - 선택 사항, 조회 시 편리함)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> replies = new ArrayList<>();



}