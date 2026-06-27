package com.team2.faultFind_backend.report.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. 신고한 사람 (중복 신고 방지 및 악성 신고자 추적용)
    @Column(nullable = false)
    private String reporterEmail;

    // 2. 신고 대상의 종류 (POST 또는 COMMENT)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportTargetType targetType;

    // 3. 신고 당한 게시글 번호 또는 댓글 번호
    @Column(nullable = false)
    private Long targetId;

    // 4. 신고 사유 (예: "욕설/비방", "광고성 콘텐츠" 등)
    @Column(nullable = false, length = 500)
    private String reason;

    // 5. 신고 일시
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // DB에 저장되기 직전에 현재 시간을 자동으로 세팅합니다.
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}