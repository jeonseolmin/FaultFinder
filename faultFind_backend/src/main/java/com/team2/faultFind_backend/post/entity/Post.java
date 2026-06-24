package com.team2.faultFind_backend.post.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team2.faultFind_backend.comment.entity.Comment;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;      // 닉네임 (화면 표시용)
    private String authorEmail; // 이메일 (권한 검사용)

    @Builder.Default
    private int viewCount = 0;

    @Builder.Default
    private int commentCount = 0;

    @Builder.Default
    private int likeCount = 0;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isNotice = false; // 공지사항 여부

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;

    // DB에 저장되기 직전에 자동으로 현재 시간을 입력해 줍니다.

    @PrePersist
    public void prePersist() {
        this.createdDate = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}