package com.team2.faultFind_backend.post.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "posts")
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

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int viewCount;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int likeCount;

    private LocalDateTime createdAt = LocalDateTime.now();
}
