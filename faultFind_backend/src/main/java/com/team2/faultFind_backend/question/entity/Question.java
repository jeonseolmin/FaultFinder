package com.team2.faultFind_backend.question.entity;

import com.team2.faultFind_backend.common.entity.BaseEntity;
import com.team2.faultFind_backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Entity
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false, length = 20)
    private String status;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private BaseEntity createdAt;

    @Builder
    public Question(User user, String title, String content, String status) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.status = status;
    }
}
